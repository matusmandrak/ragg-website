import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Validate locale and provide fallback
  const validLocales = ['en', 'cs', 'sk'];
  const safeLocale = locale && validLocales.includes(locale) ? locale : 'en';
  
  try {
    return {
      locale: safeLocale,
      messages: (await import(`./messages/${safeLocale}.json`)).default
    };
     } catch {
     console.warn(`Failed to load messages for locale: ${safeLocale}, falling back to en`);
    return {
      locale: 'en',
      messages: (await import(`./messages/en.json`)).default
    };
  }
});