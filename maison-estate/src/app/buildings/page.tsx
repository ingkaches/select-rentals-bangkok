import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BuildingsGrid from './BuildingsGrid';
import { fetchProperties } from '@/lib/sheets';
import { BUILDING_DATA, getAreaGroup } from '@/lib/buildings';

export const metadata: Metadata = {
  title: 'Our Buildings — Select Rentals Bangkok',
  description: 'Browse all Sansiri buildings in Bangkok. Verified condos in Thonglor, Ekkamai, Sukhumvit, Rama 9 and more.',
};

export default async function BuildingsPage() {
  const properties = await fetchProperties().catch(() => []);

  // Group by building
  const buildingMap = new Map<string, { count: number; driveUrl: string }>();
  for (const p of properties) {
    const existing = buildingMap.get(p.project);
    if (existing) {
      existing.count++;
      if (!existing.driveUrl && p.driveUrl) existing.driveUrl = p.driveUrl;
    } else {
      buildingMap.set(p.project, { count: 1, driveUrl: p.driveUrl });
    }
  }

  const buildings = Array.from(buildingMap.entries()).map(([name, { count, driveUrl }]) => {
    const bdata = BUILDING_DATA[name] ?? null;
    return {
      name,
      count,
      driveUrl,
      district: bdata?.district ?? '',
      bts:      bdata?.bts      ?? '',
      floors:   bdata?.floors   ?? null,
      year:     bdata?.year     ?? null,
      area:     getAreaGroup(name),
    };
  }).sort((a, b) => b.count - a.count);

  return (
    <>
      <Navbar />
      <main>
        <BuildingsGrid buildings={buildings} />
      </main>
      <Footer />
    </>
  );
}
