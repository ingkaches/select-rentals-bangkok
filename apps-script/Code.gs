/**
 * Select Rentals Bangkok — Viewing Request → Leads CRM
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Extensions > Apps Script > delete existing code > paste this file
 * 3. Save (Ctrl+S)
 * 4. Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone
 * 5. Copy the /exec URL → paste into listings.html  const SCRIPT_URL = '...'
 *
 * NOTE: Every time you change this code, use "New deployment" (not edit existing).
 *
 * Column order (19 cols):
 * # | Client Name | Nationality | Phone | WA/LINE | Email | Budget | Beds |
 * Zone | Project | Interested Unit | Source | Date In | Viewing | STAGE |
 * Signed Date | Comm (฿) | Agent | Notes
 */

var SHEET_ID    = '1oeQCvObGuY3SB5_ozDJDJkA0YqPzRHE_uaqrR3mu7JA';
var SHEET_NAME  = '🤝 Leads CRM';
var HEADER_ROWS = 3;    // your sheet has 3 header rows; data starts at row 4
var NUM_COLS    = 20;   // total columns

// Column order (20 cols):
// # | Client Name | Nationality | Phone | WA/LINE | Email | Budget | Beds |
// Zone | Project | Interested Unit | Source | Date In | Viewing Date |
// Viewing Time | STAGE | Signed Date | Comm (฿) | Agent | Notes

function parsePayload(e) {
  if (e.postData && e.postData.contents) {
    try { return JSON.parse(e.postData.contents); } catch (ex) {}
    try {
      var p = {};
      e.postData.contents.split('&').forEach(function(pair) {
        var parts = pair.split('=');
        if (parts.length >= 2) {
          p[decodeURIComponent(parts[0])] =
            decodeURIComponent(parts.slice(1).join('=').replace(/\+/g, ' '));
        }
      });
      if (Object.keys(p).length > 0) return p;
    } catch (ex) {}
  }
  return e.parameter || {};
}

function doPost(e) {
  try {
    var p     = parsePayload(e);
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet "' + SHEET_NAME + '" not found — check the tab name.');
    }

    var lastRow     = sheet.getLastRow();
    var newRow      = lastRow + 1;
    var hasDataRows = lastRow > HEADER_ROWS;

    // ── Auto-increment # (column A) ──────────────────────────
    var newNum = 1;
    if (hasDataRows) {
      var lastNum = sheet.getRange(lastRow, 1).getValue();
      newNum = (parseInt(lastNum) || 0) + 1;
    }

    // ── Beds: first digit only  1b1b→1  2b2b→2  3b2b→3 ─────
    var beds = '';
    if (p.unitType) {
      var m = String(p.unitType).match(/^(\d+)/);
      beds = m ? m[1] : p.unitType;
    }

    // ── Budget: raw number only ───────────────────────────────
    var budget = p.price ? Number(p.price) : '';

    // ── WA/LINE ───────────────────────────────────────────────
    var waLine = (p.contactMethod && p.contactId)
      ? p.contactMethod + ': ' + p.contactId : '';

    // ── Viewing Date: "20 Mar 2026" ───────────────────────────
    var viewingDateFormatted = '';
    if (p.viewingDate) {
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var dp = p.viewingDate.split('-');
      if (dp.length === 3) {
        viewingDateFormatted = parseInt(dp[2]) + ' ' + months[parseInt(dp[1]) - 1] + ' ' + dp[0];
      }
    }

    // ── Viewing Time: "9:00 AM - 12:00 PM" ───────────────────
    var timeMap = {
      'Morning 9:00-12:00':    '9:00 AM - 12:00 PM',
      'Afternoon 13:00-17:00': '1:00 PM - 5:00 PM',
      'Evening 17:00-19:00':   '5:00 PM - 7:00 PM',
    };
    var viewingTimeFormatted = p.viewingTime ? (timeMap[p.viewingTime] || p.viewingTime) : '';

    // ── Notes: pack extras after customer note ────────────────
    var notesParts = [];
    if (p.notes)         notesParts.push(p.notes);
    if (p.persons)       notesParts.push('Persons: ' + p.persons);
    if (p.leaseDuration) notesParts.push('Lease: ' + p.leaseDuration);
    if (p.moveInDate)    notesParts.push('Move-in: ' + p.moveInDate);
    if (p.area)          notesParts.push('Size: ' + p.area + ' sqm');

    // ── Row values (must match NUM_COLS = 20) ─────────────────
    var rowData = [
      newNum,                               // A  #
      p.name          || '',               // B  Client Name
      p.nationality   || '',               // C  Nationality
      p.phone         || '',               // D  Phone
      waLine,                              // E  WA/LINE
      '',                                  // F  Email (not collected)
      budget,                              // G  Budget (raw number)
      beds,                                // H  Beds (1 / 2 / 3 …)
      '',                                  // I  Zone (fill manually)
      p.building      || '',               // J  Project
      p.unit          || '',               // K  Interested Unit (number only)
      'Select Rentals Website',            // L  Source
      new Date(p.timestamp || new Date()), // M  Date In
      viewingDateFormatted,                // N  Viewing Date (20 Mar 2026)
      viewingTimeFormatted,                // O  Viewing Time (9:00 AM - 12:00 PM)
      'New Lead',                          // P  STAGE
      '',                                  // Q  Signed Date
      '',                                  // R  Comm (฿)
      '',                                  // S  Agent
      notesParts.join(' | '),              // T  Notes
    ];

    // ── Copy formatting from last data row, then write ────────
    if (hasDataRows) {
      var src = sheet.getRange(lastRow, 1, 1, NUM_COLS);
      var dst = sheet.getRange(newRow,  1, 1, NUM_COLS);
      src.copyTo(dst, SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
    }

    sheet.getRange(newRow, 1, 1, NUM_COLS).setValues([rowData]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log(err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Return Drive folder image list for unit photo galleries
  if (e && e.parameter && e.parameter.action === 'images' && e.parameter.folder) {
    return getFolderImages(e.parameter.folder);
  }
  return ContentService
    .createTextOutput('Select Rentals Bangkok — Leads CRM endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function getFolderImages(folderId) {
  try {
    var folder = DriveApp.getFolderById(folderId);
    var files  = folder.getFiles();
    var result = [];
    while (files.hasNext()) {
      var file = files.next();
      var mime = file.getMimeType();
      if (mime === 'image/jpeg' || mime === 'image/png' || mime === 'image/webp' || mime === 'image/gif') {
        result.push({ id: file.getId(), name: file.getName() });
      }
    }
    // Sort by filename for consistent ordering
    result.sort(function(a, b) { return a.name.localeCompare(b.name); });
    return ContentService
      .createTextOutput(JSON.stringify({ files: result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    Logger.log(err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ files: [], error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
