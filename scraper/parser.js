/**
 * parser.js — Parse HTML table fragments returned by the ASP.NET WebMethods
 *
 * The WebMethods return HTML strings containing table rows like:
 *
 *   <table class="tblresults">
 *     <tr class="hdr">
 *       <td class="th1">#</td>
 *       <td class="th2">Date</td>
 *       <td>Title</td>
 *       <td class="th4">PDF</td>
 *       <td class="th5">Audio</td>
 *     </tr>
 *     <tr>
 *       <td>1</td>
 *       <td>49-1225</td>
 *       <td>The Deity Of Jesus Christ</td>
 *       <td><a href="...pdf">PDF</a></td>
 *       <td><a href="...m4a">M4A</a></td>
 *     </tr>
 *   </table>
 *
 * This module also handles the "sermonseries" divs that group sermons by series.
 */

const cheerio = require('cheerio');

const BASE_URL = 'https://themessage.com';

/**
 * Normalise a relative URL to an absolute one.
 * @param {string} href — The href attribute value
 * @returns {string|null} Absolute URL or null
 */
function normaliseUrl(href) {
  if (!href) return null;
  href = href.trim();
  if (!href || href === '#') return null;

  /* Already absolute */
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href;
  }

  /* Relative — prepend base */
  if (href.startsWith('/')) {
    return `${BASE_URL}${href}`;
  }

  return `${BASE_URL}/${href}`;
}

/**
 * Parse the sermon ID (date code) into a standardised date string.
 * E.g. "63-0317M" → { year: 1963, dateStr: "1963-03-17", suffix: "M" }
 *      "49-1225"  → { year: 1949, dateStr: "1949-12-25", suffix: "" }
 *
 * @param {string} sermonId
 * @returns {{ year: number, dateStr: string, suffix: string } | null}
 */
function parseSermonDate(sermonId) {
  if (!sermonId) return null;

  /* Match pattern like "63-0317M" or "49-1225" */
  const match = sermonId.match(/^(\d{2})-(\d{2})(\d{2})([A-Za-z]*)$/);
  if (!match) return null;

  const [, yy, mm, dd, suffix] = match;
  const year = parseInt(yy, 10) + 1900;
  const dateStr = `${year}-${mm}-${dd}`;

  return { year, dateStr, suffix: suffix || '' };
}

/**
 * Parse an HTML fragment returned by a WebMethod into an array of sermon objects.
 *
 * @param {string} html     — Raw HTML string from msg.d
 * @param {string} language — Language code (e.g. "en")
 * @returns {Array<Object>} Array of sermon objects
 */
function parseSermons(html, language) {
  if (!html || typeof html !== 'string') return [];

  const $ = cheerio.load(html);
  const sermons = [];
  let currentSeries = null;

  /* Check for series divs */
  $('.sermonseries').each(function () {
    currentSeries = $(this).text().trim();
  });

  /* Parse table rows — skip header rows */
  $('table.tblresults tr, table tr').each(function () {
    const $row = $(this);

    /* Skip header rows */
    if ($row.hasClass('hdr')) return;
    if ($row.find('.th1, .th2, .th4, .th5').length > 0) return;

    const $cells = $row.find('td');
    if ($cells.length < 3) return;

    /* Extract cell contents */
    const cells = [];
    $cells.each(function () {
      cells.push({
        text: $(this).text().trim(),
        html: $(this).html(),
        link: $(this).find('a').attr('href') || null,
      });
    });

    /* Determine column layout — varies slightly but typically:
     * [0] = # (number)
     * [1] = Date/ID (e.g. "63-0317M")
     * [2] = Title
     * [3] = PDF link (optional)
     * [4] = Audio link (optional)
     * Sometimes [5] = additional column
     */

    const number = parseInt(cells[0]?.text, 10) || null;
    const sermonId = cells[1]?.text || '';
    const title = cells[2]?.text || '';

    /* Find PDF and M4A links — could be in any of the remaining cells */
    let pdfUrl = null;
    let m4aUrl = null;

    for (let i = 3; i < cells.length; i++) {
      const link = cells[i]?.link;
      if (!link) continue;

      const lowerLink = link.toLowerCase();
      if (lowerLink.includes('.pdf')) {
        pdfUrl = normaliseUrl(link);
      } else if (
        lowerLink.includes('.m4a') ||
        lowerLink.includes('.mp3') ||
        lowerLink.includes('audio')
      ) {
        m4aUrl = normaliseUrl(link);
      }
    }

    /* Also check for links within each cell's inner HTML */
    if (!pdfUrl || !m4aUrl) {
      const $links = $row.find('a');
      $links.each(function () {
        const href = $(this).attr('href') || '';
        const lowerHref = href.toLowerCase();
        if (!pdfUrl && lowerHref.includes('.pdf')) {
          pdfUrl = normaliseUrl(href);
        }
        if (
          !m4aUrl &&
          (lowerHref.includes('.m4a') || lowerHref.includes('.mp3'))
        ) {
          m4aUrl = normaliseUrl(href);
        }
      });
    }

    /* Skip rows that don't look like sermon data or are table headers */
    if (!sermonId || !title) return;
    const lowerId = sermonId.toLowerCase();
    const lowerTitle = title.toLowerCase();
    if (
      lowerId.includes('date') ||
      lowerId.includes('deti') ||
      lowerId.includes('no.') ||
      lowerTitle.includes('titre') ||
      lowerTitle.includes('mutu') ||
      lowerTitle.includes('title')
    ) {
      return;
    }

    /* Parse the date from the sermon ID */
    const dateInfo = parseSermonDate(sermonId);

    sermons.push({
      id: sermonId,
      number,
      title,
      date: dateInfo?.dateStr || null,
      year: dateInfo?.year || null,
      language,
      cover_image: 'https://branham.org/azure/branham/073884ef-dd28-41d1-a7b8-33accbc478b2.jpg',
      pdf_url: pdfUrl,
      m4a_url: m4aUrl,
      series: currentSeries,
    });
  });

  return sermons;
}

module.exports = {
  parseSermons,
  parseSermonDate,
  normaliseUrl,
};
