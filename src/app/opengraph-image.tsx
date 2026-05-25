import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bonggy: The command centre for sales teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background:
            "radial-gradient(ellipse 60% 40% at 80% 25%, rgba(94, 234, 212, 0.22), transparent 60%), radial-gradient(ellipse 40% 30% at 10% 95%, rgba(94, 234, 212, 0.18), transparent 60%), #000000",
          color: "#fafafa",
          fontFamily: "system-ui, -apple-system, Segoe UI, Geist, sans-serif",
        }}
      >
        {/* Top: logo lockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="p" cx="36%" cy="28%" r="78%">
                <stop offset="0%" stopColor="#7ef0c0" />
                <stop offset="40%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#053826" />
              </radialGradient>
            </defs>
            <path
              d="M 224 86 A 110 36 -22 0 0 32 170"
              fill="none"
              stroke="#5eead4"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <circle cx="128" cy="128" r="82" fill="url(#p)" />
            <ellipse
              cx="104"
              cy="94"
              rx="24"
              ry="10"
              fill="white"
              opacity="0.4"
              transform="rotate(-18 104 94)"
            />
            <path
              d="M 224 86 A 110 36 -22 0 1 32 170"
              fill="none"
              stroke="#5eead4"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Bonggy
          </span>
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: "84px",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              color: "#fafafa",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>The command centre&nbsp;</span>
            <span style={{ color: "#888888" }}>for sales teams.</span>
          </div>
          <div
            style={{
              fontSize: "26px",
              lineHeight: 1.45,
              color: "#a3a3a3",
              maxWidth: "880px",
            }}
          >
            Find the signal, decide the move. Bonggy runs your whole outbound
            sales motion from one place, with your judgement.
          </div>
        </div>

        {/* Bottom: meta strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "20px",
            color: "#7e7e7e",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#5eead4",
                boxShadow: "0 0 12px #5eead4",
              }}
            />
            <span>Early access · open</span>
          </div>
          <span>bonggy.com</span>
        </div>
      </div>
    ),
    size,
  );
}
