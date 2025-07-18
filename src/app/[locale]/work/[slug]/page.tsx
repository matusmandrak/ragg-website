import { notFound } from 'next/navigation'
// import { createClient } from '@supabase/supabase-js' // You'll need to configure this

// Placeholder for Supabase client - replace with your actual configuration
const supabase = {
  from: (table: string) => ({
    select: () => ({
      eq: (column: string, value: string) => ({
        single: async () => {
          const sampleData = [
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
              },
              challenge: {
                en: 'The client was facing outdated systems and manual processes that were limiting their growth potential.',
                cs: 'Klient čelil zastaralým systémům a manuálním procesům, které omezovaly jejich růstový potenciál.',
                sk: 'Klient čelil zastaralým systémom a manuálnym procesom, ktoré obmedzovali ich rastový potenciál.'
              },
              solution: {
                en: 'We implemented a modern cloud-based infrastructure with automated workflows and real-time analytics.',
                cs: 'Implementovali jsme moderní cloudovou infrastrukturu s automatizovanými pracovními postupy a analýzami v reálném čase.',
                sk: 'Implementovali sme modernú cloudovú infraštruktúru s automatizovanými pracovnými postupmi a analýzami v reálnom čase.'
              },
              impact: {
                en: 'The solution resulted in 300% efficiency increase, 50% cost reduction, and improved customer satisfaction.',
                cs: 'Řešení vedlo k 300% zvýšení efektivity, 50% snížení nákladů a zlepšení spokojenosti zákazníků.',
                sk: 'Riešenie viedlo k 300% zvýšeniu efektívnosti, 50% zníženiu nákladov a zlepšeniu spokojnosti zákazníkov.'
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
              },
              challenge: {
                en: 'Creating a user-friendly mobile app that could scale to millions of users while maintaining performance.',
                cs: 'Vytvoření uživatelsky přívětivé mobilní aplikace, která by mohla škálovat na miliony uživatelů při zachování výkonu.',
                sk: 'Vytvorenie užívateľsky prívetivej mobilnej aplikácie, ktorá by mohla škálovať na milióny používateľov pri zachovaní výkonu.'
              },
              solution: {
                en: 'We built a native mobile app with microservices architecture and implemented advanced caching strategies.',
                cs: 'Vytvořili jsme nativní mobilní aplikaci s architekturou mikroslužeb a implementovali pokročilé strategie cachování.',
                sk: 'Vytvorili sme natívnu mobilnú aplikáciu s architektúrou mikroslužieb a implementovali pokročilé stratégie cachovania.'
              },
              impact: {
                en: 'The app achieved 1M+ downloads in 6 months with 4.8-star rating and 85% user retention rate.',
                cs: 'Aplikace dosáhla více než 1 milionu stažení za 6 měsíců s hodnocením 4,8 hvězdičky a 85% mírou udržení uživatelů.',
                sk: 'Aplikácia dosiahla viac ako 1 milión stiahnutí za 6 mesiacov s hodnotením 4,8 hviezdičky a 85% mierou udržania používateľov.'
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
              },
              challenge: {
                en: 'Building a robust e-commerce platform that could handle high traffic and complex inventory management.',
                cs: 'Vytvoření robustní e-commerce platformy, která by zvládla vysokou návštěvnost a složité řízení zásob.',
                sk: 'Vytvorenie robustnej e-commerce platformy, ktorá by zvládla vysokú návštevnosť a zložité riadenie zásob.'
              },
              solution: {
                en: 'We developed a custom e-commerce solution with advanced inventory management and payment processing.',
                cs: 'Vyvinuli jsme vlastní e-commerce řešení s pokročilým řízením zásob a zpracováním plateb.',
                sk: 'Vyvinuli sme vlastné e-commerce riešenie s pokročilým riadením zásob a spracovaním platieb.'
              },
              impact: {
                en: 'The platform generated $10M+ in revenue in first year with 99.9% uptime and seamless user experience.',
                cs: 'Platforma vygenerovala více než 10 milionů dolarů za první rok s 99,9% dostupností a bezproblémovou uživatelskou zkušeností.',
                sk: 'Platforma vygenerovala viac ako 10 miliónov dolárov za prvý rok s 99,9% dostupnosťou a bezproblémovou užívateľskou skúsenosťou.'
              }
            }
          ]
          
          const found = sampleData.find(item => item.slug === value)
          return { data: found || null }
        }
      })
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
  challenge: {
    en: string
    cs: string
    sk: string
  }
  solution: {
    en: string
    cs: string
    sk: string
  }
  impact: {
    en: string
    cs: string
    sk: string
  }
}

interface CaseStudyPageProps {
  params: {
    locale: string
    slug: string
  }
}

export async function generateMetadata({ params: { locale, slug } }: CaseStudyPageProps) {
  // Fetch the case study from Supabase
  const { data: caseStudy } = await supabase
    .from('case_studies')
    .select()
    .eq('slug', slug)
    .single()

  // Handle case where case study is not found
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found'
    }
  }

  // Return metadata with localized content
  return {
    title: caseStudy.title[locale as keyof typeof caseStudy.title],
    description: caseStudy.summary[locale as keyof typeof caseStudy.summary]
  }
}

export default async function CaseStudyPage({ params: { locale, slug } }: CaseStudyPageProps) {
  // Fetch the case study from Supabase
  const { data: caseStudy } = await supabase
    .from('case_studies')
    .select()
    .eq('slug', slug)
    .single()

  // Handle case where case study is not found
  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
        {caseStudy.title[locale as keyof typeof caseStudy.title]}
      </h1>

      <p className="text-xl text-gray-600 mb-12 leading-relaxed">
        {caseStudy.summary[locale as keyof typeof caseStudy.summary]}
      </p>

      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Challenge
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {caseStudy.challenge[locale as keyof typeof caseStudy.challenge]}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Solution
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {caseStudy.solution[locale as keyof typeof caseStudy.solution]}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Impact
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {caseStudy.impact[locale as keyof typeof caseStudy.impact]}
        </p>
      </section>
    </div>
  )
}
