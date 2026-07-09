import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/metadata";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#fbfbfa",
          color: "#18181b",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 680 }}>
          <div
            style={{
              alignItems: "center",
              background: "#18181b",
              borderRadius: 999,
              color: "#fbfbfa",
              display: "flex",
              fontSize: 24,
              fontWeight: 500,
              height: 72,
              justifyContent: "center",
              marginBottom: 44,
              width: 72,
            }}
          >
            AL
          </div>
          <div style={{ fontSize: 56, fontWeight: 500, letterSpacing: -1 }}>
            {siteConfig.name}
          </div>
          <div
            style={{
              color: "#71717a",
              fontSize: 28,
              lineHeight: 1.45,
              marginTop: 18,
              maxWidth: 760,
            }}
          >
            {siteConfig.description}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
