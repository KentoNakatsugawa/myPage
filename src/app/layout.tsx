import type { Metadata, Viewport } from 'next';
import { NorelProvider } from '@/contexts/NorelContext';
import ResponsiveWrapper from '@/components/ResponsiveWrapper';
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
      <body className="antialiased bg-gray-100">
        <NorelProvider>
          <ResponsiveWrapper>{children}</ResponsiveWrapper>
        </NorelProvider>
      </body>
    </html>
  );
}
