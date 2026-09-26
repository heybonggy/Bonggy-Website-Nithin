import { ImageResponse } from "next/og";

// iOS only accepts PNG/JPG touch icons, so the mark is rendered to a 180×180
// PNG here. Opaque background: iOS fills transparent pixels with black.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0c",
        }}
      >
        <svg
          width="140"
          height="140"
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
      </div>
    ),
    size,
  );
}
