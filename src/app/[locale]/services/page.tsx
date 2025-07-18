'use client'

import { useTranslations } from 'next-intl'

export default function ServicesPage() {
  const t = useTranslations('ServicesPage')

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-12 text-center">
        {t('title')}
      </h1>

      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {t('serviceOneTitle')}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t('serviceOneText')}
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {t('serviceTwoTitle')}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t('serviceTwoText')}
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {t('serviceThreeTitle')}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t('serviceThreeText')}
        </p>
      </div>
    </div>
  )
}
