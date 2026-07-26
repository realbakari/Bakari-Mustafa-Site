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
/**
 * Download a PDF from the given URL and extract its text content and structured paragraphs.
 *
 * @param {string} pdfUrl — Full URL to the PDF file
 * @returns {Promise<{ full_text: string, paragraphs: Array<{number: number, text: string}> }|null>}
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
    const rawText = data.text || '';
    const paragraphs = parseParagraphs(rawText);

    return {
      full_text: rawText,
      paragraphs,
    };
  } catch (err) {
    console.error(`  [pdf-extractor] Failed to extract ${pdfUrl}: ${err.message}`);
    return null;
  }
}

/**
 * Parse raw transcript text into structured numbered paragraphs.
 *
 * @param {string} rawText
 * @returns {Array<{number: number, text: string}>}
 */
function parseParagraphs(rawText) {
  if (!rawText) return [];

  /* Match numbered paragraphs like "\n1\n", "\n2 ", "\n 3 " */
  const parts = rawText.split(/\n(?=\d{1,4}\s|\n\d{1,4}\n)/g);
  const paragraphs = [];
  let pIndex = 1;

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    /* Extract paragraph number if present */
    const numMatch = trimmed.match(/^(\d{1,4})\s*([\s\S]*)/);
    if (numMatch && parseInt(numMatch[1], 10) > 0) {
      const pNum = parseInt(numMatch[1], 10);
      const pText = numMatch[2].trim();
      if (pText.length > 5) {
        paragraphs.push({ number: pNum, text: pText });
      }
    } else if (trimmed.length > 10) {
      paragraphs.push({ number: pIndex++, text: trimmed });
    }
  }

  return paragraphs;
}

module.exports = {
  extractText,
  parseParagraphs,
  isAvailable,
};
