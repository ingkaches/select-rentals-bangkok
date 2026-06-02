import { BuildingData, BuildingMeta } from './types';

export const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxyO_gn0RdR7_Pz5AEPMQqkIrM7CEg70rFgy-DtzVaZQ1ssZDZXpcbFxPM_tieHJt9l/exec';

export const BUILDING_DATA: Record<string, BuildingData> = {
  'XT Phayathai':            { district: 'Ratchathewi',           bts: 'BTS Phaya Thai 600m',          floors: 41, units: 1435, year: 2022, facilities: ['Pool','Gym','Co-working','EV Charging','Family Mart'],           highlight: 'Two-tower flagship with Airport Rail Link access, 5 min to Siam' },
  'XT Huaikhwang':           { district: 'Huai Khwang',           bts: 'MRT Huai Khwang 75m',          floors: 43, units: 1404, year: 2021, facilities: ['Pool','Gym','Co-working','Sky Bar','Parking'],                   highlight: 'Ultra-close MRT access, 24-hr lifestyle facilities' },
  'XT Ekkamai':              { district: 'Ekkamai / Watthana',    bts: 'BTS Ekkamai',                  floors: 38, units: 537,  year: 2020, facilities: ['Pool','Gym','Sky Lounge','Co-working'],                          highlight: "Creative lifestyle condo in Bangkok's most vibrant district" },
  'Flo by Sansiri':          { district: 'Khlong San',            bts: 'BTS Khlong San 350m',          floors: 22, units: 508,  year: 2025, facilities: ['Infinity Pool','Gym','Sky Lounge','Garden','Parking'],           highlight: 'Riverside living near ICONSIAM, river views, Gold Line access' },
  'KHUN BY YOO':             { district: 'Thonglor / Watthana',   bts: 'BTS Thong Lo',                 floors: 27, units: 148,  year: 2020, facilities: ['Luxury Pool','Gym','Private Cinema','Concierge','Auto Parking'], highlight: 'Ultra-luxury branded by Philippe Starck x YOO Studio' },
  'PYNN Soonvijai':          { district: 'Rama 9 / Huai Khwang',  bts: 'MRT Phetchaburi, ARL',        floors: 7,  units: 18,   year: 2024, facilities: ['Rooftop Garden','EV Charging','Parking','CCTV'],                highlight: 'Ultra-boutique luxury, only 18 units, 5 min from Thonglor' },
  'Oka Haus':                { district: 'Rama 4 / Khlong Tan',   bts: 'BTS Thong Lo 1.3km',           floors: 47, units: 1178, year: 2019, facilities: ['40m Pool','Gym','Jacuzzi','Garden','Hydrotherapy','Parking'],    highlight: 'Resort-style living on Rama 4, Japanese-inspired tower' },
  'THE LINE Sukhumvit 101':  { district: 'Phra Khanong',          bts: 'BTS Punnawithi 250m',          floors: 37, units: 778,  year: 2020, facilities: ['Olympic Pool','Gym','Co-working','LED Court','Jacuzzi'],         highlight: 'High ceilings 3.4–5.5m, BTS joint venture, extensive co-living spaces' },
  'The Base Urban Rama 9':   { district: 'Rama 9 / Huai Khwang',  bts: 'MRT Phra Ram 9',              floors: 29, units: 311,  year: 2025, facilities: ['Pool','Gym','Co-working','Rooftop Garden','EV Charging'],        highlight: 'New CBD location, fully furnished, ready to move in' },
  'THE LINE Vibe':           { district: 'Lat Phrao / Chatuchak', bts: 'BTS Ha Yaek Lat Phrao 300m',  floors: 33, units: 940,  year: 2024, facilities: ['Pool','Gym','Sky Garden','Co-working','Parking'],                highlight: 'Dual BTS+MRT access, green urban design near Central Ladprao' },
  'THE LINE Asoke-Ratchada': { district: 'Din Daeng / Rama 9',    bts: 'MRT Phra Ram 9 300m',         floors: 38, units: 473,  year: 2019, facilities: ['Pool','Gym','Sky Lounge','Garden','Parking'],                    highlight: 'New CBD connectivity between Rama 9, Ratchada and Asoke' },
  'THE LINE Jatujak-Mochit': { district: 'Chatuchak',             bts: 'BTS Mo Chit / MRT Chatuchak 350m', floors: 43, units: 841, year: 2018, facilities: ['Pool','Gym','Kids Club','Sky Lounge'],                    highlight: 'Panoramic views of Chatuchak Park, major transit interchange' },
  'THE LINE Ratchathewi':    { district: 'Ratchathewi',           bts: 'BTS Ratchathewi 220m',        floors: 38, units: 231,  year: 2018, facilities: ['Pool','Gym','Library','Meeting Room'],                           highlight: 'Low density high-rise, walkable to Siam and Central World' },
  'THE LINE Wongsawang':     { district: 'Bang Sue / Wong Sawang', bts: 'MRT Wong Sawang 200m',       floors: 36, units: 1287, year: 2018, facilities: ['50m Pool','Gym','Sky Lounge','Cinema','Garden'],                  highlight: 'Large-scale tower on Purple Line corridor' },
  'THE LINE Phahon-Pradipat':{ district: 'Phaya Thai / Saphan Khwai', bts: 'BTS Saphan Khwai 550m',  floors: 46, units: 981,  year: 2019, facilities: ['Pool','Gym','Secret Garden','Kids Club','Parking'],               highlight: 'Tallest THE LINE project, park-oriented with BTS/MRT access' },
  'THE LINE Phahonyothin Park': { district: 'Chomphon / Chatuchak', bts: 'BTS Ha Yaek Lat Phrao 300m', floors: 32, units: 880, year: 2022, facilities: ['Sky Pool','Gym','Co-working','Co-cooking','Garden'],             highlight: 'Eco-friendly campus design, Magical Tree concept' },
  'THE LINE Sukhumvit 71':   { district: 'Phra Khanong / Watthana', bts: 'BTS Phra Khanong 400m',    floors: 28, units: 291,  year: 2016, facilities: ['Pool','Gym','Library','Rooftop Garden'],                          highlight: 'Boutique high-rise in quiet Sukhumvit 71 pocket' },
  'WYNE Sukhumvit':          { district: 'Phra Khanong / Khlong Toei', bts: 'BTS Phra Khanong 300m', floors: 31, units: 460,  year: 2012, facilities: ['Pool','Gym','Sauna','Library','Garden'],                          highlight: 'Iconic red-themed design at Sukhumvit-Rama 4 junction' },
  'Taka Haus':               { district: 'Ekkamai / Watthana',    bts: 'BTS Ekkamai',                 floors: 8,  units: 269,  year: 2019, facilities: ['Pool','Gym','Treehouse','Garden','Parking'],                     highlight: 'Sansiri x Tokyu joint venture, Japanese-influenced low-rise' },
  'Mori Haus':               { district: 'On Nut / T77',           bts: 'BTS On Nut',                 floors: 7,  units: 262,  year: 2017, facilities: ['Pool','Gym','Rooftop Garden','Sauna','Shuttle'],                 highlight: 'Forest in the city concept inside T77 community' },
  'Kawa Haus':               { district: 'On Nut / T77',           bts: 'BTS On Nut',                 floors: 7,  units: 546,  year: 2020, facilities: ['Waterfront Pool','Gym','Lounge','Garden','Parking'],             highlight: 'Canal-facing resort design in T77 ecosystem' },
  'Hasu Haus':               { district: 'On Nut / T77',           bts: 'BTS On Nut',                 floors: 7,  units: 324,  year: 2016, facilities: ['Pool','Gym','Lily Pond','Library','Garden'],                     highlight: 'Zen canal-side living, quietest of the T77 HAUS collection' },
  'The Base Park West Sukhumvit 77': { district: 'On Nut / T77',  bts: 'BTS On Nut',                  floors: 39, units: 711,  year: 2015, facilities: ['Pool','Gym','Garden','Concierge','Parking'],                    highlight: 'Large community high-rise at the heart of T77' },
  'The Base Park East Sukhumvit 77': { district: 'On Nut / T77',  bts: 'BTS On Nut',                  floors: 39, units: 711,  year: 2015, facilities: ['Pool','Gym','Garden','Parking'],                               highlight: 'Twin tower with Park West in the T77 community' },
  'The Base Phetchaburi-Thonglor': { district: 'Huai Khwang / New Phetchaburi', bts: 'MRT Phetchaburi', floors: 36, units: 496, year: 2022, facilities: ['Pool','Gym','Co-working','Garden','Parking'],                highlight: 'Access to both Thonglor and New Phetchaburi corridor' },
  'The Base Saphanmai':      { district: 'Bang Khen / Saphanmai',  bts: 'BTS Sai Yud 30m',            floors: 14, units: 820,  year: 2020, facilities: ['Panoramic Pool','Gym','Rooftop Garden','Sauna','Library'],       highlight: '0 meters from Green Line BTS, large-scale mid-rise' },
  'The Base Garden Rama 9':  { district: 'Hua Mak / Rama 9',       bts: 'ARL Ramkhamhaeng 700m',      floors: 36, units: 639,  year: 2019, facilities: ['Pool','Gym','Garden','Treehouse','Concierge'],                  highlight: 'Nature-first design with treehouse feature, Rama 9 corridor' },
  'The Base Sukhumvit 50':   { district: 'On Nut / Khlong Toei',   bts: 'BTS On Nut 1km',             floors: 8,  units: 415,  year: 2020, facilities: ['Saltwater Pool','Boxing Gym','Garden','Parking'],               highlight: 'Quiet low-rise in Sukhumvit 50 with unique boxing gym' },
  'The Base Phetkasem':      { district: 'Phasi Charoen / Bang Wa', bts: 'MRT Phetkasem 48 120m',     floors: 30, units: 640,  year: 2020, facilities: ['Pool','Gym','Cinema','Garden','Co-working'],                    highlight: 'Western Bangkok option with Blue Line MRT access' },
  'NYE by Sansiri':          { district: 'Wongwian Yai / Khlong San', bts: 'BTS Wongwian Yai 150m',   floors: 30, units: 636,  year: 2015, facilities: ['Pool','Gym','Library','Garden','Recreation Area'],               highlight: 'Gold-themed towers, quick access to Sathorn-Silom' },
  'dcondo Shine':            { district: 'Khlong Luang / Rangsit',  bts: 'Near Thammasat Rangsit',    floors: 8,  units: 542,  year: 2026, facilities: ['Pool','Gym','Co-working','Garden'],                             highlight: 'Student and young professional hub near Thammasat' },
  'dcondo Calm':             { district: 'Bang Kapi / Hua Mak',     bts: 'MRT Si Kritha',             floors: 8,  units: 495,  year: 2023, facilities: ['Pool','Gym','Garden','Co-working','Security'],                  highlight: 'Minimalist design in growing Ramkhamhaeng area' },
  'dcondo Hype':             { district: 'Khlong Luang / Rangsit',  bts: 'Near Thammasat Rangsit',    floors: 8,  units: 551,  year: 2023, facilities: ['Pool','Gym','Co-working','Garden'],                             highlight: 'Energetic design for students and young staff at Rangsit' },
  'The Muve Rama 22':        { district: 'Ramkhamhaeng / Bang Kapi', bts: 'MRT Ramkhamhaeng 12 500m', floors: 8,  units: 216,  year: 2023, facilities: ['Gym','Co-working','Photography Studio','Garden'],               highlight: 'Tailored for content creators with specialized facilities' },
  'NIA by Sansiri':          { district: 'Sukhumvit 71 / Phra Khanong Nuea', bts: 'BTS Phra Khanong', floors: 19, units: 419,  year: 2023, facilities: ['Pool','Gym','Co-working','Garden','Security'],                  highlight: 'Modern high-rise with color-focused design near Sukhumvit 71' },
  'NARINSIRI KRUNGTHEP KREETHA': { district: 'Krungthep Kreetha',  bts: 'n/a',                        floors: 2,  units: 36,   year: 2024, facilities: ['Clubhouse','Pool','Gym','Garden','Lake'],                       highlight: 'Ultra-luxury private estate, The New Heritage design' },
};

