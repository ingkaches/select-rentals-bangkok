'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { BuildingData, BuildingMeta, BuildingProjectDetails } from '@/lib/types';
import { driveImageUrl, driveImgOnError } from '@/lib/buildings';

function PdImage({ imageId, alt, className }: { imageId?: string; alt: string; className: string }) {
  if (!imageId) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={driveImageUrl(imageId)} alt={alt} className={className} onError={driveImgOnError} />
  );
}

export default function ProjectDetail({ name, details, bdata, meta }: {
  name: string;
  details: BuildingProjectDetails;
  bdata: BuildingData | null;
  meta: BuildingMeta;
}) {
  const locale = useLocale();
  const t = useTranslations('projectDetail');
  const slug = encodeURIComponent(name);

  return (
    <>
      {/* Header */}
      <div className="pd-header">
        <div className="pd-header-inner">
          <Link href={`/${locale}/buildings/${slug}`} className="back-link">{t('backTo', { name })}</Link>
          <h1 className="pd-title">{name}</h1>
          <div className="bldg-meta" style={{ marginTop: '4px' }}>
            {(bdata?.district || meta.area) && (
              <span className="bldg-meta-item" style={{ color: 'var(--text-muted)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {bdata?.district ?? meta.area}
              </span>
            )}
            {(bdata?.bts || meta.bts) && (
              <span className="bldg-meta-item" style={{ color: 'var(--text-muted)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                {bdata?.bts ?? meta.bts}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {details.summary?.length && (
        <section className="pd-section">
          <ul className="pd-summary-list">
            {details.summary.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </section>
      )}

      {/* Location */}
      {details.location && (
        <section className="pd-section pd-section-alt">
          <h2 className="pd-h2">{t('location')}</h2>
          <PdImage imageId={details.location.imageId} alt={t('location')} className="pd-banner-img" />
          <p className="pd-p">{details.location.description}</p>
          {details.location.nearby?.length && (
            <div className="pd-nearby-grid">
              {details.location.nearby.map((n, i) => (
                <div key={i} className="pd-nearby-row">
                  <span>{n.name}</span>
                  <span className="pd-nearby-dist">{n.distance}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Design */}
      {details.design && (
        <section className="pd-section">
          <h2 className="pd-h2">{t('design')}</h2>
          <PdImage imageId={details.design.imageId} alt={t('design')} className="pd-banner-img" />
          <p className="pd-p">{details.design.description}</p>
          {details.design.floorBreakdown?.length && (
            <div className="pd-floor-list">
              {details.design.floorBreakdown.map((f, i) => (
                <div key={i} className="pd-floor-row">
                  <span className="pd-floor-label">{f.label}</span>
                  <span className="pd-floor-desc">{f.description}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Unit types */}
      {details.unitTypes?.length && (
        <section className="pd-section pd-section-alt">
          <h2 className="pd-h2">{t('unitTypes')}</h2>
          <div className="pd-unittype-grid">
            {details.unitTypes.map((u, i) => (
              <div key={i} className="pd-unittype-card">
                <PdImage imageId={u.imageId} alt={u.label} className="pd-unittype-img" />
                <div className="pd-unittype-label">{u.label}</div>
                <div className="pd-unittype-size">{u.sizeRange}</div>
              </div>
            ))}
          </div>
          {details.unitHighlights?.length && (
            <ol className="pd-highlight-list">
              {details.unitHighlights.map((h, i) => <li key={i}>{h}</li>)}
            </ol>
          )}
        </section>
      )}

      {/* Facilities */}
      {details.facilities?.length && (
        <section className="pd-section">
          <h2 className="pd-h2">{t('facilities')}</h2>
          <div className="pd-item-grid">
            {details.facilities.map((f, i) => (
              <div key={i} className="pd-item-card">
                <PdImage imageId={f.imageId} alt={f.name} className="pd-item-img" />
                <div className="pd-item-name">{f.name}</div>
                <div className="pd-item-desc">{f.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Innovations */}
      {details.innovations?.length && (
        <section className="pd-section pd-section-alt">
          <h2 className="pd-h2">{t('innovations')}</h2>
          <div className="pd-item-grid">
            {details.innovations.map((f, i) => (
              <div key={i} className="pd-item-card">
                <PdImage imageId={f.imageId} alt={f.name} className="pd-item-img" />
                <div className="pd-item-name">{f.name}</div>
                <div className="pd-item-desc">{f.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="pd-cta">
        <Link href={`/${locale}/buildings/${slug}`} className="pd-cta-btn">
          {t('viewAvailableUnits')}
        </Link>
      </div>
    </>
  );
}
