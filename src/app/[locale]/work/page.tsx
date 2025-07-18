import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
// import { createClient } from '@supabase/supabase-js' // You'll need to configure this

// Placeholder for Supabase client - replace with your actual configuration
const supabase = {
  from: (table: string) => ({
    select: async () => ({
      data: [
        {
          id: 1,
          slug: 'project-alpha',
          title: {
            en: 'Project Alpha',
            cs: 'Projekt Alpha',
            sk: 'Projekt Alpha'
          },
          summary: {
            en: 'A comprehensive digital transformation that increased efficiency by 300%.',
            cs: 'Komplexní digitální transformace, která zvýšila efektivitu o 300%.',
            sk: 'Komplexná digitálna transformácia, ktorá zvýšila efektívnosť o 300%.'
          }
        },
        {
          id: 2,
          slug: 'project-beta',
          title: {
            en: 'Project Beta',
            cs: 'Projekt Beta',
            sk: 'Projekt Beta'
          },
          summary: {
            en: 'Revolutionary mobile application that reached 1M+ users in 6 months.',
            cs: 'Revoluční mobilní aplikace, která dosáhla 1M+ uživatelů za 6 měsíců.',
            sk: 'Revolučná mobilná aplikácia, ktorá dosiahla 1M+ používateľov za 6 mesiacov.'
          }
        },
        {
          id: 3,
          slug: 'project-gamma',
          title: {
            en: 'Project Gamma',
            cs: 'Projekt Gamma',
            sk: 'Projekt Gamma'
          },
          summary: {
            en: 'E-commerce platform that generated $10M+ in revenue within first year.',
            cs: 'E-commerce platforma, která vygenerovala více než 10 milionů dolarů za první rok.',
            sk: 'E-commerce platforma, ktorá vygenerovala viac ako 10 miliónov dolárov za prvý rok.'
          }
        }
      ]
    })
  })
}

type CaseStudy = {
  id: number
  slug: string
  title: {
    en: string
    cs: string
    sk: string
  }
  summary: {
    en: string
    cs: string
    sk: string
  }
}

interface WorkPageProps {
  params: {
    locale: string
  }
}

export default async function WorkPage({ params: { locale } }: WorkPageProps) {
  const t = await getTranslations('WorkPage')
  
  // Fetch case studies from Supabase
  const { data: caseStudies } = await supabase.from('case_studies').select()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-12 text-center">
        {t('title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies?.map((caseStudy: CaseStudy) => (
          <div key={caseStudy.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {caseStudy.title[locale as keyof typeof caseStudy.title]}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {caseStudy.summary[locale as keyof typeof caseStudy.summary]}
              </p>
              <Link
                href={`/${locale}/work/${caseStudy.slug}`}
                className="inline-block bg-brand-red hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {t('viewCaseStudy')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
