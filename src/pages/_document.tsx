import { ColorModeScript } from '@chakra-ui/react';
import { Html, Main, Head, NextScript } from 'next/document';

import theme from './theme';

export default function MyDocument() {
  console.log("Theme config: ", theme.config)
  return (
    <Html lang='en'>
      <title>Stea</title>
      <meta
        property='og:title'
        name="description"
        content="STEA dressage"
        charSet="UTF-8"
        lang="en"
      />
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
