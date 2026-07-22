import type { SyntheticEvent } from 'react';
import { BuildingData, BuildingMeta, BuildingProjectDetails, Locale } from './types';

export const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxyO_gn0RdR7_Pz5AEPMQqkIrM7CEg70rFgy-DtzVaZQ1ssZDZXpcbFxPM_tieHJt9l/exec';

interface RawBuildingData extends Omit<BuildingData, 'highlight'> {
  highlight?: Record<Locale, string>;
}

const RAW_BUILDING_DATA: Record<string, RawBuildingData> = {
  'XT Phayathai':            { district: 'Ratchathewi',           bts: 'BTS Phaya Thai 600m',          floors: 41, units: 1435, year: 2022, facilities: ['Pool','Gym','Co-working','EV Charging','Family Mart'],           highlight: { en: 'Two-tower flagship with Airport Rail Link access, 5 min to Siam', th: 'แฟลกชิปสองอาคาร เชื่อมต่อ Airport Rail Link ห่างสยามเพียง 5 นาที', zh: '双塔旗舰盘，连接机场快线，5分钟直达暹罗商圈' } },
  'XT Huaikhwang':           { district: 'Huai Khwang',           bts: 'MRT Huai Khwang 75m',          floors: 43, units: 1404, year: 2021, facilities: ['Pool','Gym','Co-working','Sky Bar','Parking'],                   highlight: { en: 'Ultra-close MRT access, 24-hr lifestyle facilities', th: 'ใกล้ MRT สุดๆ พร้อมสิ่งอำนวยความสะดวกเปิด 24 ชม.', zh: '紧邻地铁站，24小时生活配套设施' } },
  'XT Ekkamai':              { district: 'Ekkamai / Watthana',    bts: 'BTS Ekkamai',                  floors: 38, units: 537,  year: 2020, facilities: ['Pool','Gym','Sky Lounge','Co-working'],                          highlight: { en: "Creative lifestyle condo in Bangkok's most vibrant district", th: 'คอนโดไลฟ์สไตล์สร้างสรรค์ ในย่านที่มีชีวิตชีวาที่สุดของกรุงเทพฯ', zh: '曼谷最具活力街区的创意生活公寓' } },
  'Flo by Sansiri':          { district: 'Khlong San',            bts: 'BTS Khlong San 350m',          floors: 22, units: 508,  year: 2025, facilities: ['Infinity Pool','Gym','Sky Lounge','Garden','Parking'],           highlight: { en: 'Riverside living near ICONSIAM, river views, Gold Line access', th: 'ริมแม่น้ำใกล้ ICONSIAM วิวแม่น้ำ เชื่อมต่อสายสีทอง', zh: '毗邻ICONSIAM的江景住宅，可乘金线轻轨' } },
  'KHUN BY YOO':             { district: 'Thonglor / Watthana',   bts: 'BTS Thong Lo',                 floors: 27, units: 148,  year: 2020, facilities: ['Luxury Pool','Gym','Private Cinema','Concierge','Auto Parking'], highlight: { en: 'Ultra-luxury branded by Philippe Starck x YOO Studio', th: 'ลักชัวรีระดับอัลตร้า ออกแบบโดย Philippe Starck x YOO Studio', zh: 'Philippe Starck x YOO Studio打造的超奢华品牌公寓' } },
  'PYNN Soonvijai':          { district: 'Rama 9 / Huai Khwang',  bts: 'MRT Phetchaburi, ARL',        floors: 7,  units: 18,   year: 2024, facilities: ['Rooftop Garden','EV Charging','Parking','CCTV'],                highlight: { en: 'Ultra-boutique luxury, only 18 units, 5 min from Thonglor', th: 'บูติกหรูสุดพิเศษ มีเพียง 18 ยูนิต ห่างทองหล่อ 5 นาที', zh: '超精品奢华公寓，仅18户，距通罗5分钟' } },
  'Oka Haus':                { district: 'Rama 4 / Khlong Tan',   bts: 'BTS Thong Lo 1.3km',           floors: 47, units: 1178, year: 2019, facilities: ['40m Pool','Gym','Jacuzzi','Garden','Hydrotherapy','Parking'],    highlight: { en: 'Resort-style living on Rama 4, Japanese-inspired tower', th: 'ใช้ชีวิตสไตล์รีสอร์ทบนถนนพระราม 4 ตึกแรงบันดาลใจญี่ปุ่น', zh: 'Rama 4路的度假村式生活，日式灵感高塔' }, photosUrl: 'https://drive.google.com/drive/u/2/folders/1Idohp1NY6mG74x2mr9uP2e2IDzIkPwfq' },
  'THE LINE Sukhumvit 101':  { district: 'Phra Khanong',          bts: 'BTS Punnawithi 250m',          floors: 37, units: 778,  year: 2020, facilities: ['Olympic Pool','Gym','Co-working','LED Court','Jacuzzi'],         highlight: { en: 'High ceilings 3.4–5.5m, BTS joint venture, extensive co-living spaces', th: 'เพดานสูง 3.4–5.5 ม. ร่วมทุนกับ BTS พื้นที่ co-living กว้างขวาง', zh: '层高3.4-5.5米，与BTS合资开发，共享生活空间充足' } },
  'The Base Urban Rama 9':   { district: 'Rama 9 / Huai Khwang',  bts: 'MRT Phra Ram 9',              floors: 29, units: 311,  year: 2025, facilities: ['Pool','Gym','Co-working','Rooftop Garden','EV Charging'],        highlight: { en: 'New CBD location, fully furnished, ready to move in', th: 'ทำเล CBD ใหม่ ตกแต่งครบ พร้อมย้ายเข้าอยู่', zh: '新CBD地段，全套家具，即刻入住' } },
  'THE LINE Vibe':           { district: 'Lat Phrao / Chatuchak', bts: 'BTS Ha Yaek Lat Phrao 300m',  floors: 33, units: 940,  year: 2024, facilities: ['Pool','Gym','Sky Garden','Co-working','Parking'],                highlight: { en: 'Dual BTS+MRT access, green urban design near Central Ladprao', th: 'เชื่อมต่อทั้ง BTS และ MRT ดีไซน์สีเขียวใกล้เซ็นทรัลลาดพร้าว', zh: '双轨交通(BTS+MRT)，绿意都市设计，近Central Ladprao' } },
  'THE LINE Asoke-Ratchada': { district: 'Din Daeng / Rama 9',    bts: 'MRT Phra Ram 9 300m',         floors: 38, units: 473,  year: 2019, facilities: ['Pool','Gym','Sky Lounge','Garden','Parking'],                    highlight: { en: 'New CBD connectivity between Rama 9, Ratchada and Asoke', th: 'เชื่อมต่อ CBD ใหม่ ระหว่างพระราม 9 รัชดา และอโศก', zh: '连接Rama 9、Ratchada和Asoke的新CBD枢纽' } },
  'THE LINE Jatujak-Mochit': { district: 'Chatuchak',             bts: 'BTS Mo Chit / MRT Chatuchak 350m', floors: 43, units: 841, year: 2018, facilities: ['Pool','Gym','Kids Club','Sky Lounge'],                    highlight: { en: 'Panoramic views of Chatuchak Park, major transit interchange', th: 'วิวพาโนรามาสวนจตุจักร จุดเชื่อมต่อการเดินทางสำคัญ', zh: '俯瞰恰图恰公园全景，主要交通枢纽' } },
  'THE LINE Ratchathewi':    { district: 'Ratchathewi',           bts: 'BTS Ratchathewi 220m',        floors: 38, units: 231,  year: 2018, facilities: ['Pool','Gym','Library','Meeting Room'],                           highlight: { en: 'Low density high-rise, walkable to Siam and Central World', th: 'ตึกสูงความหนาแน่นต่ำ เดินถึงสยามและเซ็นทรัลเวิลด์', zh: '低密度高层住宅，步行可达暹罗和Central World' } },
  'THE LINE Wongsawang':     { district: 'Bang Sue / Wong Sawang', bts: 'MRT Wong Sawang 200m',       floors: 36, units: 1287, year: 2018, facilities: ['50m Pool','Gym','Sky Lounge','Cinema','Garden'],                  highlight: { en: 'Large-scale tower on Purple Line corridor', th: 'ตึกขนาดใหญ่บนเส้นทางรถไฟฟ้าสายสีม่วง', zh: '紫线沿线大型高层住宅' } },
  'THE LINE Phahon-Pradipat':{ district: 'Phaya Thai / Saphan Khwai', bts: 'BTS Saphan Khwai 550m',  floors: 46, units: 981,  year: 2019, facilities: ['Pool','Gym','Secret Garden','Kids Club','Parking'],               highlight: { en: 'Tallest THE LINE project, park-oriented with BTS/MRT access', th: 'โครงการ THE LINE ที่สูงที่สุด โอบล้อมด้วยสวน เชื่อมต่อ BTS/MRT', zh: 'THE LINE系列最高楼盘，公园式设计，连接BTS/MRT' } },
  'THE LINE Phahonyothin Park': { district: 'Chomphon / Chatuchak', bts: 'BTS Ha Yaek Lat Phrao 300m', floors: 32, units: 880, year: 2022, facilities: ['Sky Pool','Gym','Co-working','Co-cooking','Garden'],             highlight: { en: 'Eco-friendly campus design, Magical Tree concept', th: 'ดีไซน์แคมปัสเป็นมิตรกับสิ่งแวดล้อม แนวคิด Magical Tree', zh: '生态校园式设计，魔法树概念' } },
  'THE LINE Sukhumvit 71':   { district: 'Phra Khanong / Watthana', bts: 'BTS Phra Khanong 400m',    floors: 28, units: 291,  year: 2016, facilities: ['Pool','Gym','Library','Rooftop Garden'],                          highlight: { en: 'Boutique high-rise in quiet Sukhumvit 71 pocket', th: 'ตึกสูงบูติกในซอยสุขุมวิท 71 ที่เงียบสงบ', zh: '素坤逸71巷宁静角落的精品高层住宅' } },
  'WYNE Sukhumvit':          { district: 'Phra Khanong / Khlong Toei', bts: 'BTS Phra Khanong 300m', floors: 31, units: 460,  year: 2012, facilities: ['Pool','Gym','Sauna','Library','Garden'],                          highlight: { en: 'Iconic red-themed design at Sukhumvit-Rama 4 junction', th: 'ดีไซน์โทนสีแดงเป็นเอกลักษณ์ ที่แยกสุขุมวิท-พระราม 4', zh: '素坤逸-Rama 4路口的标志性红色主题设计' } },
  'Taka Haus':               { district: 'Ekkamai / Watthana',    bts: 'BTS Ekkamai',                 floors: 8,  units: 269,  year: 2019, facilities: ['Pool','Gym','Treehouse','Garden','Parking'],                     highlight: { en: 'Sansiri x Tokyu joint venture, Japanese-influenced low-rise', th: 'ร่วมทุนแสนสิริ x Tokyu ตึกเตี้ยสไตล์ญี่ปุ่น', zh: 'Sansiri与东急合资，日式风格低层住宅' } },
  'Mori Haus':               { district: 'On Nut / T77',           bts: 'BTS On Nut',                 floors: 7,  units: 262,  year: 2017, facilities: ['Pool','Gym','Rooftop Garden','Sauna','Shuttle'],                 highlight: { en: 'Forest in the city concept inside T77 community', th: 'แนวคิดป่าในเมือง ภายในคอมมูนิตี้ T77', zh: 'T77社区内的城市森林概念' } },
  'Kawa Haus':               { district: 'On Nut / T77',           bts: 'BTS On Nut',                 floors: 7,  units: 546,  year: 2020, facilities: ['Waterfront Pool','Gym','Lounge','Garden','Parking'],             highlight: { en: 'Canal-facing resort design in T77 ecosystem', th: 'ดีไซน์รีสอร์ทริมคลอง ในระบบนิเวศ T77', zh: 'T77生态圈内的运河景观度假式设计' } },
  'Hasu Haus':               { district: 'On Nut / T77',           bts: 'BTS On Nut',                 floors: 7,  units: 324,  year: 2016, facilities: ['Pool','Gym','Lily Pond','Library','Garden'],                     highlight: { en: 'Zen canal-side living, quietest of the T77 HAUS collection', th: 'ใช้ชีวิตริมคลองแบบเซน เงียบสงบที่สุดในกลุ่ม T77 HAUS', zh: '禅意运河生活，T77 HAUS系列中最宁静的一座' } },
  'The Base Park West Sukhumvit 77': { district: 'On Nut / T77',  bts: 'BTS On Nut',                  floors: 39, units: 711,  year: 2015, facilities: ['Pool','Gym','Garden','Concierge','Parking'],                    highlight: { en: 'Large community high-rise at the heart of T77', th: 'ตึกสูงคอมมูนิตี้ขนาดใหญ่ ใจกลาง T77', zh: 'T77核心地段的大型社区高层住宅' } },
  'The Base Park East Sukhumvit 77': { district: 'On Nut / T77',  bts: 'BTS On Nut',                  floors: 39, units: 711,  year: 2015, facilities: ['Pool','Gym','Garden','Parking'],                               highlight: { en: 'Twin tower with Park West in the T77 community', th: 'ตึกแฝดคู่กับ Park West ในคอมมูนิตี้ T77', zh: '与Park West并肩的双子塔，位于T77社区' } },
  'The Base Phetchaburi-Thonglor': { district: 'Huai Khwang / New Phetchaburi', bts: 'MRT Phetchaburi', floors: 36, units: 496, year: 2022, facilities: ['Pool','Gym','Co-working','Garden','Parking'],                highlight: { en: 'Access to both Thonglor and New Phetchaburi corridor', th: 'เชื่อมต่อได้ทั้งทองหล่อและถนนเพชรบุรีตัดใหม่', zh: '同时连接通罗与新佩差汶里路走廊' } },
  'The Base Saphanmai':      { district: 'Bang Khen / Saphanmai',  bts: 'BTS Sai Yud 30m',            floors: 14, units: 820,  year: 2020, facilities: ['Panoramic Pool','Gym','Rooftop Garden','Sauna','Library'],       highlight: { en: '0 meters from Green Line BTS, large-scale mid-rise', th: 'ติด BTS สายสีเขียว 0 เมตร ตึกขนาดใหญ่ความสูงปานกลาง', zh: '距绿线BTS 0米，大型中层住宅' } },
  'The Base Garden Rama 9':  { district: 'Hua Mak / Rama 9',       bts: 'ARL Ramkhamhaeng 700m',      floors: 36, units: 639,  year: 2019, facilities: ['Pool','Gym','Garden','Treehouse','Concierge'],                  highlight: { en: 'Nature-first design with treehouse feature, Rama 9 corridor', th: 'ดีไซน์เน้นธรรมชาติ พร้อมบ้านต้นไม้ ย่านพระราม 9', zh: '自然优先设计，配有树屋，位于Rama 9走廊' } },
  'The Base Sukhumvit 50':   { district: 'On Nut / Khlong Toei',   bts: 'BTS On Nut 1km',             floors: 8,  units: 415,  year: 2020, facilities: ['Saltwater Pool','Boxing Gym','Garden','Parking'],               highlight: { en: 'Quiet low-rise in Sukhumvit 50 with unique boxing gym', th: 'ตึกเตี้ยเงียบสงบในสุขุมวิท 50 พร้อมยิมมวยที่ไม่เหมือนใคร', zh: '素坤逸50巷宁静低层住宅，配有特色拳击健身房' } },
  'The Base Phetkasem':      { district: 'Phasi Charoen / Bang Wa', bts: 'MRT Phetkasem 48 120m',     floors: 30, units: 640,  year: 2020, facilities: ['Pool','Gym','Cinema','Garden','Co-working'],                    highlight: { en: 'Western Bangkok option with Blue Line MRT access', th: 'ตัวเลือกฝั่งตะวันตกของกรุงเทพฯ เชื่อมต่อ MRT สายสีน้ำเงิน', zh: '曼谷西区之选，连接蓝线地铁' } },
  'NYE by Sansiri':          { district: 'Wongwian Yai / Khlong San', bts: 'BTS Wongwian Yai 150m',   floors: 30, units: 636,  year: 2015, facilities: ['Pool','Gym','Library','Garden','Recreation Area'],               highlight: { en: 'Gold-themed towers, quick access to Sathorn-Silom', th: 'ตึกโทนสีทอง เดินทางสะดวกสู่สาทร-สีลม', zh: '金色主题高塔，快速直达沙吞-是隆商圈' } },
  'dcondo Shine':            { district: 'Khlong Luang / Rangsit',  bts: 'Near Thammasat Rangsit',    floors: 8,  units: 542,  year: 2026, facilities: ['Pool','Gym','Co-working','Garden'],                             highlight: { en: 'Student and young professional hub near Thammasat', th: 'ศูนย์รวมนักศึกษาและคนทำงานรุ่นใหม่ ใกล้มธ. รังสิต', zh: '毗邻法政大学论实校区的学生及青年白领聚集地' } },
  'dcondo Calm':             { district: 'Bang Kapi / Hua Mak',     bts: 'MRT Si Kritha',             floors: 8,  units: 495,  year: 2023, facilities: ['Pool','Gym','Garden','Co-working','Security'],                  highlight: { en: 'Minimalist design in growing Ramkhamhaeng area', th: 'ดีไซน์มินิมอลในย่านรามคำแหงที่กำลังเติบโต', zh: '拉抗行新兴区域的极简风格设计' } },
  'dcondo Hype':             { district: 'Khlong Luang / Rangsit',  bts: 'Near Thammasat Rangsit',    floors: 8,  units: 551,  year: 2023, facilities: ['Pool','Gym','Co-working','Garden'],                             highlight: { en: 'Energetic design for students and young staff at Rangsit', th: 'ดีไซน์เต็มไปด้วยพลัง สำหรับนักศึกษาและคนทำงานรุ่นใหม่ที่รังสิต', zh: '为论实学生及青年员工打造的活力设计' } },
  'The Muve Rama 22':        { district: 'Ramkhamhaeng / Bang Kapi', bts: 'MRT Ramkhamhaeng 12 500m', floors: 8,  units: 216,  year: 2023, facilities: ['Gym','Co-working','Photography Studio','Garden'],               highlight: { en: 'Tailored for content creators with specialized facilities', th: 'ออกแบบเฉพาะสำหรับครีเอเตอร์ พร้อมสิ่งอำนวยความสะดวกพิเศษ', zh: '专为内容创作者打造，配备专属设施' } },
  'NIA by Sansiri':          { district: 'Sukhumvit 71 / Phra Khanong Nuea', bts: 'BTS Phra Khanong', floors: 19, units: 419,  year: 2023, facilities: ['Pool','Gym','Co-working','Garden','Security'],                  highlight: { en: 'Modern high-rise with color-focused design near Sukhumvit 71', th: 'ตึกสูงโมเดิร์น ดีไซน์เน้นสีสัน ใกล้สุขุมวิท 71', zh: '现代高层住宅，色彩主题设计，近素坤逸71巷' } },
  'NARINSIRI KRUNGTHEP KREETHA': { district: 'Krungthep Kreetha',  bts: 'n/a',                        floors: 2,  units: 36,   year: 2024, facilities: ['Clubhouse','Pool','Gym','Garden','Lake'],                       highlight: { en: 'Ultra-luxury private estate, The New Heritage design', th: 'บ้านเดี่ยวหรูระดับอัลตร้า ดีไซน์ The New Heritage', zh: '超奢华独栋别墅，The New Heritage设计理念' } },
};

