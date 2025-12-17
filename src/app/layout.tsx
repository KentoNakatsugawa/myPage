import type { Metadata, Viewport } from 'next';
import { NorelProvider } from '@/contexts/NorelContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'NOREL WITH - All in One Place',
  description: 'シームレスなカーサブスクリプション体験を提供するNOREL WITH',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <NorelProvider>{children}</NorelProvider>
      </body>
    </html>
  );
}
