import { ImageResponse } from "next/og";

// iOS only accepts PNG/JPG touch icons: the Bong pebble on white, 180×180.
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
          background: "#ffffff",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 4 C85 4 96 15 96 50 C96 85 85 96 50 96 C15 96 4 85 4 50 C4 15 15 4 50 4 Z" fill="#0a0a0a" />
          <rect x="31" y="37.5" width="38" height="13" rx="6.5" fill="#ffffff" />
        </svg>
      </div>
    ),
    size,
  );
}
