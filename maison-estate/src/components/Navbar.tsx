'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <>
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
          <Link href="/contact" className="nav-cta nav-cta-desktop">Book a Viewing</Link>
          <button
            className={`nav-hamburger${open ? ' open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`nav-mobile-menu${open ? ' open' : ''}`}>
        <ul>
          <li><Link href="/listings">Listings</Link></li>
          <li><Link href="/buildings">Buildings</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <Link href="/contact" className="nav-cta" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
          Book a Viewing
        </Link>
      </div>
    </>
  );
}
