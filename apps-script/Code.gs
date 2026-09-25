/**
 * 中秋賀卡：把每一次點擊記到 Google 試算表。
 * 用法見 README.md。
 */
const NAMES = {
  chang: '嫦娥・平安',
  rabbit: '玉兔・健康',
  wugang: '吳剛・事業',
  toad: '蟾蜍・財運',
};

// 網頁每次點擊都會 POST 到這裡
function doPost(e) {
  let key = '';
  try { key = JSON.parse(e.postData.contents).blessing; } catch (err) {}
  if (!NAMES[key]) return ContentService.createTextOutput('ignored');

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const log = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('紀錄') || setup_().log;
    log.appendRow([new Date(), key, NAMES[key]]);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('ok');
}

// 第一次使用時，在編輯器手動執行一次，會建立「紀錄」與「統計」兩個分頁
function setup() { setup_(); }

function setup_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let log = ss.getSheetByName('紀錄');
  if (!log) {
    log = ss.insertSheet('紀錄');
    log.appendRow(['時間', '代碼', '祝福']);
    log.setFrozenRows(1);
  }

  let stats = ss.getSheetByName('統計');
  if (!stats) {
    stats = ss.insertSheet('統計', 0);
    stats.appendRow(['祝福', '代碼', '點擊次數']);
    Object.keys(NAMES).forEach(function (k, i) {
      const r = i + 2;
      stats.getRange(r, 1, 1, 3).setValues([[NAMES[k], k, '']]);
      stats.getRange(r, 3).setFormula("=COUNTIF('紀錄'!B:B,B" + r + ")");
    });
    const last = Object.keys(NAMES).length + 2;
    stats.getRange(last, 1).setValue('合計');
    stats.getRange(last, 3).setFormula('=SUM(C2:C' + (last - 1) + ')');
    stats.setFrozenRows(1);
    stats.autoResizeColumns(1, 3);
  }
  return { log: log, stats: stats };
}
