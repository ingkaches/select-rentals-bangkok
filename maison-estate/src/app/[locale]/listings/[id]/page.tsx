import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProperties } from '@/lib/sheets';
import { getBuildingData, unitLabel, directionLabel } from '@/lib/buildings';
import type { Locale } from '@/lib/types';
import ListingDetailClient from './ListingDetailClient';

type Props = { params: Promise<{ id: string; locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const properties = await fetchProperties().catch(() => []);
  const [project, unit] = decodeURIComponent(id).split('|');
  const prop = properties.find(p => p.project === project && p.unit === unit);
  if (!prop) return { title: 'Listing Not Found — Select Rentals Bangkok' };

  const price = Number(prop.price);
  const label = unitLabel(prop.unitType, prop.unit, prop.area);
  return {
    title: `${label} at ${prop.project} — Select Rentals Bangkok`,
    description: `${prop.unitType} for rent at ${prop.project}. ${prop.area} sqm, ฿${price.toLocaleString('th-TH')}/mo. No tenant fees. Book a free viewing today.`,
    openGraph: {
      title: `${prop.project} — ${label}`,
      description: `฿${price.toLocaleString('th-TH')}/mo · ${prop.area} sqm · ${directionLabel(prop.direction) || 'Bangkok'}`,
      type: 'website',
    },
  };
}

export default async function ListingDetailPage({ params }: Props) {
  const { id, locale } = await params;
  const properties = await fetchProperties().catch(() => []);
  const [project, unit] = decodeURIComponent(id).split('|');
  const prop = properties.find(p => p.project === project && p.unit === unit);

  if (!prop) notFound();

  const bdata = getBuildingData(prop.project, locale as Locale);
  const related = properties
    .filter(p => p.project === prop.project && p.unit !== prop.unit)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <ListingDetailClient prop={prop} bdata={bdata} related={related} />
      </main>
      <Footer />
    </>
  );
}
