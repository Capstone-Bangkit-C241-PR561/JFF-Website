/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#E84141",
        primaryHover: "#b52929",
        secondary: "#1E3A5F",
        secondaryHover: "#172c4a",
        lightBlue: "#93C1FF",
        paleBlue: "#DDECFF",
      },
      fontFamily: {
        body: ["var(--karla-font)", "sans-serif"],
        heading: ["var(--lora-font)", "serif"],
      },
    },
  },
  plugins: [],
  plugins: [daisyui],
};
