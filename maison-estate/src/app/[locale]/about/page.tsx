import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us — Select Rentals Bangkok',
  description: 'Select Rentals Bangkok specialises in verified Sansiri rental properties. No service fees for tenants.',
};

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('about');
  const values = [
    { label: t('valueVerifiedLabel'), body: t('valueVerifiedBody') },
    { label: t('valueFeesLabel'), body: t('valueFeesBody') },
    { label: t('valueSpecialistsLabel'), body: t('valueSpecialistsBody') },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="page-header">
          <div className="page-header-inner">
            <div>
              <div className="page-eyebrow">{t('eyebrow')}</div>
              <h1 className="page-title">{t('titlePre')} <em>{t('titleEm')}</em></h1>
            </div>
          </div>
        </div>

        {/* Mission */}
        <section style={{ padding: '80px 64px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(24px,3vw,40px)', fontWeight: 400, color: 'var(--primary)', marginBottom: '24px', lineHeight: 1.2 }}>
              {t('missionHeading')}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px' }}>
              {t('missionP1')}
            </p>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              {t('missionP2Pre')}<strong style={{ color: 'var(--primary)', fontWeight: 500 }}>{t('missionP2Strong')}</strong>{t('missionP2Post')}
            </p>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: '80px 64px', background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '40px' }}>
              {values.map(v => (
                <div key={v.label} style={{ borderTop: '2px solid var(--gold)', paddingTop: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '22px', fontWeight: 400, color: 'var(--primary)', marginBottom: '12px' }}>{v.label}</div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '80px 64px', background: 'var(--bg-main)', textAlign: 'center' }}>
          <p className="page-eyebrow" style={{ marginBottom: '16px' }}>{t('ctaEyebrow')}</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px,3vw,48px)', fontWeight: 400, color: 'var(--primary)', marginBottom: '32px' }}>
            {t('ctaHeading')}
          </h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${locale}/listings`} className="nav-cta" style={{ fontSize: '12px' }}>{t('ctaListings')}</Link>
            <Link href={`/${locale}/contact`} style={{
              padding: '12px 28px', border: '1px solid var(--border)', borderRadius: '30px',
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--text-muted)', textDecoration: 'none',
            }}>{t('ctaContact')}</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
