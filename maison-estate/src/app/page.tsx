import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProperties } from '@/lib/sheets';
import { getAreaGroup, unitLabel } from '@/lib/buildings';

export default async function Home() {
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
      <section style={{
        paddingTop: '160px', paddingBottom: '100px',
        background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)',
        padding: '160px 64px 100px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ maxWidth: '720px' }}>
            <p className="page-eyebrow">Bangkok · Verified Sansiri Rentals</p>
            <h1 style={{
              fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(48px,6vw,88px)',
              fontWeight: 400, lineHeight: 1.05, color: 'var(--primary)', marginBottom: '28px',
            }}>
              Find Your Home<br />
              in <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Bangkok</em>
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '40px', maxWidth: '520px' }}>
              Verified Sansiri rental properties across Bangkok's prime districts.
              No service fees for tenants — we work for you.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/listings" className="nav-cta" style={{ fontSize: '12px' }}>
                Browse {total} Listings →
              </Link>
              <Link href="/buildings" style={{
                padding: '12px 28px', border: '1px solid var(--border)', borderRadius: '30px',
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.3s',
              }}>
                View Buildings
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '40px', marginTop: '64px', flexWrap: 'wrap' }}>
            {[
              { val: total, label: 'Available Units' },
              { val: Object.keys(areaCounts).length, label: 'Districts' },
              { val: '0', label: 'Service Fee for Tenants' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '40px', fontWeight: 400, color: 'var(--primary)', lineHeight: 1 }}>
                  {s.val}
                </div>
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '6px' }}>
                  {s.label}
                </div>
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
                <p className="page-eyebrow">Premium Selection</p>
                <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 400, color: 'var(--primary)' }}>
                  Featured Listings
                </h2>
              </div>
              <Link href="/listings" style={{ color: 'var(--gold)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
                View All →
              </Link>
            </div>
            <div className="properties-grid">
              {featured.map((p, i) => {
                const price = Number(p.price);
                return (
                  <Link key={i} href={`/buildings/${encodeURIComponent(p.project)}`}
                    className="property-card" style={{ textDecoration: 'none', display: 'block', animationDelay: `${i * 0.1}s` }}>
                    <div className="card-img">
                      <div className="card-img-bg" style={{ background: ['linear-gradient(135deg,#1a2a1a,#0a1a2a)', 'linear-gradient(135deg,#2a1a0a,#1a2a1a)', 'linear-gradient(135deg,#0a2a2a,#1a1a0a)'][i] }} />
                      <div className="card-overlay"><button className="overlay-btn">View Units →</button></div>
                      <div className="card-badge"><div className="badge-dot" />Available</div>
                    </div>
                    <div className="card-info">
                      <div className="card-building">{p.project}</div>
                      <div className="card-name">{unitLabel(p.unitType, p.unit, p.area)}</div>
                      <div className="card-specs">
                        {p.area && <span className="spec">{p.area} sqm</span>}
                        {p.direction && <span className="spec">{p.direction}</span>}
                      </div>
                      <div className="card-footer">
                        <div className="card-price">{price ? `฿${price.toLocaleString('th-TH')}` : '—'} <span>/ mo</span></div>
                        <div className="card-avail">Available</div>
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
            <p className="page-eyebrow">Browse by Location</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 400, color: 'var(--primary)' }}>
              Bangkok's Prime Districts
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {topAreas.map(([area, count]) => (
              <Link key={area} href={`/listings?area=${encodeURIComponent(area)}`}
                className="area-card"
              >
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '20px', fontWeight: 400, color: 'var(--primary)' }}>{area}</div>
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.1em' }}>{count} units</div>
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
              Why Select Rentals BKK
            </p>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 400, color: '#fff' }}>
              The Smarter Way to Rent in Bangkok
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '40px' }}>
            {[
              { title: 'No Service Fees', body: 'We never charge tenants. Our fee is paid by the landlord — you get full service at zero cost.' },
              { title: 'Verified Properties', body: 'Every listing is a verified Sansiri property. No fake listings, no surprises on moving day.' },
              { title: 'Fast Viewings', body: 'Book a viewing in minutes. We confirm within 2 hours and handle all coordination for you.' },
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
        <p className="page-eyebrow" style={{ marginBottom: '16px' }}>Ready to Find Your Home?</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(32px,4vw,56px)', fontWeight: 400, color: 'var(--primary)', marginBottom: '32px' }}>
          Browse <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{total} Available</em> Units Today
        </h2>
        <Link href="/listings" className="nav-cta" style={{ fontSize: '12px' }}>
          View All Listings →
        </Link>
      </section>

      <Footer />
    </>
  );
}