/** English-canonical facility name → translated label. Falls back to the English name if untranslated. */
const FACILITY_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  'Pool':                { en: 'Pool', th: 'สระว่ายน้ำ', zh: '泳池' },
  '40m Pool':             { en: '40m Pool', th: 'สระว่ายน้ำ 40 เมตร', zh: '40米泳池' },
  '50m Pool':             { en: '50m Pool', th: 'สระว่ายน้ำ 50 เมตร', zh: '50米泳池' },
  'Infinity Pool':        { en: 'Infinity Pool', th: 'สระอินฟินิตี้', zh: '无边泳池' },
  'Luxury Pool':          { en: 'Luxury Pool', th: 'สระหรู', zh: '豪华泳池' },
  'Olympic Pool':         { en: 'Olympic Pool', th: 'สระว่ายน้ำมาตรฐานโอลิมปิก', zh: '奥运标准泳池' },
  'Sky Pool':             { en: 'Sky Pool', th: 'สระลอยฟ้า', zh: '空中泳池' },
  'Waterfront Pool':      { en: 'Waterfront Pool', th: 'สระริมน้ำ', zh: '滨水泳池' },
  'Panoramic Pool':       { en: 'Panoramic Pool', th: 'สระวิวพาโนรามา', zh: '全景泳池' },
  'Saltwater Pool':       { en: 'Saltwater Pool', th: 'สระน้ำเกลือ', zh: '盐水泳池' },
  'Gym':                  { en: 'Gym', th: 'ฟิตเนส', zh: '健身房' },
  'Boxing Gym':           { en: 'Boxing Gym', th: 'ยิมมวย', zh: '拳击健身房' },
  'Co-working':           { en: 'Co-working', th: 'พื้นที่ทำงานร่วมกัน', zh: '共享办公空间' },
  'Co-cooking':           { en: 'Co-cooking', th: 'ครัวรวม', zh: '共享厨房' },
  'EV Charging':          { en: 'EV Charging', th: 'จุดชาร์จรถ EV', zh: '电动车充电桩' },
  'Family Mart':          { en: 'Family Mart', th: 'ร้านสะดวกซื้อ Family Mart', zh: '全家便利店' },
  'Sky Bar':              { en: 'Sky Bar', th: 'สกายบาร์', zh: '空中酒吧' },
  'Parking':              { en: 'Parking', th: 'ที่จอดรถ', zh: '停车场' },
  'Auto Parking':         { en: 'Auto Parking', th: 'ที่จอดรถอัตโนมัติ', zh: '自动停车系统' },
  'Sky Lounge':           { en: 'Sky Lounge', th: 'สกายเลาจน์', zh: '空中会所' },
  'Garden':               { en: 'Garden', th: 'สวน', zh: '花园' },
  'Rooftop Garden':       { en: 'Rooftop Garden', th: 'สวนดาดฟ้า', zh: '屋顶花园' },
  'Sky Garden':           { en: 'Sky Garden', th: 'สวนลอยฟ้า', zh: '空中花园' },
  'Secret Garden':        { en: 'Secret Garden', th: 'สวนลับ', zh: '秘密花园' },
  'Private Cinema':       { en: 'Private Cinema', th: 'โรงหนังส่วนตัว', zh: '私人影院' },
  'Cinema':               { en: 'Cinema', th: 'โรงภาพยนตร์', zh: '影院' },
  'Concierge':            { en: 'Concierge', th: 'บริการคอนเซียร์จ', zh: '礼宾服务' },
  'CCTV':                 { en: 'CCTV', th: 'กล้องวงจรปิด', zh: '监控摄像头' },
  'Jacuzzi':              { en: 'Jacuzzi', th: 'จากุซซี่', zh: '按摩浴池' },
  'Hydrotherapy':         { en: 'Hydrotherapy', th: 'ไฮโดรเธอราพี', zh: '水疗池' },
  'LED Court':            { en: 'LED Court', th: 'สนามกีฬา LED', zh: 'LED运动场' },
  'Kids Club':            { en: 'Kids Club', th: 'สนามเด็กเล่น', zh: '儿童俱乐部' },
  'Library':              { en: 'Library', th: 'ห้องสมุด', zh: '图书室' },
  'Meeting Room':         { en: 'Meeting Room', th: 'ห้องประชุม', zh: '会议室' },
  'Sauna':                { en: 'Sauna', th: 'ซาวน่า', zh: '桑拿房' },
  'Treehouse':            { en: 'Treehouse', th: 'บ้านต้นไม้', zh: '树屋' },
  'Shuttle':              { en: 'Shuttle', th: 'รถรับส่ง', zh: '班车服务' },
  'Lounge':               { en: 'Lounge', th: 'เลาจน์', zh: '休息室' },
  'Lily Pond':            { en: 'Lily Pond', th: 'บ่อบัว', zh: '睡莲池' },
  'Recreation Area':      { en: 'Recreation Area', th: 'พื้นที่พักผ่อน', zh: '休闲区' },
  'Photography Studio':   { en: 'Photography Studio', th: 'สตูดิโอถ่ายภาพ', zh: '摄影棚' },
  'Security':             { en: 'Security', th: 'รักษาความปลอดภัย', zh: '安保系统' },
  'Clubhouse':            { en: 'Clubhouse', th: 'คลับเฮาส์', zh: '会所' },
  'Lake':                 { en: 'Lake', th: 'ทะเลสาบ', zh: '湖泊' },
};