const BLDG_META: Record<string, BuildingMeta> = {
  'XT Phayathai':   { area: 'Ratchathewi', bts: 'BTS Phaya Thai' },
  'XT Huaikhwang':  { area: 'Huai Khwang', bts: 'MRT Huai Khwang' },
  'XT Ekkamai':     { area: 'Ekkamai',     bts: 'BTS Ekkamai' },
  'Taka Haus':      { area: 'Ekkamai',     bts: 'BTS Ekkamai' },
  'Mori Haus':      { area: 'On Nut',      bts: 'BTS On Nut' },
  'Kawa Haus':      { area: 'On Nut',      bts: 'BTS On Nut' },
  'Hasu Haus':      { area: 'On Nut',      bts: 'BTS On Nut' },
  'Oka Haus':       { area: 'Thonglor',    bts: 'BTS Thong Lo' },
  'WYNE Sukhumvit': { area: 'Phra Khanong',bts: 'BTS Phra Khanong' },
  'NYE by Sansiri': { area: 'Wongwian Yai',bts: 'BTS Wongwian Yai' },
  'PYNN Soonvijai': { area: 'Rama 9',      bts: 'MRT Phetchaburi' },
  'KHUN BY YOO':    { area: 'Thonglor',    bts: 'BTS Thong Lo' },
  'Flo by Sansiri': { area: 'Khlong San',  bts: 'BTS Khlong San' },
};

