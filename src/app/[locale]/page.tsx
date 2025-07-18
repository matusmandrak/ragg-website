import { useTranslations } from 'next-intl'
import Image from "next/image"

export default function Home() {
  const t = useTranslations('HomePage')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <button className="bg-brand-red hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl">
              {t('heroCta')}
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold text-gray-500 mb-12 uppercase tracking-wide">
            {t('trustedBy')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            {/* Placeholder logo boxes */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-400 font-medium">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('caseStudiesTitle')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Case Study Card 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-brand-red to-red-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Project Alpha</h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive digital transformation that increased efficiency by 300%.
                </p>
                <button className="text-brand-red font-semibold hover:text-red-700 transition-colors">
                  {t('viewCaseStudy')} →
                </button>
              </div>
            </div>

            {/* Case Study Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-700 to-brand-dark"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Project Beta</h3>
                <p className="text-gray-600 mb-4">
                  Revolutionary mobile application that reached 1M+ users in 6 months.
                </p>
                <button className="text-brand-red font-semibold hover:text-red-700 transition-colors">
                  {t('viewCaseStudy')} →
                </button>
              </div>
            </div>

            {/* Case Study Card 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Project Gamma</h3>
                <p className="text-gray-600 mb-4">
                  E-commerce platform that generated $10M+ in revenue within first year.
                </p>
                <button className="text-brand-red font-semibold hover:text-red-700 transition-colors">
                  {t('viewCaseStudy')} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
