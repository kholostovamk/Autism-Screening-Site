/**
 * Spectrum Assessment — Google Apps Script backend
 * Paste this into your Apps Script editor and deploy as a Web App.
 *
 * Columns written to the sheet:
 *   Timestamp | Name | Age | IP | City | Region | Country
 *   Score A (Social) | Score B (Repetitive) | Score C (Sensory) | Score D (Masking)
 *   Result Group (1–6) | Masking Flag
 */

const SHEET_NAME = 'Results'; // change if you name your sheet tab differently

function doPost(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let   sheet = ss.getSheetByName(SHEET_NAME);

    // Create the sheet + headers automatically if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp', 'Name', 'Age', 'IP', 'City', 'Region', 'Country',
        'Score A – Social', 'Score B – Repetitive', 'Score C – Sensory', 'Score D – Masking',
        'Result Group (1–6)', 'Masking Flag',
      ]);
      sheet.setFrozenRows(1);
      sheet.getRange('1:1').setFontWeight('bold');
    }

    const p = e.parameter; // URLSearchParams body sent from the website

    sheet.appendRow([
      new Date(),
      p.name        || '',
      p.age         || '',
      p.ip          || '',
      p.city        || '',
      p.region      || '',
      p.country     || '',
      Number(p.scoreA),
      Number(p.scoreB),
      Number(p.scoreC),
      Number(p.scoreD),
      Number(p.resultGroup),
      p.maskingFlag || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// doGet is only here so the URL responds to a browser test ping.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Spectrum backend is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