export function getBldgMeta(name: string): BuildingMeta {
  if (BLDG_META[name]) return BLDG_META[name];
  const lower = name.toLowerCase();
  for (const [k, v] of Object.entries(BLDG_META)) {
    if (lower.includes(k.toLowerCase()) || k.toLowerCase().includes(lower)) return v;
  }
  if (/thonglor|thong lo/i.test(lower)) return { area: 'Thonglor',    bts: 'BTS Thong Lo' };
  if (/ekkamai/i.test(lower))           return { area: 'Ekkamai',     bts: 'BTS Ekkamai' };
  if (/on nut|t77/i.test(lower))        return { area: 'On Nut',      bts: 'BTS On Nut' };
  if (/sukhumvit/i.test(lower))         return { area: 'Sukhumvit',   bts: 'BTS Sukhumvit' };
  if (/rama\s*9|rama9/i.test(lower))    return { area: 'Rama 9',      bts: 'MRT Phra Ram 9' };
  if (/huai khwang|huaikhwang/i.test(lower)) return { area: 'Huai Khwang', bts: 'MRT Huai Khwang' };
  if (/ratchathewi|ratchadewi/i.test(lower)) return { area: 'Ratchathewi', bts: 'BTS Ratchathewi' };
  if (/lat phrao|ladphrao/i.test(lower))     return { area: 'Lat Phrao',   bts: 'MRT Lat Phrao' };
  if (/phahon|pradipat/i.test(lower))        return { area: 'Phahon Yothin', bts: 'BTS Ari' };
  if (/jatujak|mo chit|mochit/i.test(lower)) return { area: 'Jatujak',   bts: 'BTS Mo Chit' };
  if (/sathorn|silom/i.test(lower))          return { area: 'Sathorn',   bts: 'BTS Surasak' };
  if (/bang na/i.test(lower))                return { area: 'Bang Na',   bts: 'BTS Bang Na' };
  if (/wongsawang|wong sawang/i.test(lower)) return { area: 'Wongwian Yai', bts: 'BTS Wongwian Yai' };
  return { area: 'Bangkok', bts: '—' };
}

