'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
// import { createClient } from '@supabase/supabase-js' // You'll need to configure this

// Placeholder for Supabase client - replace with your actual configuration
const supabase = {
  from: (table: string) => ({
    insert: async (data: any) => {
      // Simulate successful insertion
      console.log('Inserting into', table, ':', data)
      return { error: null }
    }
  })
}

type FormData = {
  name: string
  email: string
  message: string
}

export default function ContactPage() {
  const t = useTranslations('ContactPage')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // Insert into Supabase contact_submissions table
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: data.name,
            email: data.email,
            message: data.message,
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        console.error('Error submitting form:', error)
        // You might want to show an error message here
        return
      }

      // Success
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      // You might want to show an error message here
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            {t('title')}
          </h1>
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="text-green-800 text-lg mb-4">
              ✓ {t('successMessage')}
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-brand-red hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {t('sendAnother')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 text-center">
          {t('title')}
        </h1>

        <p className="text-lg text-gray-600 mb-12 text-center leading-relaxed">
          {t('subtitle')}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t('nameLabel')}
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { 
                required: t('nameRequired') 
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('namePlaceholder')}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('emailLabel')}
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { 
                required: t('emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('emailInvalid')
                }
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('emailPlaceholder')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              {t('messageLabel')}
            </label>
            <textarea
              id="message"
              rows={6}
              {...register('message', { 
                required: t('messageRequired') 
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors resize-vertical ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('messagePlaceholder')}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-brand-red hover:bg-red-700'
              }`}
            >
              {isSubmitting ? t('submitting') : t('submitButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
