const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SERMONS_PATH = path.join(ROOT_DIR, '_data', 'sermons.json');
const LANGUAGES_PATH = path.join(ROOT_DIR, '_data', 'languages.json');
const SEARCH_INDEX_PATH = path.join(ROOT_DIR, '_data', 'search-index.json');
const TRANSCRIPTS_DIR = path.join(ROOT_DIR, '_data', 'transcripts');

const COVER_IMAGE = 'https://branham.org/azure/branham/073884ef-dd28-41d1-a7b8-33accbc478b2.jpg';

function getMessageHubHeaders() {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 300;
  const secret = 'MessageHubSecretKey2021';
  const token = crypto.createHash('md5').update(`${now}${exp}${secret}`).digest('hex');
  return {
    token,
    timestamp: now.toString(),
    expirationTime: exp.toString(),
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    Accept: 'application/json',
  };
}

async function main() {
  console.log('1. Loading existing sermons...');
  const sermons = JSON.parse(fs.readFileSync(SERMONS_PATH, 'utf8'));
  console.log(`Loaded ${sermons.length} sermons.`);

  console.log('2. Fetching Chichewa (nya) sermons from MessageHub...');
  const res = await fetch('https://search.messagehub.info/api/languages/nya/sermons', {
    headers: getMessageHubHeaders()
  });
  if (!res.ok) throw new Error(`MessageHub returned ${res.status}`);
  const mhSermons = await res.json();
  console.log(`Fetched ${mhSermons.length} Chichewa sermons from MessageHub.`);

  // Separate English sermons and Chichewa sermons
  const englishSermons = sermons.filter(s => s.language === 'en');
  const existingLocalNya = sermons.filter(s => s.language === 'ny' || s.language === 'nya');

  const localMap = new Map();
  for (const s of existingLocalNya) {
    localMap.set((s.id || '').toUpperCase().trim(), s);
  }

  const mergedNya = [];

  for (const s of mhSermons) {
    const id = s.dateCode || String(s.id);
    const existing = localMap.get(id.toUpperCase().trim());

    let isoDate = null;
    let year = null;
    if (s.dateCode && /^\d{2}-\d{4}/.test(s.dateCode)) {
      const yy = parseInt(s.dateCode.slice(0, 2), 10);
      const mm = s.dateCode.slice(3, 5);
      const dd = s.dateCode.slice(5, 7);
      year = yy < 100 ? (yy > 40 ? 1900 + yy : 2000 + yy) : yy;
      isoDate = `${year}-${mm}-${dd}`;
    } else if (s.date) {
      const d = new Date(s.date);
      if (!isNaN(d.getTime())) {
        isoDate = d.toISOString().slice(0, 10);
        year = d.getFullYear();
      }
    }

    const item = {
      id,
      number: existing ? existing.number : null,
      title: s.title || (existing ? existing.title : id),
      date: isoDate || (existing ? existing.date : null),
      year: year || (existing ? existing.year : null),
      language: 'nya',
      location: s.location || (existing ? existing.location : null),
      cover_image: COVER_IMAGE,
      pdf_url: existing && existing.pdf_url && !existing.pdf_url.includes('messagehub.info') ? existing.pdf_url : null,
      m4a_url: existing && existing.m4a_url ? existing.m4a_url : null,
      series: existing ? existing.series : null,
      source: existing && existing.source && existing.source !== 'local' ? existing.source : 'messagehub'
    };

    mergedNya.push(item);
    localMap.delete(id.toUpperCase().trim());
  }

  // Add any remaining local sermons (e.g. tracts) with standardized language 'nya'
  for (const rem of localMap.values()) {
    mergedNya.push({
      ...rem,
      language: 'nya',
      pdf_url: rem.pdf_url && !rem.pdf_url.includes('messagehub.info') ? rem.pdf_url : null,
    });
  }

  console.log(`Total Chichewa sermons after merge: ${mergedNya.length}`);

  // Combine English + merged Chichewa sermons
  const allSermons = [...englishSermons, ...mergedNya];

  // Clean all sermons: ensure no fake messagehub.info pdf_url exists
  for (const s of allSermons) {
    if (s.pdf_url && s.pdf_url.includes('messagehub.info')) {
      s.pdf_url = null;
    }
    if (s.language === 'ny') {
      s.language = 'nya';
    }
  }

  // Sort: language, then date/year, then id
  allSermons.sort((a, b) => {
    if (a.language !== b.language) return (a.language || '').localeCompare(b.language || '');
    if (a.date && b.date && a.date !== b.date) return a.date.localeCompare(b.date);
    return (a.id || '').localeCompare(b.id || '');
  });

  console.log(`Writing ${allSermons.length} sermons to ${SERMONS_PATH}...`);
  fs.writeFileSync(SERMONS_PATH, JSON.stringify(allSermons, null, 2), 'utf8');

  console.log('3. Updating languages.json...');
  const languages = JSON.parse(fs.readFileSync(LANGUAGES_PATH, 'utf8'));
  for (const lang of languages) {
    if (lang.code === 'nya' || lang.code === 'ny') {
      lang.code = 'nya';
      lang.sermon_count = mergedNya.length;
    } else if (lang.code === 'en') {
      lang.sermon_count = englishSermons.length;
    }
  }
  fs.writeFileSync(LANGUAGES_PATH, JSON.stringify(languages, null, 2), 'utf8');

  console.log('4. Pre-caching Chichewa 65-0718M transcript...');
  if (!fs.existsSync(TRANSCRIPTS_DIR)) {
    fs.mkdirSync(TRANSCRIPTS_DIR, { recursive: true });
  }

  const blockRes = await fetch('https://search.messagehub.info/api/languages/nya/sermons/65-0718M/blocks', {
    headers: getMessageHubHeaders()
  });
  if (blockRes.ok) {
    const blockData = await blockRes.json();
    if (blockData && blockData.blocks && Array.isArray(blockData.blocks)) {
      const paragraphs = blockData.blocks.map(b => ({
        number: b.blockNumber,
        text: (b.blockText || '').replace(/[\x00-\x1F\x7F-\x9F]/g, ' ').replace(/\s+/g, ' ').trim()
      }));
      const fullText = paragraphs.map(p => `¶${p.number} ${p.text}`).join('\n\n');
      const transcriptData = {
        id: '65-0718M',
        title: blockData.title || 'Kuyesa Kuti Umuchitire Mulugu Ntichito Mopanda Kukhula Chifuniro Cha Mulungo',
        location: blockData.location || 'Jeffersonville, Indiana USA',
        language: 'nya',
        date: blockData.date || 'July 18, 1965',
        pdf_url: null,
        full_text: fullText,
        paragraphs,
        source: 'messagehub'
      };
      fs.writeFileSync(path.join(TRANSCRIPTS_DIR, 'nya-65-0718M.json'), JSON.stringify(transcriptData, null, 2), 'utf8');
      console.log('Pre-cached nya-65-0718M.json successfully.');
    }
  }

  console.log('5. Building search index...');
  const index = {};
  for (const sermon of allSermons) {
    const words = [];

    // Title tokens
    if (sermon.title) {
      const titleWords = sermon.title.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length >= 2);
      words.push(...titleWords);
    }

    // ID token
    if (sermon.id) {
      words.push(sermon.id.toLowerCase());
      const cleanId = sermon.id.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanId) words.push(cleanId);
    }

    // Date tokens
    if (sermon.date) {
      words.push(sermon.date);
      const dateParts = sermon.date.split('-');
      if (dateParts.length === 3) {
        words.push(`${dateParts[0]}-${dateParts[1]}`);
        words.push(dateParts[0]); // year
      }
    }

    if (sermon.year) {
      words.push(String(sermon.year));
      words.push(String(sermon.year).slice(2)); // e.g. "65"
    }

    // Text content tokens (if any)
    const textContent = sermon.full_text || sermon.pdf_text;
    if (textContent) {
      const textWords = textContent.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length >= 3);
      const wordCounts = {};
      for (const w of textWords) {
        wordCounts[w] = (wordCounts[w] || 0) + 1;
      }
      const topWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]).slice(0, 150).map(([w]) => w);
      words.push(...topWords);
    }

    const uniqueWords = [...new Set(words)];
    const lang = sermon.language || 'en';
    const key = `${lang}:${sermon.id}`;

    for (const w of uniqueWords) {
      if (!index[w]) index[w] = [];
      if (!index[w].includes(key)) {
        index[w].push(key);
      }
    }
  }

  fs.writeFileSync(SEARCH_INDEX_PATH, JSON.stringify(index), 'utf8');
  console.log(`Wrote search index with ${Object.keys(index).length} words.`);
  console.log('Done!');
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
