import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProperties } from '@/lib/sheets';
import { getAreaGroup, unitLabel, directionLabel } from '@/lib/buildings';
import type { Locale } from '@/lib/types';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');
  const properties = await fetchProperties().catch(() => []);
  const total = properties.length;

  // Count by area
  const areaCounts: Record<string, number> = {};
  for (const p of properties) {
    const a = getAreaGroup(p.project);
    areaCounts[a] = (areaCounts[a] ?? 0) + 1;
  }
  const topAreas = Object.entries(areaCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  // Featured — pick 3 with highest price
  const featured = [...properties].sort((a, b) => Number(b.price) - Number(a.price)).slice(0, 3);

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero-section">
        {/* Video background */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero-web.mp4" type="video/mp4" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay layers */}
        <div className="hero-overlay" />

        {/* Content */}
        <div className="hero-content">
          <div className="hero-content-inner">
            <p className="hero-eyebrow">{t('heroEyebrow')}</p>
            <h1 className="hero-title">
              {t('heroTitleLine1')}<br />
              {t('heroTitleConnector')} <em>{t('heroTitleEm')}</em>
            </h1>
            <p className="hero-desc">{t('heroDesc')}</p>
            <div className="hero-actions">
              <Link href={`/${locale}/listings`} className="nav-cta" style={{ fontSize: '12px' }}>
                {t('browseListings', { count: total })}
              </Link>
              <Link href={`/${locale}/buildings`} className="hero-btn-outline hero-btn-outline-light">
                {t('viewBuildings')}
              </Link>
            </div>
          </div>

          {/* Stats bar at bottom */}
          <div className="hero-stats-bar">
            {[
              { val: total,                          label: t('statUnits') },
              { val: Object.keys(areaCounts).length, label: t('statDistricts') },
              { val: '฿0',                           label: t('statFee') },
              { val: '2 hrs',                        label: t('statViewing') },
            ].map((s, i) => (
              <div key={s.label} className="hero-stat-item">
                <div className="hero-stat-val">{s.val}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured ── */}
      {featured.length > 0 && (
        <section style={{ padding: '80px 64px', background: 'var(--bg-main)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
              <div>
                <p className="page-eyebrow">{t('featuredEyebrow')}</p>
                <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 400, color: 'var(--primary)' }}>
                  {t('featuredTitle')}
                </h2>
              </div>
              <Link href={`/${locale}/listings`} style={{ color: 'var(--gold)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
                {t('viewAll')}
              </Link>
            </div>
            <div className="properties-grid">
              {featured.map((p, i) => {
                const price = Number(p.price);
                return (
                  <Link key={i} href={`/${locale}/buildings/${encodeURIComponent(p.project)}`}
                    className="property-card" style={{ textDecoration: 'none', display: 'block', animationDelay: `${i * 0.1}s` }}>
                    <div className="card-img">
                      <div className="card-img-bg" style={{ background: ['linear-gradient(135deg,#1a2a1a,#0a1a2a)', 'linear-gradient(135deg,#2a1a0a,#1a2a1a)', 'linear-gradient(135deg,#0a2a2a,#1a1a0a)'][i] }} />
                      <div className="card-overlay"><button className="overlay-btn">{tCommon('viewUnits')}</button></div>
                      <div className="card-badge"><div className="badge-dot" />{tCommon('available')}</div>
                    </div>
                    <div className="card-info">
                      <div className="card-building">{p.project}</div>
                      <div className="card-name">{unitLabel(p.unitType, p.unit, p.area, locale as Locale)}</div>
                      <div className="card-specs">
                        {p.area && <span className="spec">{p.area} {tCommon('sqm')}</span>}
                        {p.direction && <span className="spec">{directionLabel(p.direction, locale as Locale)}</span>}
                      </div>
                      <div className="card-footer">
                        <div className="card-price">{price ? `฿${price.toLocaleString('th-TH')}` : '—'} <span>{tCommon('perMonth')}</span></div>
                        <div className="card-avail">{tCommon('available')}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Areas ── */}
      <section style={{ padding: '80px 64px', background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <p className="page-eyebrow">{t('areasEyebrow')}</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 400, color: 'var(--primary)' }}>
              {t('areasTitle')}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {topAreas.map(([area, count]) => (
              <Link key={area} href={`/${locale}/listings?area=${encodeURIComponent(area)}`} className="area-card">
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '20px', fontWeight: 400, color: 'var(--primary)' }}>{area}</div>
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{count} {t('unitsSuffix')}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section style={{ padding: '80px 64px', background: 'var(--primary)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('whyEyebrow')}
            </p>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 400, color: '#fff' }}>
              {t('whyTitle')}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '40px' }}>
            {[
              { title: t('whyNoFeesTitle'), body: t('whyNoFeesBody') },
              { title: t('whyVerifiedTitle'), body: t('whyVerifiedBody') },
              { title: t('whyFastTitle'), body: t('whyFastBody') },
            ].map(item => (
              <div key={item.title}>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '22px', fontWeight: 400, color: 'var(--gold)', marginBottom: '12px' }}>{item.title}</div>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 64px', background: 'var(--bg-alt)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <p className="page-eyebrow" style={{ marginBottom: '16px' }}>{t('ctaEyebrow')}</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(32px,4vw,56px)', fontWeight: 400, color: 'var(--primary)', marginBottom: '32px' }}>
          {t('ctaTitlePre')} <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{t('ctaTitleEm', { count: total })}</em> {t('ctaTitlePost')}
        </h2>
        <Link href={`/${locale}/listings`} className="nav-cta" style={{ fontSize: '12px' }}>
          {t('ctaButton')}
        </Link>
      </section>

      <Footer />
    </>
  );
}
