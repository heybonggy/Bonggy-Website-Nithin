# Form submissions → Google Sheets

The careers form writes into a Google Spreadsheet (tab `Careers`). One Apps
Script web-app, one URL, pasted in one file.

> The early-access form was removed (every CTA now books a strategy call).
> If your spreadsheet still has an `Early Access` tab, its existing rows are
> untouched; nothing writes to it any more.

Total time: ~5 minutes.

---

## 1. The spreadsheet

Make sure the **tab name is exactly**:

- `Careers`

(Case-sensitive. Rename tabs by double-clicking the tab label at the bottom.)

### Row 1 headers

**Careers** tab:

| timestamp | name | email | area | links | pitch |
| --- | --- | --- | --- | --- | --- |

---

## 2. The Apps Script

In the spreadsheet: **Extensions → Apps Script**

Delete the placeholder, paste:

```js
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const tabName = data.sheet;
  if (!tabName) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: "missing sheet" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActive().getSheetByName(tabName);
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: "tab not found: " + tabName }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.appendRow(headers.map((h) => data[h] ?? ""));

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Save (disk icon).

---

## 3. Deploy as a web app

- **Deploy → New deployment**
- Gear icon → **Web app**
- **Execute as:** Me
- **Who has access:** Anyone
- Click **Deploy**, grant the Google permissions prompt
- Copy the **Web app URL** (ends in `/exec`)

---

## 4. Paste the URL into the code

Open `src/lib/sheets.ts`. Near the top:

```ts
export const SHEETS_WEBHOOK_URL =
  "";
//  ^ paste here, e.g. "https://script.google.com/macros/s/AKfyc.../exec"
```

Paste your URL between the quotes:

```ts
export const SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfyc.../exec";
```

Save. That's it — both forms now write to the right tabs in the same sheet.

---

## 5. Deploy

```bash
git add .
git commit -m "wire signup forms to sheets"
git push
```

Vercel builds and the live forms write to your spreadsheet immediately.

---

## Test locally first

```bash
npm run dev
```

- Submit the Careers form (`/careers`) → row appears in the **Careers** tab

If nothing appears:
- Dev server console will log `SHEETS_WEBHOOK_URL is empty` → the paste
  didn't take. Open `src/lib/sheets.ts` and check the constant.
- Or `tab not found: ...` → tab name mismatch. The tab must be named exactly
  `Careers`.
- Or `append to "..." failed` → URL is set but Apps Script returned an
  error. Check the Apps Script execution log (in the script editor sidebar).
- Confirm the URL is the deployed **web app** URL (ends in `/exec`).
- Re-verify the row-1 headers per tab are exact (case-sensitive).

---

## Updating the Apps Script later

If you change the script code (e.g. add a column):

- **Deploy → Manage deployments → pencil icon → New version → Deploy**
- The web app URL **stays the same** — no code change needed in the Next app.
