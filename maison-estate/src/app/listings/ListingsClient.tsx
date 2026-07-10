'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Property } from '@/lib/types';
import {
  BUILDING_DATA, SCRIPT_URL,
  getAreaGroup, unitLabel, cardRoomType, parseFloor, extractFolderId,
} from '@/lib/buildings';

// ── helpers ──────────────────────────────────────────────────────────────────

const BG = [
  'linear-gradient(135deg,#1a2a1a,#0a1a2a)',
  'linear-gradient(135deg,#1a1a2a,#2a1a1a)',
  'linear-gradient(135deg,#2a1a0a,#1a2a1a)',
  'linear-gradient(135deg,#0a2a2a,#1a1a0a)',
  'linear-gradient(135deg,#2a0a1a,#0a2a0a)',
  'linear-gradient(135deg,#1a2a2a,#2a2a1a)',
];

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
    } catch {/* ignore */}
    photoCache[folderId] = [];
    return [] as string[];
  })();

  photoCache[folderId] = promise;
  return promise;
}

// ── types ─────────────────────────────────────────────────────────────────────

type PriceFilter  = 'any' | 'under20k' | '20k-50k' | 'over50k';
type RoomFilter   = 'all' | 'studio' | '1-bed' | '2-bed' | '3-bed';
type ModalState   = { type: 'unit'; prop: Property; images: string[]; loading: boolean }
                  | { type: 'viewing'; prop: Property }
                  | null;

// ── PropertyCard ─────────────────────────────────────────────────────────────

function PropertyCard({ prop, index, onClick }: {
  prop: Property;
  index: number;
  onClick: () => void;
}) {
  const [bgImg, setBgImg] = useState('');
  const bgDefault = BG[index % BG.length];

  useEffect(() => {
    if (!prop.driveUrl) return;
    loadPhotos(prop.driveUrl).then(imgs => {
      if (imgs[0]) setBgImg(imgs[0]);
    });
  }, [prop.driveUrl]);

  const fp = parseFloor(prop.floor);
  const floorNum = Number(fp.floor);
  const showFloor = floorNum > 0 && floorNum <= 150;
  const price = Number(prop.price);
  const detailUrl = `/listings/${encodeURIComponent(prop.project + '|' + prop.unit)}`;

  return (
    <a
      href={detailUrl}
      className="property-card"
      style={{ animationDelay: `${(index % 3) * 0.08}s`, textDecoration: 'none', display: 'block' }}
    >
      <div className="card-img">
        <div
          className="card-img-bg"
          style={bgImg
            ? { backgroundImage: `url(${bgImg})` }
            : { background: bgDefault }
          }
        />
        <div className="card-overlay">
          <button className="overlay-btn">View Details →</button>
        </div>
        <div className="card-badge">
          <div className="badge-dot" />
          Available
        </div>
        {showFloor && (
          <div className="card-floor">FL. {fp.floor}</div>
        )}
      </div>
      <div className="card-info">
        <div className="card-building">{prop.project}</div>
        <div className="card-name">{unitLabel(prop.unitType, prop.unit, prop.area)}</div>
        <div className="card-specs">
          {prop.area      && <span className="spec">{prop.area} sqm</span>}
          {prop.unitType  && prop.unitType !== 'n/a' && <span className="spec">{prop.unitType}</span>}
          {prop.direction && <span className="spec">{prop.direction}</span>}
        </div>
        <div className="card-footer">
          <div className="card-price">
            {price ? `฿${price.toLocaleString('th-TH')}` : '—'} <span>/ mo</span>
          </div>
          <div className="card-avail">View →</div>
        </div>
      </div>
    </a>
  );
}

// ── BuildingView ──────────────────────────────────────────────────────────────

