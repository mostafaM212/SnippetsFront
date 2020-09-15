module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily : {
        header : ['Rubik','san-serif']
      }
    },
    rotate : {
      '45': '45deg',
      '-45': '-45deg'
    }
  },
  variants: {},
  plugins: [
    require('tailwindcss-transforms')({

    })
  ],
}
