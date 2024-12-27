import { LayoutProps } from '@/types/common';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
