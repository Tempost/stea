module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-hero': "url('/hero_train_jump.avif')",
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
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
