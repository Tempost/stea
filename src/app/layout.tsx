import { LayoutProps } from '@/types/common';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/styles/globals.css';

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
