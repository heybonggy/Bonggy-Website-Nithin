import { ImageResponse } from "next/og";
import { LogoSvg } from "@/components/ui/logo";

// iOS only accepts PNG/JPG touch icons: the planet mark, ink on white, 180×180.
// Heavier ring (12/256) so it reads at home-screen size.
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
        <LogoSvg size={140} ink="#0a0a0a" page="#ffffff" ring={12} />
      </div>
    ),
    size,
  );
}
