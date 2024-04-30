import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    theme: {
      transitionTimingFunction: {
        elastic: "cubic-bezier(0.68, 0, 0.32, 1.2)",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
        mono: [
          "SF Mono",
          "SFMono-Regular",
          "ui-monospace",
          "DejaVu Sans Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      extend: {
        keyframes: {
          "opacity-keyframes": {
            "0%": {
              opacity: 0,
            },
            "100%": {
              opacity: 1,
            },
          },
          "loading-keyframes": {
            from: {
              opacity: 0.5,
            },
            to: {
              opacity: 1,
            },
          },
        },
        animation: {
          "fade-in": "opacity-keyframes .5s ease-in-out forwards",
          loading: "loading-keyframes infinite",
        },
        screens: {
          standalone: {
            raw: "(display-mode: standalone)",
          },
          "iphone-portrait": {
            raw: `
            (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait), 
            (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait), 
            (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait), 
            (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait), 
            (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)
          `,
          },
        },
      },
    },
  },
  plugins: [containerQueries, typography({ target: "modern" })],
};
