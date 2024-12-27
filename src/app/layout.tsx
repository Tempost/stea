import { LayoutProps } from '@/types/common';

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
