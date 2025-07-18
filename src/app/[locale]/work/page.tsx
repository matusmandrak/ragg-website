import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { supabase } from '@/lib/supabase/client' // This is the real Supabase connection

// This type definition is good practice
// First, we define what a block of translatable text looks like
type TranslatableText = {
  en: string;
  cs: string;
  sk: string;
}

// Then, we use that definition in our CaseStudy type
type CaseStudy = {
  id: number;
  slug: string;
  title: TranslatableText;
  summary: TranslatableText;
  image_url: string | null;
}

interface WorkPageProps {
  params: Promise<{
    locale: string;
  }>
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale } = await params;
  const t = await getTranslations('WorkPage')
  
  // This now fetches REAL data from your Supabase database
  const { data: caseStudies } = await supabase.from('case_studies').select()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-12 text-center">
        {t('title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies?.map((caseStudy: CaseStudy) => (
          <div key={caseStudy.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
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