export function getAreaGroup(projectName: string): string {
  const bdata = BUILDING_DATA[projectName];
  const s = (bdata ? bdata.district : getBldgMeta(projectName).area).toLowerCase();
  if (/thonglor|thong lo/.test(s))                                   return 'Thonglor';
  if (/ekkamai/.test(s))                                             return 'Ekkamai';
  if (/on nut|t77/.test(s))                                          return 'On Nut';
  if (/sukhumvit|phra khanong|watthana/.test(s))                     return 'Sukhumvit';
  if (/rama 9|din daeng|hua mak/.test(s))                            return 'Rama 9';
  if (/huai khwang/.test(s))                                         return 'Huai Khwang';
  if (/ratchathewi|phayathai/.test(s))                               return 'Ratchathewi';
  if (/lat phrao|chatuchak|jatujak|mochit|phahon|chomphon/.test(s))  return 'Lat Phrao & Chatuchak';
  if (/sathorn|silom|khlong san|wongwian|rama 4/.test(s))            return 'Sathorn & Riverside';
  if (/bang na|bearing/.test(s))                                     return 'Bang Na';
  if (/rangsit|khlong luang/.test(s))                                return 'Rangsit';
  if (/asoke/.test(s))                                               return 'Asoke';
  return getBldgMeta(projectName).area || 'Bangkok';
}

export function unitLabel(unitType: string, unit: string, area?: string | number): string {
  const l = String(unitType ?? '').toLowerCase().trim();
  if (l && l !== 'n/a') {
    if (l === 'studio') return 'Studio';
    const m = l.match(/^(\d+)b/);
    if (m) {
      const n = parseInt(m[1]);
      return n === 1 ? '1 Bedroom' : `${n} Bedrooms`;
    }
    return unitType;
  }
  const d = parseInt(String(unit ?? '').charAt(0));
  if (d >= 1 && d <= 9) return d === 1 ? '1 Bedroom' : `${d} Bedrooms`;
  if (area) return `${area} sqm`;
  return 'Unit';
}

export function cardRoomType(prop: { unitType: string; unit: string }): string {
  const ut = String(prop.unitType ?? '').toLowerCase().trim();
  if (ut === 'studio') return 'studio';
  if (ut && ut !== 'n/a') {
    const m = ut.match(/^(\d+)b/);
    if (m) {
      const n = parseInt(m[1]);
      if (n === 1) return '1-bed';
      if (n === 2) return '2-bed';
      return '3-bed';
    }
  }
  const d = parseInt(String(prop.unit ?? '').charAt(0));
  if (!isNaN(d) && d >= 1) {
    if (d === 1) return '1-bed';
    if (d === 2) return '2-bed';
    if (d >= 3) return '3-bed';
  }
  return '';
}

export function parseFloor(raw: string): { floor: string; bldg: string } {
  const s = String(raw ?? '').trim();
  let m = s.match(/^([A-Za-z])(\d+)$/);
  if (m) return { floor: m[2], bldg: m[1].toUpperCase() };
  m = s.match(/^(\d+)([A-Za-z])$/);
  if (m) return { floor: m[1], bldg: m[2].toUpperCase() };
  return { floor: s, bldg: '' };
}

export function extractFolderId(url: string): string {
  const m = String(url).match(/\/folders\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : '';
}