function BuildingView({ name, rooms, onBack, onOpenUnit }: {
  name: string;
  rooms: Property[];
  onBack: () => void;
  onOpenUnit: (prop: Property) => void;
}) {
  const bdata = BUILDING_DATA[name] ?? null;
  const [slideIdx, setSlideIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const images = bdata?.facilities ? null : null; // no building images (use placeholder)

  useEffect(() => {
    setSlideIdx(0);
    if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [name]);

  const sortedRooms = [...rooms].sort((a, b) => (Number(a.floor) || 999) - (Number(b.floor) || 999));

  return (
    <div>
      {/* Hero */}
      <div className="bldg-hero">
        <div className="bldg-slide active">
          <div className="bldg-slide-placeholder" style={{ background: BG[0] }} />
        </div>
        <div className="bldg-hero-overlay" />
        <div className="bldg-hero-content">
          <button className="back-link" onClick={onBack}>
            ← All Listings
          </button>
          <div className="bldg-name" style={{ marginTop: '16px' }}>{name}</div>
          <div className="bldg-meta">
            {bdata?.district && (
              <span className="bldg-meta-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {bdata.district}
              </span>
            )}
            {bdata?.bts && (
              <span className="bldg-meta-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                {bdata.bts}
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
          {bdata.floors && (
            <div className="bldg-stat">
              <div className="bldg-stat-val">{bdata.floors}</div>
              <div className="bldg-stat-label">Floors</div>
            </div>
          )}
          {bdata.units && (
            <div className="bldg-stat">
              <div className="bldg-stat-val">{Number(bdata.units).toLocaleString()}</div>
              <div className="bldg-stat-label">Total Units</div>
            </div>
          )}
          {bdata.year && (
            <div className="bldg-stat">
              <div className="bldg-stat-val">{bdata.year}</div>
              <div className="bldg-stat-label">Completed</div>
            </div>
          )}
          <div className="bldg-stat">
            <div className="bldg-stat-val" style={{ color: 'var(--green)' }}>{rooms.length}</div>
            <div className="bldg-stat-label">Available Now</div>
          </div>
        </div>
      )}

      {/* Info */}
      {bdata && (bdata.highlight || bdata.facilities?.length) && (
        <div className="bldg-info">
          {bdata.highlight && <div className="bldg-highlight">"{bdata.highlight}"</div>}
          {bdata.facilities?.length && (
            <div className="bldg-facilities">
              {bdata.facilities.map(f => (
                <span key={f} className="facility-tag">{f}</span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Units */}
      <div className="bldg-units">
        <div className="bldg-units-title">Available Units</div>
        <div className="unit-list">
          {sortedRooms.map((r, i) => {
            const fp = parseFloor(r.floor);
            const floorNum = Number(fp.floor);
            const floorStr = (floorNum > 0 && floorNum <= 150) ? `FL. ${fp.floor}` : fp.floor || '—';
            const price = Number(r.price);

            return (
              <div key={i} className="unit-row" onClick={() => onOpenUnit(r)}>
                <div className="unit-type-badge">{unitLabel(r.unitType, r.unit, r.area)}</div>
                <div className="unit-row-specs">
                  {floorStr && floorStr !== '—' && (
                    <span className="unit-row-spec"><strong>{floorStr}</strong></span>
                  )}
                  {r.area && (
                    <span className="unit-row-spec"><strong>{r.area}</strong> sqm</span>
                  )}
                  {r.direction && (
                    <span className="unit-row-spec">{r.direction}</span>
                  )}
                  {r.unit && (
                    <span className="unit-row-spec">Unit <strong>{r.unit}</strong></span>
                  )}
                </div>
                <div className="unit-row-price">
                  {price ? `฿${price.toLocaleString('th-TH')}` : 'POA'} <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans)' }}>/mo</span>
                </div>
                <div className="unit-row-arrow">›</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── UnitModal ─────────────────────────────────────────────────────────────────

function UnitModal({ prop, images, loading, onClose, onSchedule }: {
  prop: Property;
  images: string[];
  loading: boolean;
  onClose: () => void;
  onSchedule: () => void;
}) {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => { setSlideIdx(0); }, [images]);

  function nav(dir: number) {
    setSlideIdx(i => (i + dir + images.length) % images.length);
  }

  const fp = parseFloor(prop.floor);
  const floorNum = Number(fp.floor);
  const floorStr = (floorNum > 0 && floorNum <= 150) ? `FL. ${fp.floor}` : fp.floor || '';
  const price = Number(prop.price);

  return (
    <div className="unit-modal-inner">
      {/* Gallery */}
      <div className="unit-gallery-col" style={{ position: 'relative' }}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="unit-gallery-main">
          {loading ? (
            <div className="unit-gallery-loading">
              <div className="gallery-spinner" />
            </div>
          ) : !images.length ? (
            <div className="unit-gallery-placeholder">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7">
                <rect x="3" y="3" width="18" height="18" rx="1"/>
                <path d="M9 21V9h6v12M3 9l9-6 9 6"/>
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
  );
}

// ── ViewingModal ──────────────────────────────────────────────────────────────

function ViewingModal({ prop, onClose }: { prop: Property; onClose: () => void }) {
  const [contactMethod, setContactMethod] = useState<'WhatsApp' | 'LINE'>('WhatsApp');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

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
      area:          String(prop.area ?? ''),
      price:         String(prop.price ?? ''),
      name:          fd.get('name'),
      nationality:   fd.get('nationality'),
      persons:       fd.get('persons'),
      leaseDuration: fd.get('leaseDuration'),
      moveInDate:    fd.get('moveInDate'),
      phone:         fd.get('phone'),
      contactMethod: contactMethod,
      contactId:     fd.get('contactId'),
      viewingDate:   fd.get('viewingDate') ?? '',
      viewingTime:   fd.get('viewingTime') ?? '',
      notes:         fd.get('notes') ?? '',
      status:        'New Lead',
    };

    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    }).catch(() => {});

    setTimeout(() => { setSending(false); setSubmitted(true); }, 600);
  }

  return (
    <div className="modal-box viewing-modal-box" style={{ position: 'relative' }}>
      <button className="modal-close" onClick={onClose} style={{ position: 'absolute' }}>×</button>

      {submitted ? (
        <div className="vf-success">
          <div className="vf-success-icon">✓</div>
          <div className="vf-success-title">Request Received!</div>
          <p className="vf-success-sub">We'll confirm your viewing within 2 hours. Thank you!</p>
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
                  <label className="vf-label">No. of Persons</label>
                  <select name="persons" className="vf-select">
                    <option>1</option><option>2</option><option>3</option><option>4+</option>
                  </select>
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
                  <input name="contactId" required className="vf-input" placeholder={contactMethod === 'WhatsApp' ? '+66 81 234 5678' : '@yourlineid'} />
                </div>
                <div className="vf-field">
                  <label className="vf-label">Lease Duration</label>
                  <select name="leaseDuration" className="vf-select">
                    <option>6 months</option><option>1 year</option><option>2 years</option><option>Other</option>
                  </select>
                </div>
                <div className="vf-field">
                  <label className="vf-label">Move-in Date</label>
                  <input name="moveInDate" type="date" className="vf-input" />
                </div>
                <div className="vf-field">
                  <label className="vf-label">Preferred Viewing Date</label>
                  <input name="viewingDate" type="date" className="vf-input" />
                </div>
                <div className="vf-field">
                  <label className="vf-label">Preferred Time</label>
                  <select name="viewingTime" className="vf-select">
                    <option value="">Anytime</option>
                    <option>Morning (9–12)</option><option>Afternoon (13–17)</option><option>Evening (17–19)</option>
                  </select>
                </div>
                <div className="vf-field full">
                  <label className="vf-label">Notes</label>
                  <textarea name="notes" className="vf-textarea" placeholder="Any special requirements..." />
                </div>
              </div>
            </div>
            <div className="viewing-footer">
              <button type="submit" className="vf-submit-btn" disabled={sending}>
                {sending ? 'Sending…' : 'Submit Viewing Request →'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

// ── Main ListingsClient ───────────────────────────────────────────────────────

export default function ListingsClient({ properties }: { properties: Property[] }) {
  const [priceFilter, setPriceFilter]   = useState<PriceFilter>('any');
  const [roomFilter, setRoomFilter]     = useState<RoomFilter>('all');
  const [activeProject, setActiveProject] = useState('');
  const [activeArea, setActiveArea]     = useState('');
  const [projectOpen, setProjectOpen]   = useState(false);
  const [areaOpen, setAreaOpen]         = useState(false);
  const [activeBldg, setActiveBldg]     = useState<string | null>(null);
  const [modal, setModal]               = useState<ModalState>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const areaRef    = useRef<HTMLDivElement>(null);

  // close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (projectRef.current && !projectRef.current.contains(e.target as Node)) setProjectOpen(false);
      if (areaRef.current    && !areaRef.current.contains(e.target as Node))    setAreaOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // esc closes modal
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setModal(null);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  // filter
  function priceOk(p: Property): boolean {
    const price = Number(p.price);
    if (priceFilter === 'under20k') return price > 0 && price < 20000;
    if (priceFilter === '20k-50k')  return price >= 20000 && price <= 50000;
    if (priceFilter === 'over50k')  return price > 50000;
    return true;
  }

  const filtered = properties.filter(p =>
    priceOk(p)
    && (roomFilter === 'all' || cardRoomType(p) === roomFilter)
    && (!activeProject || p.project === activeProject)
    && (!activeArea || getAreaGroup(p.project) === activeArea)
  );

  const isFiltered = priceFilter !== 'any' || roomFilter !== 'all' || !!activeProject || !!activeArea;

  function clearFilters() {
    setPriceFilter('any'); setRoomFilter('all'); setActiveProject(''); setActiveArea('');
  }

  // projects/areas for dropdowns (from all props, not filtered)
  const projects = [...new Set(properties.map(p => p.project))].sort();
  const areas    = [...new Set(properties.map(p => getAreaGroup(p.project)))].sort();

  // building view
  const bldgRooms = activeBldg ? properties.filter(p => p.project === activeBldg) : [];

  async function openUnit(prop: Property) {
    setModal({ type: 'unit', prop, images: [], loading: true });
    const images = prop.driveUrl ? await loadPhotos(prop.driveUrl) : [];
    setModal(prev => prev?.type === 'unit' && prev.prop === prop ? { type: 'unit', prop, images, loading: false } : prev);
  }

  // ── render ──────────────────────────────────────────────────────────────────

  if (activeBldg) {
    return (
      <>
        <div style={{ paddingTop: '73px' }}>
          <BuildingView
            name={activeBldg}
            rooms={bldgRooms}
            onBack={() => setActiveBldg(null)}
            onOpenUnit={openUnit}
          />
        </div>

        {/* Unit modal */}
        <div className={`modal-overlay${modal?.type === 'unit' ? ' active' : ''}`} onClick={() => setModal(null)}>
          <div className="modal-box" style={{ maxWidth: '860px' }} onClick={e => e.stopPropagation()}>
            {modal?.type === 'unit' && (
              <UnitModal
                prop={modal.prop}
                images={modal.images}
                loading={modal.loading}
                onClose={() => setModal(null)}
                onSchedule={() => setModal({ type: 'viewing', prop: modal.prop })}
              />
            )}
          </div>
        </div>

        {/* Viewing modal */}
        <div className={`modal-overlay${modal?.type === 'viewing' ? ' active' : ''}`} onClick={() => setModal(null)}>
          <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
            {modal?.type === 'viewing' && (
              <ViewingModal prop={modal.prop} onClose={() => setModal(null)} />
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-inner">
          <div>
            <div className="page-eyebrow">Bangkok · Verified Sansiri Properties</div>
            <h1 className="page-title">All <em>Available</em> Listings</h1>
          </div>
          <div>
            <div className="count-badge">{filtered.length} Available</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="listings-toolbar">
        <div className="filter-bar">
          {/* Price */}
          <div className="filter-group">
            <div className="filter-label">Price</div>
            <div className="filter-pills">
              {(['any','under20k','20k-50k','over50k'] as PriceFilter[]).map(v => (
                <button
                  key={v}
                  className={`filter-pill${priceFilter === v ? ' active' : ''}`}
                  onClick={() => setPriceFilter(v)}
                >
                  {v === 'any' ? 'Any' : v === 'under20k' ? '< ฿20k' : v === '20k-50k' ? '฿20k–50k' : '> ฿50k'}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms */}
          <div className="filter-group">
            <div className="filter-label">Type</div>
            <div className="filter-pills">
              {(['all','studio','1-bed','2-bed','3-bed'] as RoomFilter[]).map(v => (
                <button
                  key={v}
                  className={`filter-pill${roomFilter === v ? ' active' : ''}`}
                  onClick={() => setRoomFilter(v)}
                >
                  {v === 'all' ? 'All' : v === 'studio' ? 'Studio' : v === '1-bed' ? '1 Bed' : v === '2-bed' ? '2 Beds' : '3+ Beds'}
                </button>
              ))}
            </div>
          </div>

          {/* Project dropdown */}
          <div className="filter-group" ref={projectRef}>
            <div className="filter-label">Project</div>
            <div className="csel-wrap">
              <button
                className={`csel-trigger${projectOpen ? ' open' : ''}`}
                onClick={() => setProjectOpen(o => !o)}
              >
                <span className={`csel-label${activeProject ? ' active' : ''}`}>
                  {activeProject || 'All Projects'}
                </span>
                <span className="csel-chevron">▾</span>
              </button>
              <div className={`csel-panel${projectOpen ? ' open' : ''}`}>
                <div className="csel-panel-inner">
                  <button className={`csel-opt${!activeProject ? ' active' : ''}`} onClick={() => { setActiveProject(''); setProjectOpen(false); }}>
                    All Projects
                  </button>
                  {projects.map(p => (
                    <button key={p} className={`csel-opt${activeProject === p ? ' active' : ''}`} onClick={() => { setActiveProject(p); setProjectOpen(false); }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Area dropdown */}
          <div className="filter-group" ref={areaRef}>
            <div className="filter-label">Area</div>
            <div className="csel-wrap">
              <button
                className={`csel-trigger${areaOpen ? ' open' : ''}`}
                onClick={() => setAreaOpen(o => !o)}
              >
                <span className={`csel-label${activeArea ? ' active' : ''}`}>
                  {activeArea || 'All Areas'}
                </span>
                <span className="csel-chevron">▾</span>
              </button>
              <div className={`csel-panel${areaOpen ? ' open' : ''}`}>
                <div className="csel-panel-inner">
                  <button className={`csel-opt${!activeArea ? ' active' : ''}`} onClick={() => { setActiveArea(''); setAreaOpen(false); }}>
                    All Areas
                  </button>
                  {areas.map(a => (
                    <button key={a} className={`csel-opt${activeArea === a ? ' active' : ''}`} onClick={() => { setActiveArea(a); setAreaOpen(false); }}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="filter-actions">
            <span className="filter-count">Showing {filtered.length} listing{filtered.length !== 1 ? 's' : ''}</span>
            <button className={`filter-clear${isFiltered ? ' visible' : ''}`} onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="listings-body">
        <div className="properties-grid">
          {filtered.length === 0 ? (
            <div className="listings-empty">No properties match your filters.</div>
          ) : (
            filtered.map((prop, i) => (
              <PropertyCard
                key={`${prop.project}-${prop.unit}-${i}`}
                prop={prop}
                index={i}
                onClick={() => setActiveBldg(prop.project)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
