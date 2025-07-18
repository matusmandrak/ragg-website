'use client'

import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('AboutPage')

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-12 text-center">
        {t('title')}
      </h1>

      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {t('missionTitle')}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t('missionText')}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {t('teamTitle')}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t('teamText')}
        </p>
      </section>
    </div>
  )
}
