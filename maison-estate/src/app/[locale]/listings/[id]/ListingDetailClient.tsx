'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Property, BuildingData, Locale } from '@/lib/types';
import { SCRIPT_URL, unitLabel, directionLabel, parseFloor, extractFolderId, driveImageUrl, driveImgOnError } from '@/lib/buildings';

const BG = [
  'linear-gradient(135deg,#1a2a1a,#0a1a2a)',
  'linear-gradient(135deg,#1a1a2a,#2a1a1a)',
  'linear-gradient(135deg,#2a1a0a,#1a2a1a)',
];

async function fetchImages(driveUrl: string): Promise<string[]> {
  const folderId = extractFolderId(driveUrl);
  if (!folderId || !SCRIPT_URL) return [];
  try {
    const res  = await fetch(`${SCRIPT_URL}?action=images&folder=${encodeURIComponent(folderId)}`);
    const data = await res.json();
    if (data.files?.length) return data.files.map((f: { id: string }) => driveImageUrl(f.id));
  } catch { /* ignore */ }
  return [];
}

export default function ListingDetailClient({
  prop, bdata, related,
}: {
  prop:    Property;
  bdata:   BuildingData | null;
  related: Property[];
}) {
  const locale = useLocale();
  const t = useTranslations('listingDetail');
  const tCommon = useTranslations('common');
  const tViewing = useTranslations('viewing');
  const [images,        setImages]        = useState<string[]>([]);
  const [imgIdx,        setImgIdx]        = useState(0);
  const [imgLoading,    setImgLoading]    = useState(true);
  const [submitted,     setSubmitted]     = useState(false);
  const [sending,       setSending]       = useState(false);
  const [contactMethod, setContactMethod] = useState<'WhatsApp' | 'LINE'>('WhatsApp');

  useEffect(() => {
    setImgLoading(true);
    setImages([]);
    setImgIdx(0);
    if (!prop.driveUrl) { setImgLoading(false); return; }
    fetchImages(prop.driveUrl).then(imgs => { setImages(imgs); setImgLoading(false); });
  }, [prop.driveUrl]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      timestamp:     new Date().toISOString(),
      building:      prop.project,
      unit:          prop.unit,
      floor:         prop.floor,
      unitType:      prop.unitType,
      area:          String(prop.area),
      price:         String(prop.price),
      name:          fd.get('name'),
      nationality:   fd.get('nationality') ?? '',
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
    fetch(SCRIPT_URL, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    }).catch(() => {});
    setTimeout(() => { setSending(false); setSubmitted(true); }, 600);
  }

  const fp    = parseFloor(prop.floor);
  const price = Number(prop.price);
  const label = unitLabel(prop.unitType, prop.unit, prop.area, locale as Locale);

  return (
    <div style={{ paddingTop: '73px' }}>

      {/* ── Breadcrumb ── */}
      <div className="detail-breadcrumb">
        <Link href={`/${locale}/listings`} className="detail-back">{t('allListings')}</Link>
        <span className="detail-sep">·</span>
        <Link href={`/${locale}/buildings/${encodeURIComponent(prop.project)}`} className="detail-back">
          {prop.project}
        </Link>
      </div>

      {/* ── Photo Gallery ── */}
      <div className="detail-gallery">
        {imgLoading && (
          <div className="detail-gallery-loader">
            <div className="gallery-spinner" />
          </div>
        )}
        {images.map((src, i) => (
          <div key={i} className={`detail-gallery-slide${i === imgIdx ? ' active' : ''}`}>
            <img src={src} alt={`${label} photo ${i + 1}`} onError={driveImgOnError} />
          </div>
        ))}
        {!imgLoading && images.length === 0 && (
          <div className="detail-gallery-empty" style={{ background: BG[0] }}>
            <span>{tCommon('photosComingSoon')}</span>
          </div>
        )}
        <div className="detail-gallery-overlay" />

        {images.length > 1 && (
          <>
            <button className="gallery-nav-btn prev" onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}>‹</button>
            <button className="gallery-nav-btn next" onClick={() => setImgIdx(i => (i + 1) % images.length)}>›</button>
            <div className="gallery-counter">{imgIdx + 1} / {images.length}</div>
            <div className="gallery-dots">
              {images.slice(0, 8).map((_, i) => (
                <button key={i} className={`gallery-dot${i === imgIdx ? ' active' : ''}`} onClick={() => setImgIdx(i)} />
              ))}
            </div>
          </>
        )}

        {/* Title overlay */}
        <div className="detail-gallery-title">
          <div className="detail-gallery-building">{prop.project}</div>
          <h1 className="detail-gallery-h1">{label}</h1>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="detail-body">

        {/* Left column */}
        <div className="detail-left">

          {/* Price */}
          <div className="detail-price-block">
            <div className="detail-price">
              {price ? `฿${price.toLocaleString('th-TH')}` : '—'}
              <span>{tCommon('perMonthLong')}</span>
            </div>
            <div className="detail-avail">
              <div className="badge-dot" />
              {tCommon('availableNow')}
            </div>
          </div>

          {/* Specs */}
          <div className="detail-section">
            <div className="detail-section-title">{t('unitDetailsTitle')}</div>
            <div className="detail-specs-grid">
              {[
                { label: t('building'),  val: prop.project },
                { label: t('unitType'),  val: prop.unitType || '—' },
                { label: t('unitNo'),    val: prop.unit     || '—' },
                { label: t('floor'),     val: fp.floor ? t('floorValue', { n: fp.floor }) : (prop.floor || '—') },
                { label: t('size'),      val: prop.area ? `${prop.area} ${tCommon('sqm')}` : '—' },
                { label: t('direction'), val: directionLabel(prop.direction, locale as Locale) || '—' },
              ].map(s => (
                <div key={s.label} className="detail-spec-cell">
                  <div className="detail-spec-label">{s.label}</div>
                  <div className="detail-spec-val">{s.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Building info */}
          {bdata && (
            <div className="detail-section">
              <div className="detail-section-title">{t('aboutBuilding', { name: prop.project })}</div>
              {bdata.highlight && (
                <p className="detail-highlight">"{bdata.highlight}"</p>
              )}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {bdata.bts    && <span className="spec">{bdata.bts}</span>}
                {bdata.floors && <span className="spec">{bdata.floors} {tCommon('floorsSuffix')}</span>}
                {bdata.year   && <span className="spec">{tCommon('builtYear', { year: bdata.year })}</span>}
              </div>
              {bdata.facilities && bdata.facilities.length > 0 && (
                <>
                  <div className="detail-spec-label" style={{ marginBottom: '10px' }}>{t('facilities')}</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {bdata.facilities.map(f => <span key={f} className="facility-tag">{f}</span>)}
                  </div>
                </>
              )}
              <div style={{ marginTop: '20px' }}>
                <Link href={`/${locale}/buildings/${encodeURIComponent(prop.project)}`} style={{
                  color: 'var(--gold)', fontSize: '12px', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
                }}>
                  {t('seeAllUnits')}
                </Link>
              </div>
            </div>
          )}

          {/* No-fee promise */}
          <div className="detail-promise">
            <div className="detail-promise-icon">✦</div>
            <div>
              <div className="detail-promise-title">{t('noFeeTitle')}</div>
              <div className="detail-promise-body">{t('noFeeBody')}</div>
            </div>
          </div>
        </div>

        {/* Right column — Booking form */}
        <div className="detail-right">
          <div className="detail-form-card">
            {submitted ? (
              <div className="vf-success">
                <div className="vf-success-icon">✓</div>
                <div className="vf-success-title">{t('viewingRequested')}</div>
                <p className="vf-success-sub">{t('seeYouSoon')}</p>
                <Link href={`/${locale}/listings`} style={{
                  display: 'inline-block', marginTop: '20px', color: 'var(--gold)',
                  fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontWeight: 600, textDecoration: 'none',
                }}>{t('browseMore')}</Link>
              </div>
            ) : (
              <>
                <div className="detail-form-header">
                  <div className="detail-form-title">{t('bookViewing')}</div>
                  <div className="detail-form-sub">{t('confirmedIn2h')}</div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div className="vf-field">
                      <label className="vf-label">{tViewing('fullName')}</label>
                      <input name="name" required className="vf-input" placeholder={tViewing('fullNamePlaceholder')} />
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
                    <div className="vf-field">
                      <label className="vf-label">{contactMethod === 'WhatsApp' ? tViewing('whatsappNumber') : tViewing('lineId')}</label>
                      <input name="contactId" required className="vf-input"
                        placeholder={contactMethod === 'WhatsApp' ? tViewing('phonePlaceholder') : tViewing('lineIdPlaceholder')} />
                    </div>
                    <div className="vf-field">
                      <label className="vf-label">{tViewing('moveInDate')}</label>
                      <input name="moveInDate" type="date" className="vf-input" />
                    </div>
                    <div className="vf-field">
                      <label className="vf-label">{tViewing('leaseDuration')}</label>
                      <select name="leaseDuration" className="vf-select">
                        <option>{tViewing('lease6m')}</option>
                        <option>{tViewing('lease1y')}</option>
                        <option>{tViewing('lease2y')}</option>
                        <option>{tViewing('leaseOther')}</option>
                      </select>
                    </div>
                    <div className="vf-field">
                      <label className="vf-label">{t('messageOptional')}</label>
                      <textarea name="notes" className="vf-textarea" placeholder={t('messagePlaceholder')} />
                    </div>
                    <button type="submit" className="vf-submit-btn" disabled={sending}>
                      {sending ? tViewing('sending') : t('requestViewing')}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Share */}
          <div className="detail-share">
            <span className="detail-share-label">{t('share')}</span>
            <button
              className="detail-share-btn"
              onClick={() => navigator.clipboard?.writeText(window.location.href).then(() => alert(t('linkCopied')))}
            >
              {t('copyLink')}
            </button>
          </div>
        </div>
      </div>

      {/* ── Related listings ── */}
      {related.length > 0 && (
        <div className="detail-related">
          <div className="detail-related-inner">
            <p className="page-eyebrow" style={{ marginBottom: '8px' }}>{t('sameBuilding')}</p>
            <h2 className="detail-related-title">{t('moreUnitsAt', { name: prop.project })}</h2>
            <div className="properties-grid">
              {related.map((r, i) => {
                const rPrice = Number(r.price);
                const rid    = encodeURIComponent(r.project + '|' + r.unit);
                return (
                  <Link key={i} href={`/${locale}/listings/${rid}`} className="property-card"
                    style={{ textDecoration: 'none', display: 'block', animationDelay: `${i * 0.08}s` }}>
                    <div className="card-img">
                      <div className="card-img-bg" style={{ background: BG[i % BG.length] }} />
                      <div className="card-overlay"><button className="overlay-btn">{tCommon('viewUnit')}</button></div>
                      <div className="card-badge"><div className="badge-dot" />{tCommon('available')}</div>
                    </div>
                    <div className="card-info">
                      <div className="card-building">{r.project}</div>
                      <div className="card-name">{unitLabel(r.unitType, r.unit, r.area, locale as Locale)}</div>
                      <div className="card-specs">
                        {r.area      && <span className="spec">{r.area} {tCommon('sqm')}</span>}
                        {r.direction && <span className="spec">{directionLabel(r.direction, locale as Locale)}</span>}
                      </div>
                      <div className="card-footer">
                        <div className="card-price">
                          {rPrice ? `฿${rPrice.toLocaleString('th-TH')}` : '—'}
                          <span>{tCommon('perMonth')}</span>
                        </div>
                        <div className="card-avail">{tCommon('view')}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link href={`/${locale}/buildings/${encodeURIComponent(prop.project)}`} className="hero-btn-outline">
                {t('seeAllUnitsIn', { name: prop.project })}
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
