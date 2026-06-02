'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property } from '@/lib/types';
import { BuildingData, BuildingMeta } from '@/lib/types';
import { SCRIPT_URL, unitLabel, parseFloor, extractFolderId } from '@/lib/buildings';

const BG = ['linear-gradient(135deg,#1a2a1a,#0a1a2a)', 'linear-gradient(135deg,#1a1a2a,#2a1a1a)'];

const photoCache: Record<string, string[] | Promise<string[]>> = {};

async function loadPhotos(driveUrl: string): Promise<string[]> {
  const folderId = extractFolderId(driveUrl);
  if (!folderId || !SCRIPT_URL) return [];
  if (Array.isArray(photoCache[folderId])) return photoCache[folderId] as string[];
  if (photoCache[folderId]) return photoCache[folderId] as Promise<string[]>;
  const promise = (async () => {
    try {
      const res  = await fetch(`${SCRIPT_URL}?action=images&folder=${encodeURIComponent(folderId)}`);
      const data = await res.json();
      if (data.files?.length) {
        const imgs = data.files.map((f: { id: string }) => `https://lh3.googleusercontent.com/d/${f.id}`);
        photoCache[folderId] = imgs;
        return imgs;
      }
    } catch { /* ignore */ }
    photoCache[folderId] = [];
    return [] as string[];
  })();
  photoCache[folderId] = promise;
  return promise;
}

// ── Unit Modal ─────────────────────────────────────────────────────────────────

