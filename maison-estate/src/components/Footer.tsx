import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-logo">Select Rentals BKK</div>
      <p className="footer-text">© {new Date().getFullYear()} Select Rentals Bangkok. No service fees for tenants.</p>
      <nav className="footer-links">
        <Link href="/listings">Listings</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </footer>
  );
}
