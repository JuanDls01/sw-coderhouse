"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`text-sm uppercase tracking-widest text-primary pb-1 ${
        isActive ? "font-bold border-b border-primary/50" : ""
      }`}
    >
      {children}
    </Link>
  );
}
