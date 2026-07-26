/**
 * pdf-extractor.js — Download and extract text from sermon PDF transcripts
 *
 * Uses pdf-parse to extract text content from PDFs.
 * This module is optional — the scraper works without it.
 *
 * Usage:
 *   node scraper/index.js --extract-pdf
 */

let pdfParse;
try {
  pdfParse = require('pdf-parse');
} catch {
  pdfParse = null;
}

const { downloadFile } = require('./fetcher');

/**
 * Check if PDF extraction is available (pdf-parse installed).
 * @returns {boolean}
 */
function isAvailable() {
  return pdfParse !== null;
}

/**
 * Download a PDF from the given URL and extract its text content.
 *
 * @param {string} pdfUrl — Full URL to the PDF file
 * @returns {Promise<string|null>} Extracted text, or null on failure
 */
async function extractText(pdfUrl) {
  if (!pdfParse) {
    console.warn(
      '  [pdf-extractor] pdf-parse not installed. Run: npm install pdf-parse'
    );
    return null;
  }

  if (!pdfUrl) return null;

  try {
    const buffer = await downloadFile(pdfUrl);
    const data = await pdfParse(buffer);
    return data.text || null;
  } catch (err) {
    console.error(`  [pdf-extractor] Failed to extract ${pdfUrl}: ${err.message}`);
    return null;
  }
}

module.exports = {
  extractText,
  isAvailable,
};
