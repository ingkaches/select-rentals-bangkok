import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import '../styles/globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Select Rentals Bangkok — Verified Sansiri Properties',
  description:
    "Browse verified Sansiri rental properties across Bangkok's prime districts. No service fees for tenants.",
  metadataBase: new URL('https://selectrentalsbkk.com'),
  openGraph: {
    siteName: 'Select Rentals Bangkok',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-P4HQGXEWW9" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());
              gtag('config','G-P4HQGXEWW9');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
