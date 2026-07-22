import { Property } from './types';

const SHEET_ID   = '1oeQCvObGuY3SB5_ozDJDJkA0YqPzRHE_uaqrR3mu7JA';
const SHEET_NAME = '📋 Master Listings';
const SKIP_PROJECTS = ['Oka Haus', 'THE LINE SUKHUMVIT 101'];

const PROJECT_NAME_MAP: Record<string, string> = {
  'TL AR':            'THE LINE Asoke-Ratchada',
  'TL JJ':            'THE LINE Jatujak-Mochit',
  'TL VIBE':          'THE LINE Vibe',
  'TL RTW':           'THE LINE Ratchathewi',
  'TL WSW':           'THE LINE Wongsawang',
  'TL PDP':           'THE LINE Phahonyothin Park',
  'TL PHP':           'THE LINE Phahon-Pradipat',
  'TL SKV 71':        'THE LINE Sukhumvit 71',
  'TB Petchaburi TL': 'The Base Phetchaburi-Thonglor',
  'TB GD 9':          'The Base Garden Rama 9',
  'TB Saphanmai':     'The Base Saphanmai',
  'TB SKV50':         'The Base Sukhumvit 50',
  'TBPKS':            'The Base Phetkasem',
  'WYNE SKV':         'WYNE Sukhumvit',
  'Taka':             'Taka Haus',
  'Mori':             'Mori Haus',
  'Kawa':             'Kawa Haus',
  'Hasu':             'Hasu Haus',
  'Oka Haus_':        'Oka Haus',
  'D Shine':          'dcondo Shine',
  'D Calm':           'dcondo Calm',
  'D Hype':           'dcondo Hype',
  'NYE':              'NYE by Sansiri',
  'The Muve Ram22':   'The Muve Rama 22',
  'Park West':        'The Base Park West Sukhumvit 77',
  'Park East':        'The Base Park East Sukhumvit 77',
  'Pynn':             'PYNN Soonvijai',
  'Flo':              'Flo by Sansiri',
  'TL SKV 101':       'THE LINE Sukhumvit 101',
  'Base Urban Rama9': 'The Base Urban Rama 9',
};

function mapProject(raw: string): string {
  const t = raw.trim();
  return PROJECT_NAME_MAP[t] ?? t.replace(/_+$/, '');
}

/** Extracts the raw compass code (N/S/E/W/NE/NW/SE/SW) — display formatting happens at render time via directionLabel(), which is locale-aware. */
function parseDirection(raw: string): string {
  const m = String(raw).trim().match(/^(NE|NW|SE|SW|N|S|E|W)\b/i);
  return m ? m[1].toUpperCase() : '';
}

export async function fetchProperties(): Promise<Property[]> {
  const url =
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}` +
    `/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

  const res  = await fetch(url, { next: { revalidate: 300 } }); // cache 5 min
  const text = await res.text();
  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/);
  if (!match) throw new Error('Unexpected gviz response');

  const { table } = JSON.parse(match[1]);

  function v(cells: any[], i: number): any {
    return cells?.[i]?.v ?? '';
  }
  function vt(cells: any[], i: number): any {
    const cell = cells?.[i];
    if (!cell) return '';
    return cell.v ?? cell.f ?? '';
  }

  return (table.rows as any[])
    .map((r: any) => r.c as any[])
    .filter(c => String(v(c, 13)).trim() === 'Available')
    .filter(c => !SKIP_PROJECTS.includes(String(v(c, 1)).trim()))
    .map(c => ({
      project:   mapProject(String(v(c, 1))),
      unit:      String(v(c, 2)).trim(),
      floor:     String(vt(c, 3)).trim(),
      unitType:  String(v(c, 6)).trim(),
      area:      v(c, 7),
      direction: parseDirection(String(v(c, 8))),
      price:     v(c, 9),
      driveUrl:  String(v(c, 19) ?? '').trim(),
    }));
}
