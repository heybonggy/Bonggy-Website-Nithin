/**
 * Google Sheets integration , single source of truth.
 *
 * Both signup forms (Early Access + Careers) write into ONE spreadsheet with
 * two tabs. ONE Apps Script web-app URL, pasted ONCE below. The route file
 * tells the script which tab to append to via the `sheet` field in the body.
 *
 * SETUP , one step:
 *   Paste your deployed Apps Script web-app URL between the quotes below.
 *   Full guide: INTEGRATIONS.md
 */
export const SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxcioKsdV700EPMTnyN8zFii-Blgs_3epTCrGj5c7fIJQOsA_LvXCD4e3Z5mv_FSdg/exec";

export type SheetTab = "Early Access" | "Careers";

export async function appendToSheet(
  tab: SheetTab,
  row: Record<string, string>,
): Promise<{ recorded: boolean }> {
  if (!SHEETS_WEBHOOK_URL) {
    console.warn(
      `[sheets] SHEETS_WEBHOOK_URL is empty. Paste your Apps Script web-app URL into src/lib/sheets.ts to enable "${tab}" capture.`,
    );
    return { recorded: false };
  }

  try {
    await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sheet: tab,
        timestamp: new Date().toISOString(),
        ...row,
      }),
    });
    return { recorded: true };
  } catch (err) {
    console.error(`[sheets] append to "${tab}" failed`, err);
    return { recorded: false };
  }
}
