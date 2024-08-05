'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Dashboard', href: '/' },
  // { label: 'Tickets', href: { pathname: '/tickets', query: { page: 1 } } },
  { label: 'Tickets', href: '/tickets' },
  { label: 'Users', href: '/users' },
];

function MainNavLinks() {
  const currentPath = usePathname();

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.label}
          className={`navbar-link ${currentPath === link.href && 'cursor-default text-primary/70 hover:text-primary/60'}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default MainNavLinks;
