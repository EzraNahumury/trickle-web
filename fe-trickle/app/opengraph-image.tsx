import { ImageResponse } from "next/og";

export const alt = "Trickle — Real-time payroll streaming on Celo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social card — editorial monochrome + lime, matching the site.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f4f3ee",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top: mark + label */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#c8f94c",
            }}
          />
          <div style={{ fontSize: "34px", fontWeight: 600 }}>Trickle</div>
          <div
            style={{
              marginLeft: "8px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "20px",
              color: "#a6a59c",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#c8f94c",
                display: "flex",
              }}
            />
            Live on Celo Mainnet
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "92px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            Salary that streams&nbsp;
            <span
              style={{
                display: "flex",
                color: "#0a0a0a",
                background: "#c8f94c",
                padding: "0 14px",
                borderRadius: "10px",
              }}
            >
              by the second
            </span>
          </div>
          <div style={{ fontSize: "30px", color: "#a6a59c", maxWidth: "820px" }}>
            Non-custodial payroll streaming on Celo, inside MiniPay.
          </div>
        </div>

        {/* footer */}
        <div style={{ display: "flex", fontSize: "22px", color: "#a6a59c" }}>
          Deposit once · stream per second · withdraw anytime
        </div>
      </div>
    ),
    { ...size },
  );
}
