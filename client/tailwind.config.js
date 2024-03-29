module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      maxHeight: {
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%'
      },
      stroke: theme => ({
        primary: theme('colors.primary'),
        secondary: theme('colors.secondary'),
        coral: theme('colors.coral')
      }),
      fill: theme => ({
        primary: theme('colors.primary'),
        secondary: theme('colors.secondary'),
        white: theme('colors.white'),
        coral: theme('colors.coral')
      }),
      colors: {
        brand: '#293239',
        link: {
          'main' : '#1D4ED8',
          'hover' : '#1F40AF'
        },
        primary: {
          '50': '#eceff1',
          '100': '#cfd8dc',
          '200': '#b0bec5',
          '300': '#90a4ae',
          '400': '#78909c',
          '500': '#607d8b',
          '600': '#546e7a',
          '700': '#455a64',
          '800': '#37474f',
          '900': '#263238',
          'light': '#eceff1',
          'main': '#546e7a',
          'dark': '#263238',
          'border': '#D5DBE1',
          'hover': '#F3F4F6'
        },
        secondary: {
          "50": "#fce4ec",
          "100": "#f8bbd0",
          "200": "#f48fb1",
          "300": "#f06292",
          "400": "#ec407a",
          "500": "#e91e63",
          "600": "#d81b60",
          "700": "#c2185b",
          "800": "#ad1457",
          "900": "#880e4f",
          'light': '#fce4ec',
          'main': '#d81b60',
          'dark': '#ad1457',
          'border': '#f8bbd0',
          'hover': '#fce4ec'
        },
        gray: {
          '50': '#f7f8f7',
          '100': '#f3f5f2',
          '200': '#e6e9e1',
          '300': '#d5d8c6',
          '400': '#adb79e',
          '500': '#829075',
          '600': '#626c55',
          '700': '#505649',
          '800': '#40413f',
          '900': '#343433',
        },
        lightslategray: {
          '50': '#f6f8f8',
          '100': '#f1f5f5',
          '200': '#e0e8ea',
          '300': '#cad6d9',
          '400': '#9bb5bd',
          '500': '#6f8e9f',
          '600': '#546b82',
          '700': '#45556b',
          '800': '#384052',
          '900': '#2e3341',
        },
        cornflowerblue: {
          '50': '#f7f9f9',
          '100': '#f3f6f7',
          '200': '#e4e4f0',
          '300': '#d3cee7',
          '400': '#b3a8d5',
          '500': '#8e7ec3',
          '600': '#705aad',
          '700': '#59478e',
          '800': '#463669',
          '900': '#352c4f',
        },
        orchid: {
          '50': '#f9fafa',
          '100': '#f7f7f7',
          '200': '#efe0ee',
          '300': '#e8c5e2',
          '400': '#dc9acc',
          '500': '#c96fb6',
          '600': '#ac4a98',
          '700': '#8a3a7d',
          '800': '#6a2d60',
          '900': '#4a2548',
        },
        palevioletred: {
          '50': '#fafafa',
          '100': '#f8f7f5',
          '200': '#f2e2e8',
          '300': '#ecc8d5',
          '400': '#e29cb4',
          '500': '#d17293',
          '600': '#b44c6f',
          '700': '#933c5d',
          '800': '#712e4d',
          '900': '#50263c',
        },
        lightcoral: {
          '50': '#fafafa',
          '100': '#f8f7f4',
          '200': '#f3e1e7',
          '300': '#eec7d4',
          '400': '#e59bb1',
          '500': '#d7708f',
          '600': '#bc4a6a',
          '700': '#9a3a59',
          '800': '#762d4b',
          '900': '#54253a',
        },
        salmon: {
          '50': '#fbfaf9',
          '100': '#faf7f1',
          '200': '#f7e2dc',
          '300': '#f4c6bc',
          '400': '#ef998a',
          '500': '#e76e5f',
          '600': '#d1483b',
          '700': '#b23836',
          '800': '#8b2c36',
          '900': '#64242c',
        },
        coral: {
          '50': '#fbfaf9',
          '100': '#faf7ee',
          '200': '#f8e3d3',
          '300': '#f6c8aa',
          '400': '#f29b72',
          '500': '#ea7046',
          '600': '#d64a27',
          '700': '#b73a27',
          '800': '#912d2c',
          '900': '#6a2526',
        },
        chocolate: {
          '50': '#fbfaf9',
          '100': '#faf7ee',
          '200': '#f8e4d3',
          '300': '#f6c9a9',
          '400': '#f19c71',
          '500': '#e87245',
          '600': '#d34c27',
          '700': '#b43b27',
          '800': '#8e2e2c',
          '900': '#672625',
        },
        darksalmon: {
          '50': '#fafaf9',
          '100': '#f9f7f0',
          '200': '#f5e5d9',
          '300': '#f1ccb5',
          '400': '#e8a281',
          '500': '#da7855',
          '600': '#be5234',
          '700': '#9d4031',
          '800': '#793232',
          '900': '#59282a',
        },
      }
    }

  },
  plugins: [],
}
