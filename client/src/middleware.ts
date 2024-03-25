import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en'
});

export const config = {
  // Skip all paths that should not be internationalized
  // matcher: ['/((?!api|_next|.*\\..*).*)']
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sw.js).*)']
};