// tailwind.config.js
import colors from 'tailwindcss/colors'
module.exports = {
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.emerald[500],
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
