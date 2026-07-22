'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { SCRIPT_URL, extractFolderId, resolveDriveImageUrl } from '@/lib/buildings';

const BG = [
  'linear-gradient(135deg,#1a2a1a,#0a1a2a)',
  'linear-gradient(135deg,#1a1a2a,#2a1a1a)',
  'linear-gradient(135deg,#2a1a0a,#1a2a1a)',
  'linear-gradient(135deg,#0a2a2a,#1a1a0a)',
  'linear-gradient(135deg,#2a0a1a,#0a2a0a)',
  'linear-gradient(135deg,#1a2a2a,#2a2a1a)',
];

const idCache: Record<string, string[] | Promise<string[]>> = {};

async function fetchFileIds(folderId: string): Promise<string[]> {
  if (Array.isArray(idCache[folderId])) return idCache[folderId] as string[];
  if (idCache[folderId]) return idCache[folderId] as Promise<string[]>;
  const promise = (async () => {
    try {
      const res  = await fetch(`${SCRIPT_URL}?action=images&folder=${encodeURIComponent(folderId)}`);
      const data = await res.json();
      if (data.files?.length) {
        const ids = data.files.map((f: { id: string }) => f.id);
        idCache[folderId] = ids;
        return ids;
      }
    } catch { /* ignore */ }
    idCache[folderId] = [];
    return [] as string[];
  })();
  idCache[folderId] = promise;
  return promise;
}

async function loadFirstPhoto(driveUrl: string): Promise<string> {
  const folderId = extractFolderId(driveUrl);
  if (!folderId || !SCRIPT_URL) return '';
  const ids = await fetchFileIds(folderId);
  if (!ids.length) return '';
  return resolveDriveImageUrl(ids[0]);
}

interface Building {
  name: string;
  count: number;
  driveUrl: string;
  district: string;
  bts: string;
  floors: number | null;
  year: number | null;
  area: string;
}

function BuildingCard({ bldg, index }: { bldg: Building; index: number }) {
  const [bgImg, setBgImg] = useState('');
  const locale = useLocale();
  const tCommon = useTranslations('common');

  useEffect(() => {
    if (!bldg.driveUrl) return;
    loadFirstPhoto(bldg.driveUrl).then(url => { if (url) setBgImg(url); });
  }, [bldg.driveUrl]);

  const slug = encodeURIComponent(bldg.name);

  return (
    <a
      href={`/${locale}/buildings/${slug}`}
      className="property-card"
      style={{ animationDelay: `${(index % 3) * 0.08}s`, textDecoration: 'none', display: 'block' }}
    >
      <div className="card-img">
        <div
          className="card-img-bg"
          style={bgImg ? { backgroundImage: `url(${bgImg})` } : { background: BG[index % BG.length] }}
        />
        <div className="card-overlay">
          <button className="overlay-btn">{tCommon('viewUnits')}</button>
        </div>
        {/* Available count badge */}
        <div className="card-badge">
          <div className="badge-dot" />
          {tCommon('unitsAvailable', { count: bldg.count })}
        </div>
        {/* Area tag */}
        {bldg.area && (
          <div className="card-floor">{bldg.area}</div>
        )}
      </div>
      <div className="card-info">
        {bldg.district && <div className="card-building">{bldg.district}</div>}
        <div className="card-name">{bldg.name}</div>
        <div className="card-specs">
          {bldg.bts   && <span className="spec">{bldg.bts}</span>}
          {bldg.floors && <span className="spec">{bldg.floors} {tCommon('floorsSuffix')}</span>}
          {bldg.year  && <span className="spec">{tCommon('builtYear', { year: bldg.year })}</span>}
        </div>
        <div className="card-footer">
          <div className="card-price" style={{ fontSize: '18px' }}>
            {tCommon('unitsAvailable', { count: bldg.count })}
          </div>
          <div className="card-avail">{tCommon('view')}</div>
        </div>
      </div>
    </a>
  );
}

export default function BuildingsGrid({ buildings }: { buildings: Building[] }) {
  const [areaFilter, setAreaFilter] = useState('');
  const t = useTranslations('buildings');
  const areas = [...new Set(buildings.map(b => b.area))].filter(Boolean).sort();

  const filtered = areaFilter ? buildings.filter(b => b.area === areaFilter) : buildings;

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div>
            <div className="page-eyebrow">{t('eyebrow')}</div>
            <h1 className="page-title">{t('titlePre')} <em>{t('titleEm')}</em></h1>
          </div>
          <div className="count-badge">{t('countBadge', { buildings: buildings.length, units: buildings.reduce((s, b) => s + b.count, 0) })}</div>
        </div>
      </div>

      {/* Area filter */}
      <div className="listings-toolbar">
        <div className="filter-bar">
          <div className="filter-group">
            <div className="filter-label">{t('areaLabel')}</div>
            <div className="filter-pills">
              <button className={`filter-pill${!areaFilter ? ' active' : ''}`} onClick={() => setAreaFilter('')}>{t('areaAll')}</button>
              {areas.map(a => (
                <button key={a} className={`filter-pill${areaFilter === a ? ' active' : ''}`} onClick={() => setAreaFilter(a)}>{a}</button>
              ))}
            </div>
          </div>
          <div className="filter-actions">
            <span className="filter-count">{t('showing', { count: filtered.length })}</span>
          </div>
        </div>
      </div>

      <div className="listings-body">
        <div className="properties-grid">
          {filtered.map((b, i) => (
            <BuildingCard key={b.name} bldg={b} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
