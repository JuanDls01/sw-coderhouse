'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { NAV_LINKS } from '@/utils/consts';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className='flex h-9 w-9 items-center justify-center md:hidden' aria-label='Abrir menú'>
          <Menu className='h-5 w-5' />
        </button>
      </SheetTrigger>
      <SheetContent side='right' className='bg-background w-70'>
        <SheetHeader>
          <SheetTitle className='sr-only'>Menú de navegación</SheetTitle>
        </SheetHeader>
        <nav className='flex flex-col gap-6 px-4'>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`font-roboto-mono text-sm tracking-widest uppercase ${
                isActive(link.href) ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
