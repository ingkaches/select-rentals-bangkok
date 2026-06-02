import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ListingsClient from './ListingsClient';
import { fetchProperties } from '@/lib/sheets';

export const metadata: Metadata = {
  title: 'All Listings — Select Rentals Bangkok',
  description:
    'Browse all available rental properties in Bangkok. Verified Sansiri apartments, condos in Thonglor, Ekkamai, Sukhumvit. No service fees for tenants.',
};

export default async function ListingsPage() {
  let properties = await fetchProperties().catch(() => []);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '73px' }}>
        <ListingsClient properties={properties} />
      </main>
      <Footer />
    </>
  );
}
