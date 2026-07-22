'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'th', label: 'ไทย' },
  { code: 'zh', label: '中文' },
];

export default function Navbar() {
  const path = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => { setOpen(false); setLangOpen(false); }, [path]);

  // Strip the current /xx locale prefix so path comparisons below work regardless of locale.
  const bare = path.replace(/^\/(en|th|zh)(?=\/|$)/, '') || '/';

  function switchLocale(newLocale: string): string {
    const segments = path.split('/');
    segments[1] = newLocale;
    return segments.join('/') || `/${newLocale}`;
  }

  return (
    <>
      <nav className="site-nav">
        <Link href={`/${locale}`} className="nav-logo">
          Select <span>Rentals</span> BKK
        </Link>
        <ul className="nav-links">
          <li><Link href={`/${locale}/listings`}  className={bare.startsWith('/listings')  ? 'active' : ''}>{t('listings')}</Link></li>
          <li><Link href={`/${locale}/buildings`} className={bare.startsWith('/buildings') ? 'active' : ''}>{t('buildings')}</Link></li>
          <li><Link href={`/${locale}/about`}     className={bare === '/about'             ? 'active' : ''}>{t('about')}</Link></li>
          <li><Link href={`/${locale}/contact`}   className={bare === '/contact'           ? 'active' : ''}>{t('contact')}</Link></li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="lang-switch" style={{ position: 'relative' }}>
            <button className="lang-switch-trigger" onClick={() => setLangOpen(o => !o)}>
              {LOCALES.find(l => l.code === locale)?.label ?? 'EN'}
            </button>
            {langOpen && (
              <div className="lang-switch-panel">
                {LOCALES.map(l => (
                  <Link key={l.code} href={switchLocale(l.code)} className={`lang-switch-opt${locale === l.code ? ' active' : ''}`}>
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href={`/${locale}/contact`} className="nav-cta nav-cta-desktop">{t('bookViewing')}</Link>
          <button
            className={`nav-hamburger${open ? ' open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`nav-mobile-menu${open ? ' open' : ''}`}>
        <ul>
          <li><Link href={`/${locale}/listings`}>{t('listings')}</Link></li>
          <li><Link href={`/${locale}/buildings`}>{t('buildings')}</Link></li>
          <li><Link href={`/${locale}/about`}>{t('about')}</Link></li>
          <li><Link href={`/${locale}/contact`}>{t('contact')}</Link></li>
        </ul>
        <div className="lang-switch-mobile">
          {LOCALES.map(l => (
            <Link key={l.code} href={switchLocale(l.code)} className={`lang-switch-opt${locale === l.code ? ' active' : ''}`}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link href={`/${locale}/contact`} className="nav-cta" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
          {t('bookViewing')}
        </Link>
      </div>
    </>
  );
}
