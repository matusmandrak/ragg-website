import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider, useMessages } from 'next-intl';
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

export const metadata: Metadata = {
  title: "Ragg Strategy",
  description: "Consultancy and strategy services in communication and campaign management.",
};

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
        <NextIntlClientProvider
          locale={locale}
          messages={pick(messages, 'Navbar', 'Footer', 'ContactPage', 'NotFoundPage')}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}