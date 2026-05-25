import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/sheets";

export const runtime = "nodejs";

/**
 * Early access form → "Early Access" tab in the shared spreadsheet.
 * Webhook URL lives in src/lib/sheets.ts (single source of truth).
 */
export async function POST(req: Request) {
  let payload: Record<string, string>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (payload.hp_field) {
    return NextResponse.json({ ok: true });
  }

  const email = (payload.email || "").trim();
  const company = (payload.company || "").trim();
  const role = (payload.role || "").trim();

  if (!email || !company || !role) {
    return NextResponse.json(
      { ok: false, error: "missing_required_field" },
      { status: 400 },
    );
  }

  const { recorded } = await appendToSheet("Early Access", {
    email,
    company,
    role,
    teamSize: (payload.teamSize || "").trim(),
  });

  return NextResponse.json({ ok: true, recorded });
}
