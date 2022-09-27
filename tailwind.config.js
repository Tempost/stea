module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'home-hero': "url('/train_jump_1440.webp')",
        'points-head': "url('/white_horse_ribbon_3.jpeg')",
        'form-hero': "url('/stea_join_salute.webp')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#1d4ed8',
          secondary: '#D81DAC',
          accent: '#1dd849',
          warning: '#d8a71d',
          'primary-focus': 'mediumblue',
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },
};
