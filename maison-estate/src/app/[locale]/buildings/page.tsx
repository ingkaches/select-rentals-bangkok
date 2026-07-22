import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BuildingsGrid from './BuildingsGrid';
import { fetchProperties } from '@/lib/sheets';
import { getBuildingData, getAreaGroup } from '@/lib/buildings';
import type { Locale } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Our Buildings — Select Rentals Bangkok',
  description: 'Browse all Sansiri buildings in Bangkok. Verified condos in Thonglor, Ekkamai, Sukhumvit, Rama 9 and more.',
};

export default async function BuildingsPage({ params: { locale } }: { params: { locale: string } }) {
  const properties = await fetchProperties().catch(() => []);

  // Group by building
  const buildingMap = new Map<string, number>();
  for (const p of properties) {
    buildingMap.set(p.project, (buildingMap.get(p.project) ?? 0) + 1);
  }

  const buildings = Array.from(buildingMap.entries()).map(([name, count]) => {
    const bdata = getBuildingData(name, locale as Locale);
    return {
      name,
      count,
      driveUrl: bdata?.photosUrl ?? '',
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
