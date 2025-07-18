"use client";

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface LayoutContentProps {
  children: ReactNode;
  locale: string;
  messages: any;
}

export default function LayoutContent({ children, locale, messages }: LayoutContentProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      <Navbar />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
} 