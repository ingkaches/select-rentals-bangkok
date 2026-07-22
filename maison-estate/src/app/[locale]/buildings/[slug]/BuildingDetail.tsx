'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Property, BuildingData, BuildingMeta, Locale } from '@/lib/types';
import { SCRIPT_URL, unitLabel, directionLabel, parseFloor, extractFolderId, driveImageUrl, driveImgOnError } from '@/lib/buildings';
import ViewingModal from '@/components/ViewingModal';

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
        const imgs = data.files.map((f: { id: string }) => driveImageUrl(f.id));
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

// ── Unit Thumb ─────────────────────────────────────────────────────────────────

function UnitThumb({ driveUrl }: { driveUrl?: string }) {
  const [img, setImg] = useState('');

  useEffect(() => {
    if (!driveUrl) return;
    loadPhotos(driveUrl).then(imgs => { if (imgs[0]) setImg(imgs[0]); });
  }, [driveUrl]);

  return (
    <div className="unit-thumb">
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt="" onError={driveImgOnError} />
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
          <rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 21V9h6v12M3 9l9-6 9 6"/>
        </svg>
      )}
    </div>
  );
}

// ── Unit Modal ─────────────────────────────────────────────────────────────────

function UnitModal({ prop, onClose, onSchedule }: {
  prop: Property;
  onClose: () => void;
  onSchedule: () => void;
}) {
  const locale = useLocale();
  const t = useTranslations('common');
  const tDetail = useTranslations('listingDetail');
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
                  <span style={{ fontSize: '12px' }}>{t('photosComingSoon')}</span>
                </div>
              ) : (
                <>
                  {images.map((url, i) => (
                    <div key={i} className={`unit-gallery-slide${i === slideIdx ? ' active' : ''}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`${prop.project} ${i + 1}`} onError={driveImgOnError} />
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
            <div className="unit-info-type">{unitLabel(prop.unitType, prop.unit, prop.area, locale as Locale)}</div>
            <div className="unit-spec-list">
              {floorStr && <div className="unit-spec-row"><span className="unit-spec-label">{tDetail('floor')}</span><span className="unit-spec-val">{floorStr}</span></div>}
              {prop.area && <div className="unit-spec-row"><span className="unit-spec-label">{tDetail('size')}</span><span className="unit-spec-val">{prop.area} {t('sqm')}</span></div>}
              {prop.direction && <div className="unit-spec-row"><span className="unit-spec-label">{tDetail('direction')}</span><span className="unit-spec-val">{directionLabel(prop.direction, locale as Locale)}</span></div>}
              {prop.unit && <div className="unit-spec-row"><span className="unit-spec-label">{tDetail('unitNo')}</span><span className="unit-spec-val">{prop.unit}</span></div>}
            </div>
            <div className="unit-info-price">
              {price ? `฿${price.toLocaleString('th-TH')}` : t('priceOnRequest')}
              {price ? <span>{t('perMonthLong')}</span> : null}
            </div>
            <button className="unit-cta-btn" onClick={onSchedule}>{t('scheduleViewing')}</button>
          </div>
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
  const locale = useLocale();
  const t = useTranslations('buildingDetail');
  const tCommon = useTranslations('common');
  const [modal, setModal] = useState<ModalState>(null);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [heroIdx, setHeroIdx]       = useState(0);

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  useEffect(() => {
    setHeroImages([]); setHeroIdx(0);
    if (bdata?.photosUrl) loadPhotos(bdata.photosUrl).then(setHeroImages);
  }, [bdata?.photosUrl]);

  function navHero(dir: number) {
    setHeroIdx(i => (i + dir + heroImages.length) % heroImages.length);
  }

  const sorted = [...rooms].sort((a, b) => (Number(a.floor) || 999) - (Number(b.floor) || 999));

  return (
    <>
      {/* Hero */}
      <div className="bldg-hero">
        {heroImages.length ? (
          heroImages.map((url, i) => (
            <div key={url} className={`bldg-slide${i === heroIdx ? ' active' : ''}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`${name} photo ${i + 1}`} onError={driveImgOnError} />
            </div>
          ))
        ) : (
          <div className="bldg-slide active">
            <div className="bldg-slide-placeholder" style={{ background: BG[0] }} />
          </div>
        )}
        {heroImages.length > 1 && (
          <>
            <button className="gallery-nav-btn prev" onClick={() => navHero(-1)}>‹</button>
            <button className="gallery-nav-btn next" onClick={() => navHero(1)}>›</button>
            <div className="gallery-dots">
              {heroImages.map((_, i) => (
                <button key={i} className={`gallery-dot${i === heroIdx ? ' active' : ''}`} onClick={() => setHeroIdx(i)} />
              ))}
            </div>
          </>
        )}
        <div className="bldg-hero-overlay" />
        <div className="bldg-hero-content">
          <Link href={`/${locale}/buildings`} className="back-link">{t('allBuildings')}</Link>
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
              {tCommon('unitsAvailable', { count: rooms.length })}
            </span>
          </div>
          <Link href={`/${locale}/buildings/${encodeURIComponent(name)}/project`} className="bldg-details-btn">
            {t('viewProjectDetails')}
          </Link>
        </div>
      </div>

      {/* Stats */}
      {bdata && (bdata.floors || bdata.units || bdata.year) && (
        <div className="bldg-stats">
          {bdata.floors && <div className="bldg-stat"><div className="bldg-stat-val">{bdata.floors}</div><div className="bldg-stat-label">{tCommon('floors')}</div></div>}
          {bdata.units  && <div className="bldg-stat"><div className="bldg-stat-val">{Number(bdata.units).toLocaleString()}</div><div className="bldg-stat-label">{tCommon('totalUnits')}</div></div>}
          {bdata.year   && <div className="bldg-stat"><div className="bldg-stat-val">{bdata.year}</div><div className="bldg-stat-label">{tCommon('completed')}</div></div>}
          <div className="bldg-stat"><div className="bldg-stat-val" style={{ color: 'var(--green)' }}>{rooms.length}</div><div className="bldg-stat-label">{tCommon('availableNow')}</div></div>
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
        <div className="bldg-units-title">{t('availableUnitsTitle')}</div>
        <div className="unit-list">
          {sorted.map((r, i) => {
            const fp = parseFloor(r.floor);
            const floorNum = Number(fp.floor);
            const floorStr = (floorNum > 0 && floorNum <= 150) ? `FL. ${fp.floor}` : fp.floor || '—';
            const price = Number(r.price);
            return (
              <div key={i} className="unit-row" onClick={() => setModal({ type: 'unit', prop: r })}>
                <UnitThumb driveUrl={r.driveUrl} />
                <div className="unit-type-badge">{unitLabel(r.unitType, r.unit, r.area, locale as Locale)}</div>
                <div className="unit-row-specs">
                  {floorStr && floorStr !== '—' && <span className="unit-row-spec"><strong>{floorStr}</strong></span>}
                  {r.area && <span className="unit-row-spec"><strong>{r.area}</strong> {tCommon('sqm')}</span>}
                  {r.direction && <span className="unit-row-spec">{directionLabel(r.direction, locale as Locale)}</span>}
                  {r.unit && <span className="unit-row-spec">{tCommon('unitPrefix')} <strong>{r.unit}</strong></span>}
                </div>
                <div className="unit-row-price">
                  {price ? `฿${price.toLocaleString('th-TH')}` : tCommon('poa')}
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans)' }}> {tCommon('perMonth')}</span>
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
