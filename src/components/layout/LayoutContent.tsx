"use client";

import { ReactNode } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { pick } from 'lodash';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface LayoutContentProps {
  children: ReactNode;
  locale: string;
}

export default function LayoutContent({ children, locale }: LayoutContentProps) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pick(messages, 'Navbar', 'Footer', 'ContactPage', 'NotFoundPage')}
    >
      <Navbar />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
} 