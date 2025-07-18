'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('Footer')

  const quickLinks = [
    { name: t('about'), href: '/about' },
    { name: t('services'), href: '/services' },
    { name: t('work'), href: '/work' },
    { name: t('contact'), href: '/contact' },
  ]

  const legalLinks = [
    { name: t('privacyPolicy'), href: '/privacy-policy' },
    { name: t('termsOfService'), href: '/terms-of-service' },
  ]
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="font-serif text-2xl font-bold hover:text-gray-300 transition-colors">
              RAGG
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('legal')}</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
