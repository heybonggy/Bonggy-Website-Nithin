import { ImageResponse } from "next/og";
import { LogoSvg } from "@/components/ui/logo";
import { HOME_TITLE } from "@/lib/metadata";

export const runtime = "edge";
export const alt = HOME_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Black ink on white, no colour (DESIGN.md §2).
export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#ffffff",
          color: "#0a0a0a",
          fontFamily: "system-ui, -apple-system, Segoe UI, Geist, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <LogoSvg size={56} ink="#0a0a0a" page="#ffffff" />
          <span style={{ fontSize: "34px", fontWeight: 500, letterSpacing: "-0.02em" }}>Bonggy</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "1020px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Build the bots your GTM team needs.</span>
            <span style={{ color: "#6b6b6b" }}>Running the flows you want, pointed at revenue.</span>
          </div>
          <div style={{ fontSize: "28px", lineHeight: 1.45, color: "#525252" }}>
            The agent workspace for sales, RevOps and marketing teams.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#525252",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: 10, height: 10, borderRadius: 9999, background: "#0a0a0a" }} />
            <span>Early access is open</span>
          </div>
          <span>bonggy.com</span>
        </div>
      </div>
    ),
    size,
  );
}
