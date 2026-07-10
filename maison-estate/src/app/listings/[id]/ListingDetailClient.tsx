'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property, BuildingData } from '@/lib/types';
import { SCRIPT_URL, unitLabel, parseFloor, extractFolderId } from '@/lib/buildings';

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
    if (data.files?.length) return data.files.map((f: { id: string }) => `https://lh3.googleusercontent.com/d/${f.id}`);
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
  const label = unitLabel(prop.unitType, prop.unit, prop.area);

  return (
    <div style={{ paddingTop: '73px' }}>

      {/* ── Breadcrumb ── */}
      <div className="detail-breadcrumb">
        <Link href="/listings" className="detail-back">← All Listings</Link>
        <span className="detail-sep">·</span>
        <Link href={`/buildings/${encodeURIComponent(prop.project)}`} className="detail-back">
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
            <img src={src} alt={`${label} photo ${i + 1}`} />
          </div>
        ))}
        {!imgLoading && images.length === 0 && (
          <div className="detail-gallery-empty" style={{ background: BG[0] }}>
            <span>Photos coming soon</span>
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
              <span>/ month</span>
            </div>
            <div className="detail-avail">
              <div className="badge-dot" />
              Available Now
            </div>
          </div>

          {/* Specs */}
          <div className="detail-section">
            <div className="detail-section-title">Unit Details</div>
            <div className="detail-specs-grid">
              {[
                { label: 'Building',   val: prop.project },
                { label: 'Unit Type',  val: prop.unitType || '—' },
                { label: 'Unit No.',   val: prop.unit     || '—' },
                { label: 'Floor',      val: fp.floor ? `Floor ${fp.floor}` : (prop.floor || '—') },
                { label: 'Size',       val: prop.area ? `${prop.area} sqm` : '—' },
                { label: 'Direction',  val: prop.direction || '—' },
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
              <div className="detail-section-title">About {prop.project}</div>
              {bdata.highlight && (
                <p className="detail-highlight">"{bdata.highlight}"</p>
              )}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {bdata.bts    && <span className="spec">{bdata.bts}</span>}
                {bdata.floors && <span className="spec">{bdata.floors} floors</span>}
                {bdata.year   && <span className="spec">Built {bdata.year}</span>}
              </div>
              {bdata.facilities && bdata.facilities.length > 0 && (
                <>
                  <div className="detail-spec-label" style={{ marginBottom: '10px' }}>Facilities</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {bdata.facilities.map(f => <span key={f} className="facility-tag">{f}</span>)}
                  </div>
                </>
              )}
              <div style={{ marginTop: '20px' }}>
                <Link href={`/buildings/${encodeURIComponent(prop.project)}`} style={{
                  color: 'var(--gold)', fontSize: '12px', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
                }}>
                  See all units in this building →
                </Link>
              </div>
            </div>
          )}

          {/* No-fee promise */}
          <div className="detail-promise">
            <div className="detail-promise-icon">✦</div>
            <div>
              <div className="detail-promise-title">Zero Service Fee for Tenants</div>
              <div className="detail-promise-body">We never charge tenants. Our fee is paid by the landlord — you get full agency service at no cost.</div>
            </div>
          </div>
        </div>

        {/* Right column — Booking form */}
        <div className="detail-right">
          <div className="detail-form-card">
            {submitted ? (
              <div className="vf-success">
                <div className="vf-success-icon">✓</div>
                <div className="vf-success-title">Viewing Requested!</div>
                <p className="vf-success-sub">We'll confirm within 2 hours. See you soon!</p>
                <Link href="/listings" style={{
                  display: 'inline-block', marginTop: '20px', color: 'var(--gold)',
                  fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontWeight: 600, textDecoration: 'none',
                }}>← Browse more listings</Link>
              </div>
            ) : (
              <>
                <div className="detail-form-header">
                  <div className="detail-form-title">Book a Free Viewing</div>
                  <div className="detail-form-sub">Confirmed in 2 hours · No commitment</div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div className="vf-field">
                      <label className="vf-label">Full Name *</label>
                      <input name="name" required className="vf-input" placeholder="Your name" />
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
                    <div className="vf-field">
                      <label className="vf-label">{contactMethod === 'WhatsApp' ? 'WhatsApp Number *' : 'LINE ID *'}</label>
                      <input name="contactId" required className="vf-input"
                        placeholder={contactMethod === 'WhatsApp' ? '+66 81 234 5678' : '@yourlineid'} />
                    </div>
                    <div className="vf-field">
                      <label className="vf-label">Move-in Date</label>
                      <input name="moveInDate" type="date" className="vf-input" />
                    </div>
                    <div className="vf-field">
                      <label className="vf-label">Lease Duration</label>
                      <select name="leaseDuration" className="vf-select">
                        <option>6 months</option>
                        <option>1 year</option>
                        <option>2 years</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="vf-field">
                      <label className="vf-label">Message (optional)</label>
                      <textarea name="notes" className="vf-textarea" placeholder="Any questions or requirements?" />
                    </div>
                    <button type="submit" className="vf-submit-btn" disabled={sending}>
                      {sending ? 'Sending…' : 'Request Viewing →'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Share */}
          <div className="detail-share">
            <span className="detail-share-label">Share this listing</span>
            <button
              className="detail-share-btn"
              onClick={() => navigator.clipboard?.writeText(window.location.href).then(() => alert('Link copied!'))}
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>

      {/* ── Related listings ── */}
      {related.length > 0 && (
        <div className="detail-related">
          <div className="detail-related-inner">
            <p className="page-eyebrow" style={{ marginBottom: '8px' }}>Same building</p>
            <h2 className="detail-related-title">More units at {prop.project}</h2>
            <div className="properties-grid">
              {related.map((r, i) => {
                const rPrice = Number(r.price);
                const rid    = encodeURIComponent(r.project + '|' + r.unit);
                return (
                  <Link key={i} href={`/listings/${rid}`} className="property-card"
                    style={{ textDecoration: 'none', display: 'block', animationDelay: `${i * 0.08}s` }}>
                    <div className="card-img">
                      <div className="card-img-bg" style={{ background: BG[i % BG.length] }} />
                      <div className="card-overlay"><button className="overlay-btn">View Unit →</button></div>
                      <div className="card-badge"><div className="badge-dot" />Available</div>
                    </div>
                    <div className="card-info">
                      <div className="card-building">{r.project}</div>
                      <div className="card-name">{unitLabel(r.unitType, r.unit, r.area)}</div>
                      <div className="card-specs">
                        {r.area      && <span className="spec">{r.area} sqm</span>}
                        {r.direction && <span className="spec">{r.direction}</span>}
                      </div>
                      <div className="card-footer">
                        <div className="card-price">
                          {rPrice ? `฿${rPrice.toLocaleString('th-TH')}` : '—'}
                          <span>/ mo</span>
                        </div>
                        <div className="card-avail">View →</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link href={`/buildings/${encodeURIComponent(prop.project)}`} className="hero-btn-outline">
                See all units in {prop.project} →
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
