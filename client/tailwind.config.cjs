module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#F5C842",
        amber: "#E8A020",
        navy: "#1A1A2E",
        surface: "#2D2D4E",
        cardwhite: "#F0F0F0",
        teal: "#4ECDC4",
        coral: "#FF6B6B",
        muted: "#A0A0C0",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Sora", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 12px rgba(245,200,66,0.4)",
        "glow-lg": "0 0 24px rgba(245,200,66,0.3)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
