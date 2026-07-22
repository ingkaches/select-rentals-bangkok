'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Property, Locale } from '@/lib/types';
import { SCRIPT_URL, unitLabel } from '@/lib/buildings';

export default function ViewingModal({ prop, onClose }: { prop: Property; onClose: () => void }) {
  const locale = useLocale();
  const t = useTranslations('viewing');
  const [contactMethod, setContactMethod] = useState<'WhatsApp' | 'LINE'>('WhatsApp');
  const [submitted, setSubmitted]         = useState(false);
  const [sending, setSending]             = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      timestamp: new Date().toISOString(),
      building: prop.project, unit: prop.unit, floor: prop.floor,
      unitType: prop.unitType, area: String(prop.area ?? ''), price: String(prop.price ?? ''),
      name: fd.get('name'), nationality: fd.get('nationality'), persons: fd.get('persons'),
      leaseDuration: fd.get('leaseDuration'), moveInDate: fd.get('moveInDate'),
      phone: fd.get('phone'), contactMethod, contactId: fd.get('contactId'),
      viewingDate: fd.get('viewingDate') ?? '', viewingTime: fd.get('viewingTime') ?? '',
      notes: fd.get('notes') ?? '', status: 'New Lead',
    };
    fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload) }).catch(() => {});
    setTimeout(() => { setSending(false); setSubmitted(true); }, 600);
  }

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
        <div className="modal-box viewing-modal-box" style={{ position: 'relative' }}>
          <button className="modal-close" onClick={onClose} style={{ position: 'absolute' }}>×</button>
          {submitted ? (
            <div className="vf-success">
              <div className="vf-success-icon">✓</div>
              <div className="vf-success-title">{t('successTitle')}</div>
              <p className="vf-success-sub">{t('successSub')}</p>
            </div>
          ) : (
            <>
              <div className="viewing-header">
                <div className="viewing-title">{t('title')}</div>
                <div className="viewing-sub">{prop.project} · {unitLabel(prop.unitType, prop.unit, prop.area, locale as Locale)}</div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="viewing-body">
                  <div className="vf-grid">
                    <div className="vf-field"><label className="vf-label">{t('fullName')}</label><input name="name" required className="vf-input" placeholder={t('fullNamePlaceholder')} /></div>
                    <div className="vf-field"><label className="vf-label">{t('nationality')}</label><input name="nationality" className="vf-input" placeholder={t('nationalityPlaceholder')} /></div>
                    <div className="vf-field"><label className="vf-label">{t('phone')}</label><input name="phone" required className="vf-input" placeholder={t('phonePlaceholder')} /></div>
                    <div className="vf-field"><label className="vf-label">{t('persons')}</label><select name="persons" className="vf-select"><option>1</option><option>2</option><option>3</option><option>4+</option></select></div>
                    <div className="vf-field"><label className="vf-label">{t('preferredContact')}</label><div className="vf-toggle"><button type="button" className={`vf-toggle-btn${contactMethod === 'WhatsApp' ? ' on' : ''}`} onClick={() => setContactMethod('WhatsApp')}>WhatsApp</button><button type="button" className={`vf-toggle-btn${contactMethod === 'LINE' ? ' on' : ''}`} onClick={() => setContactMethod('LINE')}>LINE</button></div></div>
                    <div className="vf-field"><label className="vf-label">{contactMethod === 'WhatsApp' ? t('whatsappNumber') : t('lineId')}</label><input name="contactId" required className="vf-input" placeholder={contactMethod === 'WhatsApp' ? t('phonePlaceholder') : t('lineIdPlaceholder')} /></div>
                    <div className="vf-field"><label className="vf-label">{t('leaseDuration')}</label><select name="leaseDuration" className="vf-select"><option>{t('lease6m')}</option><option>{t('lease1y')}</option><option>{t('lease2y')}</option><option>{t('leaseOther')}</option></select></div>
                    <div className="vf-field"><label className="vf-label">{t('moveInDate')}</label><input name="moveInDate" type="date" className="vf-input" /></div>
                    <div className="vf-field"><label className="vf-label">{t('preferredViewingDate')}</label><input name="viewingDate" type="date" className="vf-input" /></div>
                    <div className="vf-field"><label className="vf-label">{t('preferredTime')}</label><select name="viewingTime" className="vf-select"><option value="">{t('timeAnytime')}</option><option>{t('timeMorning')}</option><option>{t('timeAfternoon')}</option><option>{t('timeEvening')}</option></select></div>
                    <div className="vf-field full"><label className="vf-label">{t('notes')}</label><textarea name="notes" className="vf-textarea" placeholder={t('notesPlaceholder')} /></div>
                  </div>
                </div>
                <div className="viewing-footer">
                  <button type="submit" className="vf-submit-btn" disabled={sending}>{sending ? t('sending') : t('submit')}</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
