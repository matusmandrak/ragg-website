'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
// This is the REAL Supabase client from the file we created earlier
import { supabase } from '@/lib/supabase/client'

// We only need one definition for our form data
interface IContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const t = useTranslations('ContactPage')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IContactForm>() // Using our interface here for consistency

  // CORRECTED: All logic is now correctly placed inside the function's curly braces {}
  const onSubmit = async (data: IContactForm) => {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // The real Supabase 'insert' function doesn't need created_at, it's set by the database
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{ name: data.name, email: data.email, message: data.message }])

      if (error) {
        throw error // Throw the error to be caught by the catch block
      }

      // Success
      setIsSubmitted(true)
      reset()
    } catch (error) {
      // Log error in development only
      if (process.env.NODE_ENV === 'development') {
        console.error('Error submitting form:', error)
      }
      setSubmitError(t('errorMessage')) // Show an error message to the user
    } finally {
      setIsSubmitting(false)
    }
  }

  // This part handles displaying the success message
  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">{t('successMessage')}</h1>
          <p className="text-lg text-gray-600 mb-8">{t('successSubtitle') || "We'll get back to you shortly."}</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-brand-red hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            {t('sendAnother') || 'Send Another Message'}
          </button>
      </div>
    )
  }

  // This is the main form view
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center leading-relaxed">
          {t('subtitle')}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t('nameLabel')}
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: t('validation.required') || 'This field is required' })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('emailLabel')}
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { 
                required: t('validation.required') || 'This field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('validation.emailInvalid') || 'Invalid email address'
                }
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              {t('messageLabel')}
            </label>
            <textarea
              id="message"
              rows={6}
              {...register('message', { required: t('validation.required') || 'This field is required' })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors resize-vertical ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-red hover:bg-red-700'
              }`}
            >
              {isSubmitting ? (t('submitting') || 'Submitting...') : t('submitButton')}
            </button>
          </div>
          
          {submitError && <p className="text-red-500 text-center mt-4">{submitError}</p>}
        </form>
      </div>
    </div>
  )
}