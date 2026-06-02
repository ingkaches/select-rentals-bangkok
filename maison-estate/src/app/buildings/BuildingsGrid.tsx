'use client';

import { useState, useEffect } from 'react';
import { SCRIPT_URL, extractFolderId } from '@/lib/buildings';

const BG = [
  'linear-gradient(135deg,#1a2a1a,#0a1a2a)',
  'linear-gradient(135deg,#1a1a2a,#2a1a1a)',
  'linear-gradient(135deg,#2a1a0a,#1a2a1a)',
  'linear-gradient(135deg,#0a2a2a,#1a1a0a)',
  'linear-gradient(135deg,#2a0a1a,#0a2a0a)',
  'linear-gradient(135deg,#1a2a2a,#2a2a1a)',
];

const photoCache: Record<string, string[] | Promise<string[]>> = {};

async function loadFirstPhoto(driveUrl: string): Promise<string> {
  const folderId = extractFolderId(driveUrl);
  if (!folderId || !SCRIPT_URL) return '';
  if (Array.isArray(photoCache[folderId])) {
    return (photoCache[folderId] as string[])[0] ?? '';
  }
  if (photoCache[folderId]) {
    const imgs = await (photoCache[folderId] as Promise<string[]>);
    return imgs[0] ?? '';
  }
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
  const imgs = await promise;
  return imgs[0] ?? '';
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

  useEffect(() => {
    if (!bldg.driveUrl) return;
    loadFirstPhoto(bldg.driveUrl).then(url => { if (url) setBgImg(url); });
  }, [bldg.driveUrl]);

  const slug = encodeURIComponent(bldg.name);

  return (
    <a
      href={`/buildings/${slug}`}
      className="property-card"
      style={{ animationDelay: `${(index % 3) * 0.08}s`, textDecoration: 'none', display: 'block' }}
    >
      <div className="card-img">
        <div
          className="card-img-bg"
          style={bgImg ? { backgroundImage: `url(${bgImg})` } : { background: BG[index % BG.length] }}
        />
        <div className="card-overlay">
          <button className="overlay-btn">View Units →</button>
        </div>
        {/* Available count badge */}
        <div className="card-badge">
          <div className="badge-dot" />
          {bldg.count} unit{bldg.count !== 1 ? 's' : ''} available
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
          {bldg.floors && <span className="spec">{bldg.floors} floors</span>}
          {bldg.year  && <span className="spec">Built {bldg.year}</span>}
        </div>
        <div className="card-footer">
          <div className="card-price" style={{ fontSize: '18px' }}>
            {bldg.count} <span>unit{bldg.count !== 1 ? 's' : ''} available</span>
          </div>
          <div className="card-avail">View →</div>
        </div>
      </div>
    </a>
  );
}

export default function BuildingsGrid({ buildings }: { buildings: Building[] }) {
  const [areaFilter, setAreaFilter] = useState('');
  const areas = [...new Set(buildings.map(b => b.area))].filter(Boolean).sort();

  const filtered = areaFilter ? buildings.filter(b => b.area === areaFilter) : buildings;

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div>
            <div className="page-eyebrow">Bangkok · Sansiri Portfolio</div>
            <h1 className="page-title">Our <em>Buildings</em></h1>
          </div>
          <div className="count-badge">{buildings.length} buildings · {buildings.reduce((s, b) => s + b.count, 0)} units</div>
        </div>
      </div>

      {/* Area filter */}
      <div className="listings-toolbar">
        <div className="filter-bar">
          <div className="filter-group">
            <div className="filter-label">Area</div>
            <div className="filter-pills">
              <button className={`filter-pill${!areaFilter ? ' active' : ''}`} onClick={() => setAreaFilter('')}>All</button>
              {areas.map(a => (
                <button key={a} className={`filter-pill${areaFilter === a ? ' active' : ''}`} onClick={() => setAreaFilter(a)}>{a}</button>
              ))}
            </div>
          </div>
          <div className="filter-actions">
            <span className="filter-count">Showing {filtered.length} building{filtered.length !== 1 ? 's' : ''}</span>
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
