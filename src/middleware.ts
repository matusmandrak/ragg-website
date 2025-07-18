import createMiddleware from 'next-intl/middleware';
import {locales, pathnames} from './i18n';

export default createMiddleware({
  defaultLocale: 'en',
  locales,
  pathnames
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(cs|sk|en)/:path*']
};