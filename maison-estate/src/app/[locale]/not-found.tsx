'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations('notFound');
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '73px', minHeight: 'calc(100vh - 73px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '80px 24px', background: 'var(--bg-alt)', textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(80px,15vw,160px)',
            fontWeight: 400, color: 'var(--border)', lineHeight: 1,
          }}>
            404
          </div>
          <h1 style={{
            fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(24px,3vw,40px)',
            fontWeight: 400, color: 'var(--primary)', marginBottom: '16px', marginTop: '8px',
          }}>
            {t('title')}
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '400px', marginBottom: '40px' }}>
            {t('body')}
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href={`/${locale}/listings`} className="nav-cta" style={{ fontSize: '12px' }}>
              {t('browseListings')}
            </Link>
            <Link href={`/${locale}`} className="hero-btn-outline">
              {t('backHome')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
