import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { pick } from 'lodash';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: {
      template: '%s | Ragg Strategy',
      default: t('heroTitle'),
    },
    description: t('heroSubtitle'),
    manifest: '/site.webmanifest',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: `https://raggstrategy.com/${locale}`,
      languages: {
        'en-US': 'https://raggstrategy.com/en',
        'cs-CZ': 'https://raggstrategy.com/cs',
        'sk-SK': 'https://raggstrategy.com/sk',
      },
    },
  };
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {/*
          By picking only the messages that are used in client components,
          we prevent the entire messages object from being sent to the client,
          which is better for performance and can resolve complex type issues.
        */}
        <NextIntlClientProvider
          messages={pick(messages, 'Navbar', 'Footer', 'ContactPage', 'NotFoundPage')}
        >
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}