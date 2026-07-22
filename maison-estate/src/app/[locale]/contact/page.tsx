'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SCRIPT_URL } from '@/lib/buildings';

export default function ContactPage() {
  const t = useTranslations('contact');
  const tViewing = useTranslations('viewing');
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
              <div className="page-eyebrow">{t('eyebrow')}</div>
              <h1 className="page-title">{t('titlePre')} <em>{t('titleEm')}</em></h1>
            </div>
          </div>
        </div>

        <div style={{ padding: '64px', background: 'var(--bg-main)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Left — info */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '32px', fontWeight: 400, color: 'var(--primary)', marginBottom: '20px', lineHeight: 1.2 }}>
              {t('heading')}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '40px' }}>
              {t('body')}
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
                <div className="vf-success-title">{t('messageReceived')}</div>
                <p className="vf-success-sub">{t('messageReceivedSub')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="vf-grid">
                  <div className="vf-field">
                    <label className="vf-label">{tViewing('fullName')}</label>
                    <input name="name" required className="vf-input" placeholder={tViewing('fullNamePlaceholder')} />
                  </div>
                  <div className="vf-field">
                    <label className="vf-label">{tViewing('nationality')}</label>
                    <input name="nationality" className="vf-input" placeholder={tViewing('nationalityPlaceholder')} />
                  </div>
                  <div className="vf-field">
                    <label className="vf-label">{tViewing('phone')}</label>
                    <input name="phone" required className="vf-input" placeholder={tViewing('phonePlaceholder')} />
                  </div>
                  <div className="vf-field">
                    <label className="vf-label">{tViewing('preferredContact')}</label>
                    <div className="vf-toggle">
                      <button type="button" className={`vf-toggle-btn${contactMethod === 'WhatsApp' ? ' on' : ''}`} onClick={() => setContactMethod('WhatsApp')}>WhatsApp</button>
                      <button type="button" className={`vf-toggle-btn${contactMethod === 'LINE' ? ' on' : ''}`} onClick={() => setContactMethod('LINE')}>LINE</button>
                    </div>
                  </div>
                  <div className="vf-field full">
                    <label className="vf-label">{contactMethod === 'WhatsApp' ? tViewing('whatsappNumber') : tViewing('lineId')}</label>
                    <input name="contactId" required className="vf-input" placeholder={contactMethod === 'WhatsApp' ? tViewing('phonePlaceholder') : tViewing('lineIdPlaceholder')} />
                  </div>
                  <div className="vf-field">
                    <label className="vf-label">{t('interestedIn')}</label>
                    <input name="interest" className="vf-input" placeholder={t('interestedInPlaceholder')} />
                  </div>
                  <div className="vf-field">
                    <label className="vf-label">{tViewing('leaseDuration')}</label>
                    <select name="leaseDuration" className="vf-select">
                      <option>{tViewing('lease6m')}</option><option>{tViewing('lease1y')}</option><option>{tViewing('lease2y')}</option><option>{tViewing('leaseOther')}</option>
                    </select>
                  </div>
                  <div className="vf-field full">
                    <label className="vf-label">{tViewing('moveInDate')}</label>
                    <input name="moveInDate" type="date" className="vf-input" />
                  </div>
                  <div className="vf-field full">
                    <label className="vf-label">{t('message')}</label>
                    <textarea name="notes" className="vf-textarea" style={{ minHeight: '100px' }} placeholder={t('messagePlaceholder')} />
                  </div>
                </div>
                <button type="submit" className="vf-submit-btn" style={{ marginTop: '24px' }} disabled={sending}>
                  {sending ? tViewing('sending') : t('sendMessage')}
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
