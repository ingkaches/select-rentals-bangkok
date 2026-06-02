import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us — Select Rentals Bangkok',
  description: 'Select Rentals Bangkok specialises in verified Sansiri rental properties. No service fees for tenants.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="page-header">
          <div className="page-header-inner">
            <div>
              <div className="page-eyebrow">Who We Are</div>
              <h1 className="page-title">About <em>Select Rentals BKK</em></h1>
            </div>
          </div>
        </div>

        {/* Mission */}
        <section style={{ padding: '80px 64px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(24px,3vw,40px)', fontWeight: 400, color: 'var(--primary)', marginBottom: '24px', lineHeight: 1.2 }}>
              Bangkok's most straightforward way to find a Sansiri rental
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px' }}>
              We specialise exclusively in Sansiri properties across Bangkok's prime districts — Thonglor, Ekkamai, Sukhumvit, Rama 9, and beyond. Every listing on our platform is verified, available, and accurately priced.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Our model is simple: <strong style={{ color: 'var(--primary)', fontWeight: 500 }}>tenants pay zero service fees</strong>. We work on behalf of landlords and building managers, so you get full agency service at no cost to you.
            </p>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: '80px 64px', background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '40px' }}>
              {[
                { label: 'Verified Only', body: 'Every listing is a real, available Sansiri unit. We verify availability before it goes live.' },
                { label: 'Zero Tenant Fees', body: 'Our fee comes from the landlord side. You never pay us a single baht for our service.' },
                { label: 'Bangkok Specialists', body: 'We know these buildings inside out — floor plans, BTS distances, best floors, and view directions.' },
              ].map(v => (
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
          <p className="page-eyebrow" style={{ marginBottom: '16px' }}>Ready to start?</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px,3vw,48px)', fontWeight: 400, color: 'var(--primary)', marginBottom: '32px' }}>
            Browse available units or get in touch
          </h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/listings" className="nav-cta" style={{ fontSize: '12px' }}>View All Listings →</Link>
            <Link href="/contact" style={{
              padding: '12px 28px', border: '1px solid var(--border)', borderRadius: '30px',
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--text-muted)', textDecoration: 'none',
            }}>Contact Us</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
