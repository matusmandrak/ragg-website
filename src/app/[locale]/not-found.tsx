'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="font-serif text-6xl md:text-8xl font-bold text-gray-900 mb-4">
        {t('title')}
      </h1>

      <p className="text-xl text-gray-600 mb-8 max-w-md">
        {t('message')}
      </p>

      <Link
        href="/"
        className="bg-brand-red hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
      >
        {t('backToHome')}
      </Link>
    </div>
  )
}
