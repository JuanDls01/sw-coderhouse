'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`text-primary pb-1 text-sm tracking-widest uppercase ${
        isActive ? 'border-primary/50 border-b font-bold' : ''
      }`}
    >
      {children}
    </Link>
  );
}
