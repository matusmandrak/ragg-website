'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

// Define the shape of our form data
interface IHomepageForm {
  name: string;
  company: string;
  email: string;
  challenge: string;
}

export default function HomePage() {
  const t = useTranslations();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IHomepageForm>();

  const onSubmit = async (data: IHomepageForm) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // CORRECTED: This now inserts into the new 'company' and 'challenge' columns
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{ 
          name: data.name, 
          company: data.company, 
          email: data.email, 
          challenge: data.challenge 
        }]);

      if (error) throw error;

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(t('ContactPage.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative">
        {/* CORRECTED: Changed from text-left to text-center */}
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-brand-light leading-tight">
              {t('HomePage.heroTitle')}
            </h1>
            <a href="#first-step" className="font-semibold text-brand-light uppercase tracking-wider border-b border-brand-light/50 pb-1 hover:border-brand-light transition-colors mt-8 inline-block">
              {t('HomePage.heroCta')}
            </a>
          </div>
        </div>
      </section>

      {/* ... (The Manifesto, Arsenal, Arena, and Filter sections remain the same) ... */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-brand-light text-2xl leading-relaxed">{t('Manifesto.text')}</p>
          <div><span className="block font-serif text-3xl text-brand-light mt-8">/Ragg/</span></div>
        </div>
      </section>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-brand-muted mb-16">{t('Arsenal.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="text-center"><h3 className="font-serif text-3xl font-bold text-brand-light mb-4">{t('Arsenal.step1Title')}</h3><p className="text-brand-muted leading-relaxed">{t('Arsenal.step1Text')}</p></div>
            <div className="text-center"><h3 className="font-serif text-3xl font-bold text-brand-light mb-4">{t('Arsenal.step2Title')}</h3><p className="text-brand-muted leading-relaxed">{t('Arsenal.step2Text')}</p></div>
            <div className="text-center"><h3 className="font-serif text-3xl font-bold text-brand-light mb-4">{t('Arsenal.step3Title')}</h3><p className="text-brand-muted leading-relaxed">{t('Arsenal.step3Text')}</p></div>
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-brand-muted mb-24">{t('Arena.title')}</h2>
          <div className="space-y-20 md:space-y-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div><div className="aspect-square bg-brand-dark/50 rounded-lg"></div></div>
              <div className="text-left"><p className="text-sm uppercase tracking-wider text-brand-muted mb-4">{t('Arena.project1Client')}</p><h3 className="font-serif text-4xl md:text-5xl font-bold text-brand-light leading-tight mb-8">{t('Arena.project1Title')}</h3><a href="#" className="font-semibold text-brand-light uppercase tracking-wider border-b border-brand-light/50 pb-1 hover:border-brand-light transition-colors">{t('Arena.project1Cta')}</a></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="text-left md:order-first"><p className="text-sm uppercase tracking-wider text-brand-muted mb-4">{t('Arena.project2Client')}</p><h3 className="font-serif text-4xl md:text-5xl font-bold text-brand-light leading-tight mb-8">{t('Arena.project2Title')}</h3><a href="#" className="font-semibold text-brand-light uppercase tracking-wider border-b border-brand-light/50 pb-1 hover:border-brand-light transition-colors">{t('Arena.project2Cta')}</a></div>
              <div><div className="aspect-square bg-brand-dark/50 rounded-lg"></div></div>
            </div>
          </div>
        </div>
      </section>
      <section id="filter" className="bg-brand-white text-brand-dark py-24 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-semibold uppercase tracking-widest mb-16">{t('Filter.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto">
            <div><h3 className="font-serif text-3xl font-bold mb-6">{t('Filter.forYouTitle')}</h3><ul className="space-y-4">{t.raw('Filter.forYouItems').map((item: string, index: number) => (<li key={index} className="flex items-start"><svg className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span className="text-lg">{item}</span></li>))}</ul></div>
            <div><h3 className="font-serif text-3xl font-bold mb-6">{t('Filter.notForYouTitle')}</h3><ul className="space-y-4">{t.raw('Filter.notForYouItems').map((item: string, index: number) => (<li key={index} className="flex items-start"><svg className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg><span className="text-lg">{item}</span></li>))}</ul></div>
          </div>
        </div>
      </section>

      {/* The First Step Section */}
      <section id="first-step" className="py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-light mb-4">{t('FirstStep.title')}</h2>
          <p className="text-brand-muted text-lg max-w-xl mx-auto mb-12 leading-relaxed">{t('FirstStep.text')}</p>
          
          {isSubmitted ? (
            <div className="text-center"><h3 className="font-serif text-3xl text-brand-light">{t('ContactPage.successMessage')}</h3></div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brand-muted mb-2">{t('ContactPage.nameLabel')}</label>
                  <input type="text" id="name" {...register('name', { required: true })} className="w-full bg-transparent border border-brand-light/50 rounded-md px-4 py-3 text-brand-light focus:ring-1 focus:ring-brand-light focus:border-brand-light" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-brand-muted mb-2">{t('ContactPage.companyLabel')}</label>
                  <input type="text" id="company" {...register('company', { required: true })} className="w-full bg-transparent border border-brand-light/50 rounded-md px-4 py-3 text-brand-light focus:ring-1 focus:ring-brand-light focus:border-brand-light" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-muted mb-2">{t('ContactPage.emailLabel')}</label>
                <input type="email" id="email" {...register('email', { required: true })} className="w-full bg-transparent border border-brand-light/50 rounded-md px-4 py-3 text-brand-light focus:ring-1 focus:ring-brand-light focus:border-brand-light" />
              </div>
              <div>
                <label htmlFor="challenge" className="block text-sm font-medium text-brand-muted mb-2">{t('FirstStep.challengeLabel')}</label>
                <textarea id="challenge" rows={5} {...register('challenge', { required: true })} className="w-full bg-transparent border border-brand-light/50 rounded-md px-4 py-3 text-brand-light focus:ring-1 focus:ring-brand-light focus:border-brand-light resize-none" />
              </div>
              <div className="text-center pt-4">
                <button type="submit" disabled={isSubmitting} className="font-semibold text-brand-light uppercase tracking-wider border border-brand-light/50 px-8 py-3 hover:border-brand-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {isSubmitting ? (t('ContactPage.submitting') || 'Submitting...') : t('FirstStep.submitCta')}
                </button>
              </div>
              {submitError && <p className="text-red-400 text-center mt-4">{submitError}</p>}
            </form>
          )}
        </div>
      </section>
    </>
  );
}