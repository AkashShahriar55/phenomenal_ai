/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      backgroundImage :{
        logout: "url('/images/logout_bg.png')",
        loginPage:"url('/images/login_page_bg.png')"
      },
      colors:{
        'lighttext':'#BFBFBF',
        'deeptext':'#888888',
        'graytext':'#333333',
        'darktext':'#111111',
        'darkgray':'#D2D2D2',
        'blood-red':'#FC0808',
      },
      backgroundColor:{
        'light-gray':'#F2F2F2',
        'normal-gray':'#D2D2D2',
        'blood-red':'#FC0808',
        'dark-gray':'#333333',
        'darkest-gray':'#111111',
        'darker-gray':'#222222'
      },
      textColor:{
        'gray-light':'#BFBFBF',
        'gray-normal':'#111111',
        'gray-dark':'#333333',
        'gray-smooth':'#D2D2D2',
        'blood-red':'#FC0808',
      },
      placeholderColor:{
        'gray-light':'#BFBFBF',
      },
      fontFamily: {
        display: ["var(--font-sf)", "system-ui", "sans-serif"],
        default: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        '540': '33.75rem',
      },
      animation: {
        // Fade up and down
        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
        "slide-down": "slide-down-fade 0.3s",
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        // Fade up and down
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-50px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    plugin(({ addVariant }) => {
      addVariant("radix-side-top", '&[data-side="top"]');
      addVariant("radix-side-bottom", '&[data-side="bottom"]');
    }),
  ],
};
