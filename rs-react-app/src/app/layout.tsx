import type { Metadata } from 'next';
import '../index.css';
import Header from '@/Layouts/Header';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Rick and Morty',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="root">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
