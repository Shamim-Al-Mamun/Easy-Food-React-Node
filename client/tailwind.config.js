module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffc222",
        secondary: "#00a149",
        border: "#e5e5e5",
        heading: "#1e1d23",
        primary_hover: "#eeac00",
        secondary_bg:"#F7F2E2"
      },
      height: {
        "screen-85": "85vh",
      },
      fontFamily: {
        JosefinSans: ["Josefin Sans", "sans-serif"],
        Norican: ["Norican", "cursive"],
      },
      backgroundImage: {
        hero: "url('https://i.ibb.co/grmgsSZ/React-App.png')",
        about_guarantee:"url('https://i.ibb.co/qMYGCpk/about.jpg')"
      },
      container: {
        center: true,
        padding: "1rem",
      },
    }, 
    screens: {
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1290px",
    },
  },
  plugins: [],
};
