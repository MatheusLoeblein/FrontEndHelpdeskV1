import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'primary-bg': '#DFE4EC',
      'primary-formedica': '#436EB3',
      'primary-text': '#595959',
      'status-ticket-open': '#F88E82',
      'status-ticket-execut': '#D4BF00',
      'status-ticket-waiting': '#FFC38F',
      'status-ticket-finaly': '#3C643C',
      'border-default': '#cbd0dd',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      

    },
    fontFamily: {

    },
    extend: {
      keyframes: {
        'dropdownIn':{
          '0%': {
            marginTop: '-150px',
            opacity: '0',
          },
          '99%': {
            marginTop: '0',
            opacity: '0',
          },
          '100%': {
            marginTop: '0',
            opacity: '1'
          },
        }
      },
      
      animation: {
        'menuDropDownIn': 'dropdownIn 0.2s ease-in-out',

      },

    }
  },
  plugins: [],
}
export default config
