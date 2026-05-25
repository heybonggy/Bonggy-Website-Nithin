# Form submissions → Google Sheets

Both forms (Early Access + Careers) write into a single Google Spreadsheet
with two tabs. One Apps Script web-app, one URL, pasted in one file.

Total time: ~5 minutes.

---

## 1. The spreadsheet (two tabs)

You already have this part done — one spreadsheet with two tabs.

Make sure the **tab names are exactly**:

- `Early Access`
- `Careers`

(Case-sensitive. Rename tabs by double-clicking the tab label at the bottom.)

### Row 1 headers per tab

**Early Access** tab:

| timestamp | email | company | role | teamSize |
| --- | --- | --- | --- | --- |

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

- Submit the Early Access modal → row appears in the **Early Access** tab
- Submit the Careers form (`/careers`) → row appears in the **Careers** tab

If nothing appears:
- Dev server console will log `SHEETS_WEBHOOK_URL is empty` → the paste
  didn't take. Open `src/lib/sheets.ts` and check the constant.
- Or `tab not found: ...` → tab name mismatch. The tabs must be named exactly
  `Early Access` and `Careers`.
- Or `append to "..." failed` → URL is set but Apps Script returned an
  error. Check the Apps Script execution log (in the script editor sidebar).
- Confirm the URL is the deployed **web app** URL (ends in `/exec`).
- Re-verify the row-1 headers per tab are exact (case-sensitive).

---

## Updating the Apps Script later

If you change the script code (e.g. add a column):

- **Deploy → Manage deployments → pencil icon → New version → Deploy**
- The web app URL **stays the same** — no code change needed in the Next app.
