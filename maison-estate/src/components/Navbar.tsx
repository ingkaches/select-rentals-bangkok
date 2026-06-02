'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className="site-nav">
      <Link href="/" className="nav-logo">
        Select <span>Rentals</span> BKK
      </Link>
      <ul className="nav-links">
        <li><Link href="/listings"  className={path.startsWith('/listings')  ? 'active' : ''}>Listings</Link></li>
        <li><Link href="/buildings" className={path.startsWith('/buildings') ? 'active' : ''}>Buildings</Link></li>
        <li><Link href="/about"     className={path === '/about'             ? 'active' : ''}>About</Link></li>
        <li><Link href="/contact"   className={path === '/contact'           ? 'active' : ''}>Contact</Link></li>
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/contact" className="nav-cta">Book a Viewing</Link>
      </div>
    </nav>
  );
}
