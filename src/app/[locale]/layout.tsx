import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import LayoutContent from "@/components/layout/LayoutContent";
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

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <LayoutContent locale={locale}>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}