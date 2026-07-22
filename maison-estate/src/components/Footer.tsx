'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const locale = useLocale();
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');

  return (
    <footer className="site-footer">
      <div className="footer-logo">{tFooter('logo')}</div>
      <p className="footer-text">{tFooter('copyright', { year: new Date().getFullYear() })}</p>
      <nav className="footer-links">
        <Link href={`/${locale}/listings`}>{tNav('listings')}</Link>
        <Link href={`/${locale}/about`}>{tNav('about')}</Link>
        <Link href={`/${locale}/contact`}>{tNav('contact')}</Link>
      </nav>
    </footer>
  );
}
