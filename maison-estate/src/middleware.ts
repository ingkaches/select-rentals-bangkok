import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'th', 'zh'],
  defaultLocale: 'en'
});

export const config = {
  // Broad matcher (not just '/' and locale-prefixed paths) so legacy pre-i18n URLs like
  // /buildings/Oka%20haus — already indexed by Google and shared externally — get redirected
  // to /en/buildings/Oka%20haus instead of 404ing. Excludes API routes, Next internals, and
  // static files (anything with a dot, e.g. favicon.ico, hero-web.mp4).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
