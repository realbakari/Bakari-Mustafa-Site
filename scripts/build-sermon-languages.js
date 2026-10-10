const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const LANGUAGES_PATH = path.join(ROOT_DIR, '_data', 'languages.json');
const SERMONS_PATH = path.join(ROOT_DIR, '_data', 'sermons.json');
const OUTPUT_PATH = path.join(ROOT_DIR, '_data', 'sermon-languages.json');

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

async function fetchLanguageSermons(langCode) {
  try {
    const res = await fetch(`https://search.messagehub.info/api/languages/${langCode}/sermons`, {
      headers: getMessageHubHeaders(),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn(`Failed fetching ${langCode}:`, err.message);
    return null;
  }
}

async function main() {
  console.log('1. Loading existing sermons...');
  const sermons = JSON.parse(fs.readFileSync(SERMONS_PATH, 'utf8'));
  const languages = JSON.parse(fs.readFileSync(LANGUAGES_PATH, 'utf8'));

  const sermonLangMap = {};

  // Seed with local sermons in sermons.json
  for (const s of sermons) {
    const id = (s.id || '').toUpperCase().trim();
    const lang = s.language === 'ny' ? 'nya' : (s.language || 'en');
    if (!sermonLangMap[id]) sermonLangMap[id] = [];
    if (!sermonLangMap[id].includes(lang)) sermonLangMap[id].push(lang);
  }

  console.log(`Initialized ${Object.keys(sermonLangMap).length} sermons from local database.`);

  // Sort languages by sermon count descending to fetch biggest ones first
  const sortedLangs = languages
    .filter(l => l.code && l.sermon_count > 0 && l.code !== 'en')
    .sort((a, b) => b.sermon_count - a.sermon_count);

  console.log(`2. Fetching remote sermon lists for ${sortedLangs.length} languages...`);

  // Fetch in concurrency batches of 3
  const BATCH_SIZE = 3;
  for (let i = 0; i < sortedLangs.length; i += BATCH_SIZE) {
    const batch = sortedLangs.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(sortedLangs.length / BATCH_SIZE)}: ${batch.map(b => b.code).join(', ')}...`);

    const results = await Promise.all(batch.map(l => fetchLanguageSermons(l.code)));

    for (let j = 0; j < batch.length; j++) {
      const lang = batch[j].code;
      const list = results[j];
      if (Array.isArray(list)) {
        let count = 0;
        for (const s of list) {
          const id = (s.dateCode || String(s.id)).toUpperCase().trim();
          if (!sermonLangMap[id]) sermonLangMap[id] = ['en'];
          if (!sermonLangMap[id].includes(lang)) {
            sermonLangMap[id].push(lang);
            count++;
          }
        }
        console.log(`  Added ${count} matches for ${lang}`);
      }
    }

    // Save intermediate progress
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sermonLangMap, null, 2), 'utf8');
  }

  console.log(`Finished! Saved language mapping for ${Object.keys(sermonLangMap).length} sermons to _data/sermon-languages.json`);
}

main().catch(console.error);
