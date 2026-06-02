import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BuildingDetail from './BuildingDetail';
import { fetchProperties } from '@/lib/sheets';
import { BUILDING_DATA, getBldgMeta } from '@/lib/buildings';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = decodeURIComponent(params.slug);
  return {
    title: `${name} — Select Rentals Bangkok`,
    description: `Browse available units at ${name}. Verified Sansiri property in Bangkok.`,
  };
}

export default async function BuildingPage({ params }: Props) {
  const name = decodeURIComponent(params.slug);
  const properties = await fetchProperties().catch(() => []);
  const rooms = properties.filter(p => p.project === name);

  if (!rooms.length) notFound();

  const bdata = BUILDING_DATA[name] ?? null;
  const meta  = getBldgMeta(name);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '73px' }}>
        <BuildingDetail name={name} rooms={rooms} bdata={bdata} meta={meta} />
      </main>
      <Footer />
    </>
  );
}
