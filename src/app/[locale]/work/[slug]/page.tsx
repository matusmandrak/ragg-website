import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { supabase } from '@/lib/supabase/client'

// This type helps us define the shape of the props for this specific page
interface CaseStudyPageProps {
  params: {
    locale: string;
    slug: string;
  }
}

// This is an async Server Component that fetches data
export default async function CaseStudyPage({ params: { locale, slug } }: CaseStudyPageProps) {
  const t = await getTranslations('WorkPage'); // We can reuse keys from WorkPage like 'viewCaseStudy'

  // This fetches only ONE case study from Supabase where the slug matches the URL
  const { data: caseStudy } = await supabase
    .from('case_studies')
    .select()
    .eq('slug', slug)
    .single()

  // If no case study is found for that slug, show the 404 page
  if (!caseStudy) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Title */}
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 text-center">
        {caseStudy.title[locale]}
      </h1>

      {/* Summary */}
      <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto leading-relaxed">
        {caseStudy.summary[locale]}
      </p>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Challenge Section */}
        <div>
          <h2 className="font-serif text-3xl font-bold border-b-2 border-brand-red pb-2 mb-4">
            The Challenge
          </h2>
          <div className="prose max-w-none text-lg">
            <p>{caseStudy.challenge[locale]}</p>
          </div>
        </div>

        {/* Solution Section */}
        <div>
          <h2 className="font-serif text-3xl font-bold border-b-2 border-brand-red pb-2 mb-4">
            Our Solution
          </h2>
          <div className="prose max-w-none text-lg">
            <p>{caseStudy.solution[locale]}</p>
          </div>
        </div>

        {/* Impact Section */}
        <div>
          <h2 className="font-serif text-3xl font-bold border-b-2 border-brand-red pb-2 mb-4">
            The Impact
          </h2>
          <div className="prose max-w-none text-lg">
            <p>{caseStudy.impact[locale]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}