export function translateFacility(name: string, locale: Locale): string {
  return FACILITY_TRANSLATIONS[name]?.[locale] ?? name;
}

/** Normalizes a project name for matching against sheet data, which is inconsistent in casing/spacing/hyphens (e.g. "Oka haus" vs "Oka Haus", "THE LINE Asoke - Ratchada" vs "THE LINE Asoke-Ratchada"). */
function normalizeName(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const RAW_BUILDING_DATA_BY_NORMALIZED: Record<string, RawBuildingData> = Object.fromEntries(
  Object.entries(RAW_BUILDING_DATA).map(([name, data]) => [normalizeName(name), data])
);

export function getBuildingData(name: string, locale: Locale = 'en'): BuildingData | null {
  const raw = RAW_BUILDING_DATA_BY_NORMALIZED[normalizeName(name)];
  if (!raw) return null;
  return {
    ...raw,
    highlight: raw.highlight?.[locale] ?? raw.highlight?.en,
    facilities: raw.facilities?.map(f => translateFacility(f, locale)),
  };
}

/** Google Drive file IDs for Oka Haus project-detail photos (from the "buildings" folder), reused identically across all locales. */
const OKA_HAUS_IMG = {
  location:        '1ggl6Wj0p7IP0xkD8mzpqUpwXHq4Bz8Xf',
  design:          '1ctnsHhgcE9A5ZQHz2EHL-WHKQPwcDcdV',
  lobbyLounge:     '1cdavqY01bv4818omG-Jqc9UCUxICa3_M',
  pool:            '1K6XmexAKD0pd8s6eSoSyHaF7FTkGXyBP',
  kidsArea:        '1X21SyRWtJjXr0sfFBWPirgINr3l7jvXF',
  exerciseRoom:    '1fmuWECVMRD-O_q2FeDfZZHjlTOhk3y7J',
  coWorking:       '1n6S5TA1FIaYEtI-65A7unQV30S-gpPuF',
  coKitchen:       '1vVXgym5AGjlkFs_IFqqtP5xFGCH4kVfc',
  amphitheater:    '1D6iDqU4Dp7MzJaZmTAujGzFmDg_Jsobt',
  rooftopGarden:   '1w73HQmscet-zzHddb7e5YoGEmZDVe8kD',
  sansiriBackyard: '1Ea4niexAhh9_QA5hb0BgveUV17-s1_rj',
  omniLight:       '1PBORrLv53yIdhbMCyfy5PNheWYiJoL4l',
};

export const BUILDING_DETAILS: Record<string, Partial<Record<Locale, BuildingProjectDetails>>> = {
  'Oka Haus': {
    th: {
      summary: [
        'อยู่บนทำเลที่ดี เป็นคอนโดพระราม 4 ที่เชื่อมต่อได้ทั้งสุขุมวิท สาทร สีลม ใกล้ BTS และทางด่วน อีกทั้งยังอยู่ใกล้ย่านออฟฟิศ และแหล่งแฮงค์เอาท์ชั้นนำ',
        'มีห้องให้เลือกหลายแบบ ตอบโจทย์ทุกคน ไม่ว่าจะอยู่คนเดียว อยู่เป็นคู่ หรืออยู่เป็นครอบครัว',
        'สิ่งอำนวยความสะดวกครบครันที่สุด รองรับได้ทุกไลฟ์สไตล์',
        'มีนวัตกรรมล้ำสมัย ที่ครอบคลุมการใช้ชีวิตในทุกๆ ด้าน',
      ],
      location: {
        imageId: OKA_HAUS_IMG.location,
        description: 'OKA HAUS สุขุมวิท 36 ตั้งอยู่บนทำเลที่มีศักยภาพมาก อยู่ติดถนนใหญ่พระราม 4 ใกล้กับอาคารมาลีนนท์ ทาวเวอร์ นอกจากจะสามารถใช้เส้นทางเข้าออกจากซอยสุขุมวิท 36 ได้แล้ว ยังสามารถใช้ซอยสุขุมวิท 26 และ 38 ลัดไปออกตรง BTS สถานีทองหล่อพอดีอีกด้วย เพียงแค่ประมาณ 1.3 กม. ซึ่งใครที่ใช้ BTS เป็นประจำ ทางโครงการก็มี Shuttle Service ไปส่งด้วย นอกจากนี้ยังใกล้ทางด่วนเฉลิมมหานคร และอาจณรงค์ สามารถเชื่อมต่อ จตุจักร พระราม 3 บางนา รามอินทรา ได้อย่างรวดเร็ว',
        nearby: [
          { name: 'อาคารมาลีนนท์', distance: '450 เมตร' },
          { name: 'ม.กรุงเทพ', distance: '1.3 กม.' },
          { name: 'K Village', distance: '900 เมตร' },
          { name: 'ศูนย์การประชุมแห่งชาติสิริกิติ์', distance: '3 กม.' },
          { name: 'Gateway เอกมัย', distance: '1.5 กม.' },
          { name: 'Major Cineplex เอกมัย', distance: '2.1 กม.' },
          { name: 'สวนเพลิน มาร์เก็ต', distance: '400 เมตร' },
          { name: 'Tesco Lotus พระราม 4', distance: '1.6 กม.' },
          { name: 'Big C พระราม 4', distance: '750 เมตร' },
          { name: 'โรงพยาบาลกล้วยน้ำไท', distance: '1.6 กม.' },
          { name: 'โรงพยาบาลสุขุมวิท', distance: '1.9 กม.' },
          { name: 'กรีนทาวเวอร์', distance: '1 กม.' },
          { name: 'อาคารสิรินรัตน์', distance: '1.3 กม.' },
        ],
      },
      design: {
        imageId: OKA_HAUS_IMG.design,
        description: 'คำว่า "oka" ในภาษาญี่ปุ่นแปลว่า "ภูเขา" ดังนั้นโครงการ oka HAUS สุขุมวิท 36 จึงเป็นโครงการที่ออกแบบโดยเน้นความเป็นธรรมชาติ ภายใต้แนวคิด RETREAT & REBOUND ที่หยิบเอา ขุนเขา สายลม แสงแดด มาเป็นแรงบันดาลใจในการออกแบบโครงการ ทั้งในส่วนของห้องพัก และส่วนกลาง พร้อมตอบโจทย์คนทำงานที่ต้องการพักผ่อนอย่างเต็มที่ หลังจากทำงานมาทั้งวัน โครงการเป็นคอนโด High Rise สูง 47 ชั้น มีจำนวนทั้งหมด 1,178 ยูนิต',
        floorBreakdown: [
          { label: 'ชั้น 1',     description: 'Lobby ของโครงการ พร้อม Educational Playground สนามเด็กเล่นเสริมพัฒนาการ' },
          { label: 'ชั้น 1-7',   description: 'ที่จอดรถ' },
          { label: 'ชั้น 8',     description: 'ห้องพักอาศัย และ Facilities หลักของโครงการ' },
          { label: 'ชั้น 9-46',  description: 'ห้องพักอาศัยแบบเต็มชั้น ยกเว้นชั้น 22 ที่เป็นสวนหย่อมและจุดชมวิว' },
          { label: 'ชั้น 47',    description: 'ห้องพักอาศัยบนสุด และ Sky Facilities' },
          { label: 'Rooftop',   description: 'จุดชมวิวโค้งน้ำเจ้าพระยา พร้อมลานภาพยนตร์กลางแจ้ง และแปลงผักจาก Sansiri Backyard' },
        ],
      },
      unitTypes: [
        { label: '1 ห้องนอน',           sizeRange: '26.5 – 34.75 ตร.ม.' },
        { label: '2 ห้องนอน',           sizeRange: '40.5 – 49.50 ตร.ม.' },
        { label: '3 ห้องนอน 2 ห้องน้ำ', sizeRange: '86.25 – 86.5 ตร.ม.' },
      ],
      unitHighlights: [
        'ประตู Digital Door Lock ของ igloohome ใช้ได้ทั้งกุญแจ รหัส และเชื่อมต่อผ่าน Application',
        'พื้นที่หน้าห้องสำหรับวางตู้รองเท้า พร้อมตัวเลือก Built-in Furniture Package',
        'ห้องน้ำแยกสัดส่วน ฝักบัวมือจับและ Rain Shower โถสุขภัณฑ์อัตโนมัติของ COTTO',
        'Pantry ครบเซ็ต เตาไฟฟ้า TEKA 2 หัว พร้อมเครื่องดูดควันแบบปล่อยออกด้านนอก',
        'ตู้เก็บของใต้เคาน์เตอร์แบ่งลิ้นชักย่อย พร้อมช่องวางไมโครเวฟ',
        'Living room และห้องนอนแยกสัดส่วน เชื่อมต่อระเบียงกว้าง รับแสงธรรมชาติผ่านประตูกระจกบานใหญ่',
      ],
      facilities: [
        { name: 'Lobby Lounge',      imageId: OKA_HAUS_IMG.lobbyLounge,     description: 'ล็อบบี้ขนาดใหญ่ สำหรับต้อนรับแขก หรือนั่งพักผ่อน' },
        { name: 'Pool',               imageId: OKA_HAUS_IMG.pool,            description: 'สระว่ายน้ำขนาดใหญ่ พร้อม Hydrotherapy Pool และบ่อ Onsen' },
        { name: "Kid's Area",         imageId: OKA_HAUS_IMG.kidsArea,        description: 'พื้นที่จินตนาการสำหรับเด็กๆ เพื่อเสริมสร้างพัฒนาการที่ดี' },
        { name: 'Exercise Room',      imageId: OKA_HAUS_IMG.exerciseRoom,    description: 'ห้องออกกำลังกายที่มีอุปกรณ์ให้เลือกใช้อย่างครบครัน' },
        { name: 'Co-Working Space',   imageId: OKA_HAUS_IMG.coWorking,       description: 'พร้อม Wi-Fi รองรับการเรียนออนไลน์ หรือ Conference Call' },
        { name: 'Co-Kitchen',         imageId: OKA_HAUS_IMG.coKitchen,       description: 'พื้นที่ครัวส่วนกลางที่พร้อมให้คุณทำได้ทุกเมนู' },
        { name: 'Amphitheater',       imageId: OKA_HAUS_IMG.amphitheater,    description: 'พื้นที่พักผ่อนดูหนังกลางแจ้ง พร้อมที่นั่งแบบไล่ระดับเหมือนในโรงหนัง' },
        { name: 'Rooftop Garden',     imageId: OKA_HAUS_IMG.rooftopGarden,   description: 'พื้นที่สีเขียวเพื่อการพักผ่อนท่ามกลางความร่มรื่น' },
        { name: 'Sansiri Backyard',   imageId: OKA_HAUS_IMG.sansiriBackyard, description: 'พื้นที่ปลูกพืชผักสวนครัวที่ลูกบ้านสามารถเก็บไปประกอบอาหารได้' },
        { name: 'Steam Room',         description: 'ห้องอบไอน้ำ ช่วยผ่อนคลายความเครียดและกล้ามเนื้อ' },
        { name: 'Shuttle Service',    description: 'บริการรถรับ-ส่งระหว่างโครงการ และ BTS สถานีทองหล่อ' },
      ],
      innovations: [
        { name: 'Smart Access',            description: 'เปิดประตูรับเพื่อนได้ง่ายๆ ด้วยการส่ง QR Code' },
        { name: 'EV Charger',              description: 'จุดบริการชาร์จแบตเตอรี่สำหรับรถยนต์พลังงานไฟฟ้า' },
        { name: 'Smart Locker',            description: 'รับพัสดุได้ตลอด 24 ชั่วโมง ปลดล็อคด้วยระบบ QR Code' },
        { name: 'OSIM uInfinity Luxe',     description: 'เก้าอี้นวดไฟฟ้า พร้อมหูฟัง Bluetooth Marshall' },
        { name: 'Facility Booking',        description: 'ระบบจองพื้นที่ส่วนกลางผ่านมือถือ พร้อมแจ้งเตือน' },
        { name: 'Trendy Wash',             description: 'เครื่องซักผ้า-อบผ้าแจ้งเตือนผ่าน Kuhu Application' },
        { name: 'Smart Mail Box',          description: 'ระบบแจ้งเตือนรับจดหมาย ปลดล็อคด้วย QR Code' },
        { name: 'Omni-Light',              imageId: OKA_HAUS_IMG.omniLight,  description: 'เสาไฟฟ้าผลิตแสงสว่างจาก Solar Cell และ Wind Turbine' },
        { name: 'Dialog Oven (Miele)',     description: 'เตาอบ Automatic Program ปรับอุณหภูมิและเวลาอัตโนมัติ' },
        { name: 'Home Automation',         description: 'ควบคุมเครื่องใช้ไฟฟ้าภายในห้องผ่าน Application' },
      ],
    },
    en: {
      summary: [
        'Prime location on Rama 4 Road, connecting to Sukhumvit, Sathorn and Silom — close to BTS and the expressway, and near major office districts and top hangout spots.',
        'A range of unit types to suit everyone — whether you live alone, as a couple, or as a family.',
        'The most comprehensive facilities, catering to every lifestyle.',
        'Cutting-edge innovations covering every aspect of daily living.',
      ],
      location: {
        imageId: OKA_HAUS_IMG.location,
        description: 'OKA HAUS Sukhumvit 36 sits on a highly strategic location, fronting the main Rama 4 Road near Maleenont Tower. Besides the entrance via Sukhumvit Soi 36, residents can also cut through Sukhumvit Soi 26 and 38 straight to BTS Thong Lo station, just about 1.3 km away — and for regular BTS commuters, the project also runs a shuttle service. It’s also close to the Chalerm Maha Nakhon and Arjanrongsang expressways, giving quick connections to Chatuchak, Rama 3, Bang Na and Ram Intra.',
        nearby: [
          { name: 'Maleenont Tower', distance: '450 m' },
          { name: 'Bangkok University', distance: '1.3 km' },
          { name: 'K Village', distance: '900 m' },
          { name: 'Queen Sirikit National Convention Center', distance: '3 km' },
          { name: 'Gateway Ekkamai', distance: '1.5 km' },
          { name: 'Major Cineplex Ekkamai', distance: '2.1 km' },
          { name: 'Suan Plern Market', distance: '400 m' },
          { name: 'Tesco Lotus Rama 4', distance: '1.6 km' },
          { name: 'Big C Rama 4', distance: '750 m' },
          { name: 'Kluaynamthai Hospital', distance: '1.6 km' },
          { name: 'Sukhumvit Hospital', distance: '1.9 km' },
          { name: 'Green Tower', distance: '1 km' },
          { name: 'Sirinrat Building', distance: '1.3 km' },
        ],
      },
      design: {
        imageId: OKA_HAUS_IMG.design,
        description: 'The word ‘oka’ means ‘mountain’ in Japanese, so oka HAUS Sukhumvit 36 was designed with nature at its core, under the RETREAT & REBOUND concept — drawing inspiration from mountains, breezes and sunlight for both the units and the common areas, giving hardworking professionals a place to truly unwind after a long day. The project is a 47-storey high-rise condominium with 1,178 units in total.',
        floorBreakdown: [
          { label: 'Floor 1',     description: 'Project lobby, with an Educational Playground for children’s development' },
          { label: 'Floors 1-7',  description: 'Parking' },
          { label: 'Floor 8',     description: 'Residential units and the project’s main facilities' },
          { label: 'Floors 9-46', description: 'Full-floor residential units, except floor 22 which is a garden and viewpoint' },
          { label: 'Floor 47',    description: 'Top-floor residences and Sky Facilities' },
          { label: 'Rooftop',     description: 'Viewpoint over the Chao Phraya River bend, with an outdoor cinema area and Sansiri Backyard vegetable plots' },
        ],
      },
      unitTypes: [
        { label: '1 Bedroom',                 sizeRange: '26.5–34.75 sqm' },
        { label: '2 Bedroom',                 sizeRange: '40.5–49.50 sqm' },
        { label: '3 Bedroom, 2 Bathroom',     sizeRange: '86.25–86.5 sqm' },
      ],
      unitHighlights: [
        'igloohome Digital Door Lock — usable with a physical key, PIN code, or the app',
        'Entryway space for a shoe cabinet, with an optional built-in furniture package',
        'Separated wet/dry bathroom zones, handheld shower and rain shower, automatic COTTO toilet',
        'Fully equipped pantry with a 2-burner TEKA electric stove and an externally-vented range hood',
        'Under-counter storage divided into small drawers, plus a slot for a microwave',
        'Separate living room and bedroom, connected to a wide balcony with natural light through large glass doors',
      ],
      facilities: [
        { name: 'Lobby Lounge',    imageId: OKA_HAUS_IMG.lobbyLounge,     description: 'A spacious lobby for welcoming guests or relaxing' },
        { name: 'Pool',            imageId: OKA_HAUS_IMG.pool,            description: 'A large swimming pool with a hydrotherapy pool and onsen' },
        { name: "Kid's Area",      imageId: OKA_HAUS_IMG.kidsArea,        description: 'An imaginative play area for children to support healthy development' },
        { name: 'Exercise Room',   imageId: OKA_HAUS_IMG.exerciseRoom,    description: 'A fully equipped fitness room with a wide range of equipment' },
        { name: 'Co-Working Space', imageId: OKA_HAUS_IMG.coWorking,      description: 'With Wi-Fi, supporting online classes or conference calls' },
        { name: 'Co-Kitchen',      imageId: OKA_HAUS_IMG.coKitchen,       description: 'A communal kitchen space ready for any recipe' },
        { name: 'Amphitheater',    imageId: OKA_HAUS_IMG.amphitheater,    description: 'An outdoor movie-watching area with tiered, cinema-style seating' },
        { name: 'Rooftop Garden',  imageId: OKA_HAUS_IMG.rooftopGarden,   description: 'A green space for relaxing amid lush surroundings' },
        { name: 'Sansiri Backyard', imageId: OKA_HAUS_IMG.sansiriBackyard, description: 'A vegetable garden where residents can harvest ingredients for cooking' },
        { name: 'Steam Room',      description: 'A steam room that helps relieve stress and muscle tension' },
        { name: 'Shuttle Service', description: 'Shuttle service between the project and BTS Thong Lo station' },
      ],
      innovations: [
        { name: 'Smart Access',        description: 'Easily let guests in by sending them a QR code' },
        { name: 'EV Charger',          description: 'Charging points for electric vehicles' },
        { name: 'Smart Locker',        description: 'Receive parcels 24 hours a day, unlocked via QR code' },
        { name: 'OSIM uInfinity Luxe', description: 'Electric massage chair with Marshall Bluetooth headphones' },
        { name: 'Facility Booking',    description: 'Book common facilities via mobile with reminder notifications' },
        { name: 'Trendy Wash',         description: 'Washer-dryers with notifications via the Kuhu app' },
        { name: 'Smart Mail Box',      description: 'Mail notification system, unlocked via QR code' },
        { name: 'Omni-Light',          imageId: OKA_HAUS_IMG.omniLight, description: 'Lamp posts generating light from solar cells and wind turbines' },
        { name: 'Dialog Oven (Miele)', description: 'Oven with automatic programs that adjust temperature and time' },
        { name: 'Home Automation',     description: 'Control in-unit appliances via the app' },
      ],
    },
    zh: {
      summary: [
        '地段优越的Rama 4路公寓，连接素坤逸、沙吞和是隆，靠近BTS和高速公路，邻近主要办公区和热门聚会场所。',
        '多种户型可选，无论单身、情侣还是家庭居住都能满足需求。',
        '配套设施最为齐全，满足各种生活方式。',
        '尖端科技创新，涵盖生活的方方面面。',
      ],
      location: {
        imageId: OKA_HAUS_IMG.location,
        description: 'OKA HAUS 素坤逸36巷坐落于极具潜力的地段，紧邻Rama 4大路和玛琳暖大厦(Maleenont Tower)。除了可经素坤逸36巷出入外，还可经素坤逸26巷和38巷抄近路直达BTS通罗站，车程仅约1.3公里；对于经常搭乘BTS的住户，项目还提供班车接送服务。此外还靠近Chalerm Maha Nakhon高速公路和Arjanrongsang高速公路，可快速连接恰图恰、Rama 3路、曼谷那和蓝英拉区。',
        nearby: [
          { name: '玛琳暖大厦', distance: '450米' },
          { name: '曼谷大学', distance: '1.3公里' },
          { name: 'K Village', distance: '900米' },
          { name: '诗丽吉王后国家会议中心', distance: '3公里' },
          { name: 'Gateway Ekkamai商场', distance: '1.5公里' },
          { name: 'Major Cineplex Ekkamai影院', distance: '2.1公里' },
          { name: 'Suan Plern市场', distance: '400米' },
          { name: 'Tesco Lotus Rama 4店', distance: '1.6公里' },
          { name: 'Big C Rama 4店', distance: '750米' },
          { name: 'Kluaynamthai医院', distance: '1.6公里' },
          { name: '素坤逸医院', distance: '1.9公里' },
          { name: 'Green Tower大厦', distance: '1公里' },
          { name: 'Sirinrat大厦', distance: '1.3公里' },
        ],
      },
      design: {
        imageId: OKA_HAUS_IMG.design,
        description: '「oka」在日语中意为「山」，因此oka HAUS素坤逸36巷以自然为设计核心，秉持RETREAT & REBOUND（静养与复原）理念，从山峦、微风与阳光中汲取灵感，运用于住宅单位与公共空间的设计之中，让辛勤工作的都市人在忙碌一天后能彻底放松身心。项目为47层高层公寓，共1,178个单位。',
        floorBreakdown: [
          { label: '1楼',     description: '项目大堂，配有寓教于乐的儿童游乐区' },
          { label: '1-7楼',   description: '停车场' },
          { label: '8楼',     description: '住宅单位及项目主要配套设施' },
          { label: '9-46楼',  description: '整层住宅单位，第22层除外，该层为花园及观景区' },
          { label: '47楼',    description: '顶层住宅及空中设施' },
          { label: '屋顶层',  description: '俯瞰昭披耶河弯景观台，配有露天影院区及Sansiri Backyard菜园' },
        ],
      },
      unitTypes: [
        { label: '1居室',   sizeRange: '26.5–34.75平方米' },
        { label: '2居室',   sizeRange: '40.5–49.50平方米' },
        { label: '3居室2卫', sizeRange: '86.25–86.5平方米' },
      ],
      unitHighlights: [
        'igloohome智能电子门锁，支持钥匙、密码及App开锁',
        '门口预留鞋柜空间，可选购内置家具套装',
        '干湿分离卫浴，手持花洒与花洒淋浴，COTTO自动马桶',
        '全套厨房设备，TEKA双头电磁炉，配备外排式抽油烟机',
        '台面下储物柜分隔为小抽屉，并预留微波炉摆放位置',
        '客厅与卧室独立分区，连接宽敞阳台，大面积玻璃门引入自然采光',
      ],
      facilities: [
        { name: 'Lobby Lounge',    imageId: OKA_HAUS_IMG.lobbyLounge,     description: '宽敞大堂，用于接待访客或休憩' },
        { name: 'Pool',            imageId: OKA_HAUS_IMG.pool,            description: '大型泳池，配有水疗池及温泉池' },
        { name: "Kid's Area",      imageId: OKA_HAUS_IMG.kidsArea,        description: '富有想象力的儿童活动区，促进健康发展' },
        { name: 'Exercise Room',   imageId: OKA_HAUS_IMG.exerciseRoom,    description: '设备齐全的健身房' },
        { name: 'Co-Working Space', imageId: OKA_HAUS_IMG.coWorking,      description: '配备Wi-Fi，支持在线学习或视频会议' },
        { name: 'Co-Kitchen',      imageId: OKA_HAUS_IMG.coKitchen,       description: '共享厨房空间，可烹饪各类料理' },
        { name: 'Amphitheater',    imageId: OKA_HAUS_IMG.amphitheater,    description: '户外观影休闲区，配有阶梯式影院座椅' },
        { name: 'Rooftop Garden',  imageId: OKA_HAUS_IMG.rooftopGarden,   description: '绿意盎然的休闲空间' },
        { name: 'Sansiri Backyard', imageId: OKA_HAUS_IMG.sansiriBackyard, description: '蔬菜种植区，住户可采摘食材用于烹饪' },
        { name: 'Steam Room',      description: '蒸汽室，有助于缓解压力和肌肉紧张' },
        { name: 'Shuttle Service', description: '项目与BTS通罗站之间的班车接送服务' },
      ],
      innovations: [
        { name: 'Smart Access',        description: '通过发送二维码轻松为访客开门' },
        { name: 'EV Charger',          description: '电动汽车充电服务点' },
        { name: 'Smart Locker',        description: '24小时收取包裹，通过二维码系统解锁' },
        { name: 'OSIM uInfinity Luxe', description: '电动按摩椅，配备Marshall蓝牙耳机' },
        { name: 'Facility Booking',    description: '通过手机预订公共设施，并提供提醒通知' },
        { name: 'Trendy Wash',         description: '洗衣烘干机，通过Kuhu App发送通知' },
        { name: 'Smart Mail Box',      description: '邮件提醒系统，通过二维码解锁' },
        { name: 'Omni-Light',          imageId: OKA_HAUS_IMG.omniLight, description: '利用太阳能电池板和风力发电的路灯' },
        { name: 'Dialog Oven (Miele)', description: '自动程序烤箱，自动调节温度与时间' },
        { name: 'Home Automation',     description: '通过App控制房内电器' },
      ],
    },
  },
};

const BUILDING_DETAILS_BY_NORMALIZED: Record<string, Partial<Record<Locale, BuildingProjectDetails>>> = Object.fromEntries(
  Object.entries(BUILDING_DETAILS).map(([name, data]) => [normalizeName(name), data])
);

export function getBuildingDetails(name: string, locale: Locale = 'en'): BuildingProjectDetails | null {
  const byLocale = BUILDING_DETAILS_BY_NORMALIZED[normalizeName(name)];
  if (!byLocale) return null;
  return byLocale[locale] ?? byLocale.en ?? null;
}

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
  const bdata = getBuildingData(projectName);
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

const UNIT_LABEL_I18N: Record<Locale, { studio: string; unit: string; sqm: string; bedrooms: (n: number) => string }> = {
  en: { studio: 'Studio', unit: 'Unit', sqm: 'sqm', bedrooms: n => n === 1 ? '1 Bedroom' : `${n} Bedrooms` },
  th: { studio: 'สตูดิโอ', unit: 'ยูนิต', sqm: 'ตร.ม.', bedrooms: n => `${n} ห้องนอน` },
  zh: { studio: '开间', unit: '房源', sqm: '平方米', bedrooms: n => `${n}居室` },
};

export function unitLabel(unitType: string, unit: string, area?: string | number, locale: Locale = 'en'): string {
  const dict = UNIT_LABEL_I18N[locale];
  const l = String(unitType ?? '').toLowerCase().trim();
  if (l && l !== 'n/a') {
    if (l === 'studio') return dict.studio;
    const m = l.match(/^(\d+)b/);
    if (m) return dict.bedrooms(parseInt(m[1]));
    return unitType;
  }
  const d = parseInt(String(unit ?? '').charAt(0));
  if (d >= 1 && d <= 9) return dict.bedrooms(d);
  if (area) return `${area} ${dict.sqm}`;
  return dict.unit;
}

const DIRECTION_I18N: Record<Locale, Record<string, string>> = {
  en: { N: 'North Facing', S: 'South Facing', E: 'East Facing', W: 'West Facing', NE: 'Northeast Facing', NW: 'Northwest Facing', SE: 'Southeast Facing', SW: 'Southwest Facing' },
  th: { N: 'ทิศเหนือ', S: 'ทิศใต้', E: 'ทิศตะวันออก', W: 'ทิศตะวันตก', NE: 'ทิศตะวันออกเฉียงเหนือ', NW: 'ทิศตะวันตกเฉียงเหนือ', SE: 'ทิศตะวันออกเฉียงใต้', SW: 'ทิศตะวันตกเฉียงใต้' },
  zh: { N: '朝北', S: '朝南', E: '朝东', W: '朝西', NE: '朝东北', NW: '朝西北', SE: '朝东南', SW: '朝西南' },
};

/** `code` is the raw compass code stored on Property.direction (see parseDirection in sheets.ts). */
export function directionLabel(code: string, locale: Locale = 'en'): string {
  if (!code) return '';
  return DIRECTION_I18N[locale][code.toUpperCase()] ?? code;
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

/**
 * Google serves Drive files through two different (undocumented, inconsistently
 * reliable) endpoints. Either one can fail for a given file/moment even when the file
 * is shared "Anyone with the link" — so every <img> using this should also wire up
 * `driveImgOnError` to retry the other endpoint before giving up.
 */
export function driveImageUrl(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
}

function driveImageUrlAlt(fileId: string): string {
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}

export function extractDriveFileId(url: string): string {
  return (url.match(/[?&]id=([a-zA-Z0-9_-]+)/) ?? url.match(/\/d\/([a-zA-Z0-9_-]+)/))?.[1] ?? '';
}

/** onError handler for <img> tags rendering a driveImageUrl() src: swaps to the alternate endpoint once, then gives up. */
export function driveImgOnError(e: SyntheticEvent<HTMLImageElement>): void {
  const img = e.currentTarget;
  if (img.dataset.driveFallback) return;
  const id = extractDriveFileId(img.src);
  if (!id) return;
  img.dataset.driveFallback = '1';
  img.src = img.src.includes('drive.google.com/thumbnail') ? driveImageUrlAlt(id) : driveImageUrl(id);
}

function preloadImage(url: string): Promise<boolean> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload  = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

/** For CSS background-image previews (no onError available): resolves to whichever endpoint actually loads, or '' if neither does. */
export async function resolveDriveImageUrl(fileId: string): Promise<string> {
  const primary = driveImageUrl(fileId);
  if (await preloadImage(primary)) return primary;
  const alt = driveImageUrlAlt(fileId);
  if (await preloadImage(alt)) return alt;
  return '';
}
