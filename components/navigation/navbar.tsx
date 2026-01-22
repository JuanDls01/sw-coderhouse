import Image from 'next/image';
import Link from 'next/link';
import { NavLink } from './nav-link';
import { SaberColorPicker } from './saber-color-picker';
import { MobileNav } from './mobile-nav';
import { NAV_LINKS, type SaberColor } from '@/utils/consts';

interface NavbarProps {
  initialSaberColor?: SaberColor;
}

export function Navbar({ initialSaberColor }: NavbarProps) {
  return (
    <nav className='border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center'>
          <Image
            src='/starwars-small.png'
            alt='Star Wars'
            width={100}
            height={12}
            className='h-3 w-auto'
            priority
          />
        </Link>

        <div className='font-roboto-mono hidden items-center gap-6 md:flex'>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className='hidden md:block'>
          <SaberColorPicker initialColor={initialSaberColor} />
        </div>

        <MobileNav />
      </div>
    </nav>
  );
}