function UnitModal({ prop, onClose, onSchedule }: {
  prop: Property;
  onClose: () => void;
  onSchedule: () => void;
}) {
  const [images, setImages]     = useState<string[]>([]);
  const [loading, setLoading]   = useState(true);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    setLoading(true); setImages([]); setSlideIdx(0);
    loadPhotos(prop.driveUrl ?? '').then(imgs => { setImages(imgs); setLoading(false); });
  }, [prop]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  function nav(dir: number) { setSlideIdx(i => (i + dir + images.length) % images.length); }

  const fp = parseFloor(prop.floor);
  const floorNum = Number(fp.floor);
  const floorStr = (floorNum > 0 && floorNum <= 150) ? `FL. ${fp.floor}` : fp.floor || '';
  const price = Number(prop.price);

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '860px' }} onClick={e => e.stopPropagation()}>
        <div className="unit-modal-inner">
          {/* Gallery */}
          <div className="unit-gallery-col" style={{ position: 'relative' }}>
            <button className="modal-close" onClick={onClose}>×</button>
            <div className="unit-gallery-main">
              {loading ? (
                <div className="unit-gallery-loading"><div className="gallery-spinner" /></div>
              ) : !images.length ? (
                <div className="unit-gallery-placeholder" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7">
                    <rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 21V9h6v12M3 9l9-6 9 6"/>
                  </svg>
                  <span style={{ fontSize: '12px' }}>Photos coming soon</span>
                </div>
              ) : (
                <>
                  {images.map((url, i) => (
                    <div key={i} className={`unit-gallery-slide${i === slideIdx ? ' active' : ''}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Unit photo ${i + 1}`} />
                    </div>
                  ))}
                  {images.length > 1 && (
                    <>
                      <button className="gallery-nav-btn prev" onClick={() => nav(-1)}>‹</button>
                      <button className="gallery-nav-btn next" onClick={() => nav(1)}>›</button>
                      <div className="gallery-counter">{slideIdx + 1} / {images.length}</div>
                      <div className="gallery-dots">
                        {images.map((_, i) => (
                          <button key={i} className={`gallery-dot${i === slideIdx ? ' active' : ''}`} onClick={() => setSlideIdx(i)} />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          {/* Info */}
          <div className="unit-info-col">
            <div className="unit-info-building">{prop.project}</div>
            <div className="unit-info-type">{unitLabel(prop.unitType, prop.unit, prop.area)}</div>
            <div className="unit-spec-list">
              {floorStr && <div className="unit-spec-row"><span className="unit-spec-label">Floor</span><span className="unit-spec-val">{floorStr}</span></div>}
              {prop.area && <div className="unit-spec-row"><span className="unit-spec-label">Size</span><span className="unit-spec-val">{prop.area} sqm</span></div>}
              {prop.direction && <div className="unit-spec-row"><span className="unit-spec-label">Direction</span><span className="unit-spec-val">{prop.direction}</span></div>}
              {prop.unit && <div className="unit-spec-row"><span className="unit-spec-label">Unit No.</span><span className="unit-spec-val">{prop.unit}</span></div>}
            </div>
            <div className="unit-info-price">
              {price ? `฿${price.toLocaleString('th-TH')}` : 'Price on request'}
              {price ? <span> / month</span> : null}
            </div>
            <button className="unit-cta-btn" onClick={onSchedule}>Schedule a Viewing →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Viewing Modal ──────────────────────────────────────────────────────────────

function ViewingModal({ prop, onClose }: { prop: Property; onClose: () => void }) {
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
              <div className="vf-success-title">Request Received!</div>
              <p className="vf-success-sub">We'll confirm your viewing within 2 hours.</p>
            </div>
          ) : (
            <>
              <div className="viewing-header">
                <div className="viewing-title">Schedule a Viewing</div>
                <div className="viewing-sub">{prop.project} · {unitLabel(prop.unitType, prop.unit, prop.area)}</div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="viewing-body">
                  <div className="vf-grid">
                    <div className="vf-field"><label className="vf-label">Full Name *</label><input name="name" required className="vf-input" placeholder="Your name" /></div>
                    <div className="vf-field"><label className="vf-label">Nationality</label><input name="nationality" className="vf-input" placeholder="e.g. Thai, Japanese" /></div>
                    <div className="vf-field"><label className="vf-label">Phone *</label><input name="phone" required className="vf-input" placeholder="+66 81 234 5678" /></div>
                    <div className="vf-field"><label className="vf-label">No. of Persons</label><select name="persons" className="vf-select"><option>1</option><option>2</option><option>3</option><option>4+</option></select></div>
                    <div className="vf-field"><label className="vf-label">Preferred Contact</label><div className="vf-toggle"><button type="button" className={`vf-toggle-btn${contactMethod === 'WhatsApp' ? ' on' : ''}`} onClick={() => setContactMethod('WhatsApp')}>WhatsApp</button><button type="button" className={`vf-toggle-btn${contactMethod === 'LINE' ? ' on' : ''}`} onClick={() => setContactMethod('LINE')}>LINE</button></div></div>
                    <div className="vf-field"><label className="vf-label">{contactMethod === 'WhatsApp' ? 'WhatsApp Number *' : 'LINE ID *'}</label><input name="contactId" required className="vf-input" placeholder={contactMethod === 'WhatsApp' ? '+66 81 234 5678' : '@yourlineid'} /></div>
                    <div className="vf-field"><label className="vf-label">Lease Duration</label><select name="leaseDuration" className="vf-select"><option>6 months</option><option>1 year</option><option>2 years</option><option>Other</option></select></div>
                    <div className="vf-field"><label className="vf-label">Move-in Date</label><input name="moveInDate" type="date" className="vf-input" /></div>
                    <div className="vf-field"><label className="vf-label">Preferred Viewing Date</label><input name="viewingDate" type="date" className="vf-input" /></div>
                    <div className="vf-field"><label className="vf-label">Preferred Time</label><select name="viewingTime" className="vf-select"><option value="">Anytime</option><option>Morning (9–12)</option><option>Afternoon (13–17)</option><option>Evening (17–19)</option></select></div>
                    <div className="vf-field full"><label className="vf-label">Notes</label><textarea name="notes" className="vf-textarea" placeholder="Any special requirements..." /></div>
                  </div>
                </div>
                <div className="viewing-footer">
                  <button type="submit" className="vf-submit-btn" disabled={sending}>{sending ? 'Sending…' : 'Submit Viewing Request →'}</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

type ModalState = { type: 'unit'; prop: Property } | { type: 'viewing'; prop: Property } | null;

export default function BuildingDetail({ name, rooms, bdata, meta }: {
  name: string;
  rooms: Property[];
  bdata: BuildingData | null;
  meta: BuildingMeta;
}) {
  const [modal, setModal] = useState<ModalState>(null);

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  const sorted = [...rooms].sort((a, b) => (Number(a.floor) || 999) - (Number(b.floor) || 999));

  return (
    <>
      {/* Hero */}
      <div className="bldg-hero">
        <div className="bldg-slide active">
          <div className="bldg-slide-placeholder" style={{ background: BG[0] }} />
        </div>
        <div className="bldg-hero-overlay" />
        <div className="bldg-hero-content">
          <Link href="/buildings" className="back-link">← All Buildings</Link>
          <div className="bldg-name" style={{ marginTop: '16px' }}>{name}</div>
          <div className="bldg-meta">
            {(bdata?.district || meta.area) && (
              <span className="bldg-meta-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {bdata?.district ?? meta.area}
              </span>
            )}
            {(bdata?.bts || meta.bts) && (
              <span className="bldg-meta-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                {bdata?.bts ?? meta.bts}
              </span>
            )}
            <span className="bldg-meta-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              {rooms.length} unit{rooms.length !== 1 ? 's' : ''} available
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      {bdata && (bdata.floors || bdata.units || bdata.year) && (
        <div className="bldg-stats">
          {bdata.floors && <div className="bldg-stat"><div className="bldg-stat-val">{bdata.floors}</div><div className="bldg-stat-label">Floors</div></div>}
          {bdata.units  && <div className="bldg-stat"><div className="bldg-stat-val">{Number(bdata.units).toLocaleString()}</div><div className="bldg-stat-label">Total Units</div></div>}
          {bdata.year   && <div className="bldg-stat"><div className="bldg-stat-val">{bdata.year}</div><div className="bldg-stat-label">Completed</div></div>}
          <div className="bldg-stat"><div className="bldg-stat-val" style={{ color: 'var(--green)' }}>{rooms.length}</div><div className="bldg-stat-label">Available Now</div></div>
        </div>
      )}

      {/* Info */}
      {bdata && (bdata.highlight || bdata.facilities?.length) && (
        <div className="bldg-info">
          {bdata.highlight && <div className="bldg-highlight">"{bdata.highlight}"</div>}
          {bdata.facilities?.length && (
            <div className="bldg-facilities">
              {bdata.facilities.map(f => <span key={f} className="facility-tag">{f}</span>)}
            </div>
          )}
        </div>
      )}

      {/* Units */}
      <div className="bldg-units">
        <div className="bldg-units-title">Available Units</div>
        <div className="unit-list">
          {sorted.map((r, i) => {
            const fp = parseFloor(r.floor);
            const floorNum = Number(fp.floor);
            const floorStr = (floorNum > 0 && floorNum <= 150) ? `FL. ${fp.floor}` : fp.floor || '—';
            const price = Number(r.price);
            return (
              <div key={i} className="unit-row" onClick={() => setModal({ type: 'unit', prop: r })}>
                <div className="unit-type-badge">{unitLabel(r.unitType, r.unit, r.area)}</div>
                <div className="unit-row-specs">
                  {floorStr && floorStr !== '—' && <span className="unit-row-spec"><strong>{floorStr}</strong></span>}
                  {r.area && <span className="unit-row-spec"><strong>{r.area}</strong> sqm</span>}
                  {r.direction && <span className="unit-row-spec">{r.direction}</span>}
                  {r.unit && <span className="unit-row-spec">Unit <strong>{r.unit}</strong></span>}
                </div>
                <div className="unit-row-price">
                  {price ? `฿${price.toLocaleString('th-TH')}` : 'POA'}
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans)' }}> /mo</span>
                </div>
                <div className="unit-row-arrow">›</div>
              </div>
            );
          })}
        </div>
      </div>

      {modal?.type === 'unit' && (
        <UnitModal
          prop={modal.prop}
          onClose={() => setModal(null)}
          onSchedule={() => setModal({ type: 'viewing', prop: modal.prop })}
        />
      )}
      {modal?.type === 'viewing' && (
        <ViewingModal prop={modal.prop} onClose={() => setModal(null)} />
      )}
    </>
  );
}
