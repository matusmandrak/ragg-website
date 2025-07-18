import { getRequestConfig } from 'next-intl/server'

export const locales = ['en', 'cs', 'sk']

export default getRequestConfig(async ({ locale }) => {
  if (!locale) throw new Error('Locale is required')
  
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
