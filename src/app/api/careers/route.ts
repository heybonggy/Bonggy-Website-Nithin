import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/sheets";

export const runtime = "nodejs";

/**
 * Careers form → "Careers" tab in the shared spreadsheet.
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

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const area = (payload.area || "").trim();
  const pitch = (payload.pitch || "").trim();

  if (!name || !email || !area || !pitch) {
    return NextResponse.json(
      { ok: false, error: "missing_required_field" },
      { status: 400 },
    );
  }

  const { recorded } = await appendToSheet("Careers", {
    name,
    email,
    area,
    links: (payload.links || "").trim(),
    pitch,
  });

  return NextResponse.json({ ok: true, recorded });
}
