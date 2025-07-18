'use client'

import { useTranslations } from 'next-intl'

export default function PrivacyPolicyPage() {
  const t = useTranslations('PrivacyPolicyPage')

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 text-center">
        {t('title')}
      </h1>

      <div className="prose max-w-none mt-8">
        {t('content')}
      </div>
    </div>
  )
}
