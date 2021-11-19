module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        plightBlue: '#E8F5FF',
      },
      fontFamily: {
        fontPro: ['Fira Sans'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
