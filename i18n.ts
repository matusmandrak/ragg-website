import {getPathname as getPathnameNextIntl} from 'next-intl/navigation';
import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'cs', 'sk'];
export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    cs: '/o-nas',
    sk: '/o-nas'
  },
  '/services': {
    en: '/services',
    cs: '/sluzby',
    sk: '/sluzby'
  },
  '/work': {
    en: '/work',
    cs: '/prace',
    sk: '/praca'
  },
  '/contact': {
    en: '/contact',
    cs: '/kontakt',
    sk: '/kontakt'
  }
};

export default getRequestConfig(async ({locale}) => {
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

export const getPathname = getPathnameNextIntl;