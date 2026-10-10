const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT_DIR = path.resolve(__dirname, '..');
const SERMONS_PATH = path.join(ROOT_DIR, '_data', 'sermons.json');
const SERIES_PATH = path.join(ROOT_DIR, '_data', 'series.json');

function post(apiPath, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request({
      hostname: 'table.branham.org',
      path: apiPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Content-Length': Buffer.byteLength(data),
        'X-Requested-With': 'j:Dm_eDEoMw9jxIU@=A2B8^Lz/Uh_fSrWW5ai7oAr6l@TiX7=wB0s`=;fC<9eT;^',
        'Csrf-Token': 'csrf-key-value'
      }
    }, res => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => {
        try { resolve(JSON.parse(buf)); } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function getSeriesSlug(name) {
  const map = {
    'Adoption': 'adoption',
    'An Exposition Of The Seven Church Ages': 'church-ages',
    'Branham Tabernacle': 'branham-tabernacle',
    'Brother Branham': 'brother-branham',
    'Conduct, Order, And Doctrine Of The Church': 'conduct-order-doctrine',
    'Demonology': 'demonology',
    'Easter Revival': 'easter-revival',
    'Israel And The Church': 'israel-and-the-church',
    'Jehovah-Jireh': 'jehovah-jireh',
    'The Book Of Hebrews': 'hebrews',
    'The Church': 'the-church',
    'The Easter Message': 'the-easter-message',
    'The Holy Ghost': 'the-holy-ghost',
    'The Revelation Of Jesus Christ': 'revelation-of-jesus-christ',
    'The Revelation Of The Seven Seals': 'seven-seals',
    'The Seventy Weeks Of Daniel': 'seventy-weeks'
  };
  return map[name] || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function getDurationGroup(m) {
  if (!m || m <= 0) return null;
  if (m <= 60) return '1 - 60';
  if (m <= 90) return '61 - 90';
  if (m <= 120) return '91 - 120';
  if (m <= 150) return '121 - 150';
  if (m <= 180) return '151 - 180';
  return '181+';
}

function getLengthCategory(m) {
  if (!m || m <= 0) return null;
  if (m <= 60) return 'short';
  if (m <= 120) return 'medium';
  return 'long';
}

function formatCity(cName) {
  if (!cName || cName === 'Unknown') return null;
  const m = cName.match(/^(.*)\s+([A-Z]{2})$/);
  if (m) {
    return `${m[1]}, ${m[2]}`;
  }
  return cName;
}

const SERIES_DESCRIPTIONS = {
  'adoption': 'Preached at the Branham Tabernacle in Jeffersonville, Indiana, May 15–22, 1960. A foundational series exploring the believer’s position and spiritual placement in Christ according to Ephesians.',
  'church-ages': 'An Exposition Of The Seven Church Ages. Delivered December 1960 at the Branham Tabernacle, detailing the church dispensations from Ephesus to Laodicea and their respective messengers.',
  'branham-tabernacle': 'Sermons preached at the home pulpit of the Branham Tabernacle in Jeffersonville, Indiana, spanning 1949 through 1965.',
  'brother-branham': 'Personal testimonies, life stories, and ministry background messages recounting Brother Branham’s life and divine commission.',
  'conduct-order-doctrine': 'Conduct, Order, and Doctrine (COD). Questions and Answers services addressing church order, Christian walk, theology, and spiritual questions (1953–1964).',
  'demonology': 'Expository series examining demon power, spiritual warfare, realms of darkness, and the authority of the believer (1953–1955).',
  'easter-revival': 'Preached during the April 1957 revival campaign in Phoenix, Arizona and Oakland, California, focusing on the resurrected Christ.',
  'israel-and-the-church': 'Five-part foundational series delivered in March 1953 tracing Israel’s prophetic journey and its typology for the New Testament church.',
  'jehovah-jireh': 'Five-part campaign delivered in July 1962 in Grass Valley, California, exploring the Lord our Provider.',
  'hebrews': 'Extensive verse-by-verse expository study on the Epistle to the Hebrews, preached in Jeffersonville between August and October 1957.',
  'the-church': 'Special sermons exploring the mystery, purpose, and spiritual foundation of the True Church of the Living God.',
  'the-easter-message': 'Annual Easter weekend messages focusing on the resurrection, triumph over death, and the living Christ.',
  'the-holy-ghost': 'Deep two-part study delivered December 1959 examining what the Holy Ghost is, why it was given, and how to receive it.',
  'revelation-of-jesus-christ': 'Detailed verse-by-verse study on the Revelation of Jesus Christ preached at the Branham Tabernacle in December 1960 and June 1961.',
  'seven-seals': 'Delivered March 17–24, 1963, at the Branham Tabernacle following the heavenly cloud appearance in Arizona, opening the Seven Seals of the Book of Revelation.',
  'seventy-weeks': 'Prophetic study delivered in July–August 1961 detailing Daniel’s timeline of the seventy weeks, the Gentile dispensation, and the closing of the church age.'
};

async function main() {
  console.log('Fetching live index data from table.branham.org...');
  const [seriesRes, sermonsRes, citiesRes] = await Promise.all([
    post('/rest/index/allSeries', { Language: 'en' }),
    post('/rest/index/allSermons', { Language: 'en' }),
    post('/rest/index/allCities', { Language: 'en' }),
  ]);

  const rawSermons = sermonsRes.Result.Sermons;
  const rawSeries = seriesRes.Result.Series;
  const rawCities = citiesRes.Result.Cities;

  const tableSermonById = {};
  const tableSermonByProduct = {};
  for (const s of rawSermons) {
    tableSermonById[s.i] = s;
    tableSermonByProduct[s.p] = s;
  }

  const tableCityById = {};
  for (const c of rawCities) {
    tableCityById[c.i] = formatCity(c.n);
  }

  // 1. Build the 16 Official Series JSON
  const officialSeriesList = rawSeries.map(ser => {
    const slug = getSeriesSlug(ser.n);
    const codes = ser.s.map(id => tableSermonById[id] ? tableSermonById[id].p : null).filter(Boolean);
    return {
      id: slug,
      slug: slug,
      title: ser.n,
      sermon_count: codes.length,
      sermon_ids: codes,
      description: SERIES_DESCRIPTIONS[slug] || `Official series: ${ser.n}.`
    };
  });

  fs.writeFileSync(SERIES_PATH, JSON.stringify(officialSeriesList, null, 2), 'utf8');
  console.log(`Saved ${officialSeriesList.length} official series to _data/series.json`);

  // Build a map of sermon product ID -> series list
  const sermonSeriesMap = {};
  for (const ser of officialSeriesList) {
    for (const code of ser.sermon_ids) {
      if (!sermonSeriesMap[code]) sermonSeriesMap[code] = [];
      sermonSeriesMap[code].push({ title: ser.title, slug: ser.slug });
    }
  }

  // 2. Enrich _data/sermons.json
  const localSermons = JSON.parse(fs.readFileSync(SERMONS_PATH, 'utf8'));

  let enrichedCount = 0;
  for (const s of localSermons) {
    const tableS = tableSermonByProduct[s.id];
    if (tableS) {
      enrichedCount++;
      if (tableS.m && tableS.m > 0) {
        s.duration_minutes = tableS.m;
        s.duration_group = getDurationGroup(tableS.m);
        s.length_category = getLengthCategory(tableS.m);
      }
      if (tableS.c && tableCityById[tableS.c]) {
        s.location = tableCityById[tableS.c];
        s.city = tableCityById[tableS.c];
      }
    }

    const matchedSeries = sermonSeriesMap[s.id];
    if (matchedSeries && matchedSeries.length > 0) {
      s.series = matchedSeries[0].title;
      s.series_slug = matchedSeries[0].slug;
      s.series_list = matchedSeries;
    }
  }

  fs.writeFileSync(SERMONS_PATH, JSON.stringify(localSermons, null, 2), 'utf8');
  console.log(`Enriched ${enrichedCount} sermons in _data/sermons.json with exact Table data!`);
}

main().catch(console.error);
