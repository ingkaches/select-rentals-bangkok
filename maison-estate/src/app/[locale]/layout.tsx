import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import '../../styles/globals.css';

const locales = ['en', 'th', 'zh'];

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

export default async function RootLayout({ children, params: { locale } }: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
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
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
