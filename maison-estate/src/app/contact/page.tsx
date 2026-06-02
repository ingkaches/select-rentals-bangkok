'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SCRIPT_URL } from '@/lib/buildings';

export default function ContactPage() {
  const [contactMethod, setContactMethod] = useState<'WhatsApp' | 'LINE'>('WhatsApp');
  const [submitted, setSubmitted]         = useState(false);
  const [sending, setSending]             = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      timestamp:     new Date().toISOString(),
      building:      fd.get('interest') ?? 'General Enquiry',
      unit:          '',
      floor:         '',
      unitType:      '',
      area:          '',
      price:         '',
      name:          fd.get('name'),
      nationality:   fd.get('nationality'),
      persons:       '',
      leaseDuration: fd.get('leaseDuration'),
      moveInDate:    fd.get('moveInDate'),
      phone:         fd.get('phone'),
      contactMethod,
      contactId:     fd.get('contactId'),
      viewingDate:   '',
      viewingTime:   '',
      notes:         fd.get('notes') ?? '',
      status:        'New Enquiry',
    };
    fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload) }).catch(() => {});
    setTimeout(() => { setSending(false); setSubmitted(true); }, 600);
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="page-header">
          <div className="page-header-inner">
            <div>
              <div className="page-eyebrow">Get In Touch</div>
              <h1 className="page-title">Contact <em>Us</em></h1>
            </div>
          </div>
        </div>

        <div style={{ padding: '64px', background: 'var(--bg-main)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Left — info */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '32px', fontWeight: 400, color: 'var(--primary)', marginBottom: '20px', lineHeight: 1.2 }}>
              Tell us what you're looking for
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '40px' }}>
              Fill in the form and we'll get back to you within 2 hours. Or reach us directly on WhatsApp or LINE.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { label: 'WhatsApp', val: '+66 93 135 9359', href: 'https://wa.me/66931359359' },
                { label: 'LINE',     val: '@selectrentalsbkk', href: 'https://line.me/ti/p/@selectrentalsbkk' },
                { label: 'Email',    val: 'hello@selectrentalsbkk.com', href: 'mailto:hello@selectrentalsbkk.com' },
              ].map(c => (
                <div key={c.label} style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '6px' }}>{c.label}</div>
                  <a href={c.href} style={{ fontSize: '15px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>{c.val}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '40px', position: 'relative' }}>
            {submitted ? (
              <div className="vf-success" style={{ paddingTop: '60px' }}>
                <div className="vf-success-icon">✓</div>
                <div className="vf-success-title">Message Received!</div>
                <p className="vf-success-sub">We'll be in touch within 2 hours. Thank you!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="vf-grid">
                  <div className="vf-field">
                    <label className="vf-label">Full Name *</label>
                    <input name="name" required className="vf-input" placeholder="Your name" />
                  </div>
                  <div className="vf-field">
                    <label className="vf-label">Nationality</label>
                    <input name="nationality" className="vf-input" placeholder="e.g. Thai, Japanese" />
                  </div>
                  <div className="vf-field">
                    <label className="vf-label">Phone *</label>
                    <input name="phone" required className="vf-input" placeholder="+66 81 234 5678" />
                  </div>
                  <div className="vf-field">
                    <label className="vf-label">Preferred Contact</label>
                    <div className="vf-toggle">
                      <button type="button" className={`vf-toggle-btn${contactMethod === 'WhatsApp' ? ' on' : ''}`} onClick={() => setContactMethod('WhatsApp')}>WhatsApp</button>
                      <button type="button" className={`vf-toggle-btn${contactMethod === 'LINE' ? ' on' : ''}`} onClick={() => setContactMethod('LINE')}>LINE</button>
                    </div>
                  </div>
                  <div className="vf-field full">
                    <label className="vf-label">{contactMethod === 'WhatsApp' ? 'WhatsApp Number *' : 'LINE ID *'}</label>
                    <input name="contactId" required className="vf-input" placeholder={contactMethod === 'WhatsApp' ? '+66 81 234 5678' : '@yourlineid'} />
                  </div>
                  <div className="vf-field">
                    <label className="vf-label">Interested In (Building / Area)</label>
                    <input name="interest" className="vf-input" placeholder="e.g. Thonglor, KHUN BY YOO" />
                  </div>
                  <div className="vf-field">
                    <label className="vf-label">Lease Duration</label>
                    <select name="leaseDuration" className="vf-select">
                      <option>6 months</option><option>1 year</option><option>2 years</option><option>Other</option>
                    </select>
                  </div>
                  <div className="vf-field full">
                    <label className="vf-label">Move-in Date</label>
                    <input name="moveInDate" type="date" className="vf-input" />
                  </div>
                  <div className="vf-field full">
                    <label className="vf-label">Message</label>
                    <textarea name="notes" className="vf-textarea" style={{ minHeight: '100px' }} placeholder="Tell us your requirements..." />
                  </div>
                </div>
                <button type="submit" className="vf-submit-btn" style={{ marginTop: '24px' }} disabled={sending}>
                  {sending ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
