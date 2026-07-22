import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectDetail from './ProjectDetail';
import { getBuildingData, getBuildingDetails, getBldgMeta } from '@/lib/buildings';
import type { Locale } from '@/lib/types';

interface Props { params: { slug: string; locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = decodeURIComponent(params.slug);
  return {
    title: `${name} — Project Details — Select Rentals Bangkok`,
    description: `Location, design, unit types and facilities at ${name}.`,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const name    = decodeURIComponent(params.slug);
  const locale  = params.locale as Locale;
  const details = getBuildingDetails(name, locale);

  if (!details) notFound();

  const bdata = getBuildingData(name, locale);
  const meta  = getBldgMeta(name);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '73px' }}>
        <ProjectDetail name={name} details={details} bdata={bdata} meta={meta} />
      </main>
      <Footer />
    </>
  );
}
