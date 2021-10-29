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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
