import type { Metadata } from 'next';
import '../index.css';

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
      <body id="root">{children}</body>
    </html>
  );
}
