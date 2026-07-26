/**
 * messagehub.js — Client for Message Hub REST API (https://search.messagehub.info/api/)
 *
 * Exposes 72 languages including Chichewa (nya), English (en), French (fr), Spanish (es), etc.
 */

const BASE_URL = 'https://search.messagehub.info/api';

/**
 * Generate security headers required by Message Hub API
 */
function getHeaders() {
  const now = Math.floor(Date.now() / 1000);
  const expiration = now + 300;
  return {
    timestamp: now.toString(),
    expirationTime: expiration.toString(),
    'User-Agent': 'TheMessageAPI-Scraper/1.0 (educational project)',
    Accept: 'application/json',
  };
}

/**
 * Fetch all 72 available languages from Message Hub
 */
async function fetchLanguages() {
  const url = `${BASE_URL}/languages`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) {
    throw new Error(`Message Hub API Error ${res.status}: ${res.statusText}`);
  }
  const data = await res.json();
  
  /* Standardise language output */
  return data.map((item) => ({
    code: item.code === 'nya' ? 'ny' : item.code,
    mh_code: item.code,
    name: item.name,
    englishName: item.englishName,
    source: 'messagehub',
  }));
}

/**
 * Fetch language details by code
 */
async function fetchLanguageInfo(code) {
  const mhCode = code === 'ny' ? 'nya' : code;
  const url = `${BASE_URL}/languages/${mhCode}`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) return null;
  return res.json();
}

/**
 * Fetch title info for a message
 */
async function fetchMessageTitle(code) {
  const mhCode = code === 'ny' ? 'nya' : code;
  const url = `${BASE_URL}/messages/${mhCode}`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) return null;
  return res.json();
}

module.exports = {
  fetchLanguages,
  fetchLanguageInfo,
  fetchMessageTitle,
};
