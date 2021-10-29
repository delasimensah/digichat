module.exports = {
  purge: ["./src/**/*.{js,jsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        mypurple: "#ad1fea",
        myblue: "#4661e6",
        mypink: "#f49f85",
        seaBlue: "#62bcfa",
        darkGrey: "#373f68",
        darkGreyMid: "#3a4374",
        darkGreyLight: "#647196",
        lightGreyMid: "#f2f4ff",
        lightGrey: "#f7f8fd",
      },
      spacing: {
        "30%": "30%",
        "70%": "70%",
      },
      maxWidth: {
        "1/4": "25%",
        "3/4": "75%",
        "30%": "30%",
        "70%": "70%",
      },
      flex: {
        "list-lg": "0 0 30%",
        "feed-lg": "0 0 70%",
        "feed-sm": "0 0 100%",
      },
      minHeight: {
        16: "4rem",
        20: "5rem",
        24: "6rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
