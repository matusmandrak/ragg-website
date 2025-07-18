
import { supabase } from '@/lib/supabase/client'

// This type helps us define the shape of the props for this specific page
interface CaseStudyPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>
}

// This is an async Server Component that fetches data
export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { locale, slug } = await params;

  // Conditionally fetch case study from Supabase (only if client is available)
  let caseStudy = null;
  if (supabase) {
    try {
      const { data } = await supabase
        .from('case_studies')
        .select()
        .eq('slug', slug)
        .single()
      caseStudy = data;
    } catch (error) {
      console.warn('Failed to fetch case study:', error);
    }
  }

  // If no case study is found for that slug, show placeholder content
  if (!caseStudy) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Case Study: {slug}
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            This case study will be displayed when the database is connected.
          </p>
        </div>
      </div>
    );
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