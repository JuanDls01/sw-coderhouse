import Image from "next/image";
import Link from "next/link";
import { NavLink } from "./nav-link";
import { SaberColorPicker } from "./saber-color-picker";
import { MobileNav } from "./mobile-nav";
import { NAV_LINKS } from "@/utils/consts";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/starwars-small.png"
            alt="Star Wars"
            width={100}
            height={12}
            className="h-3 w-auto"
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 font-roboto-mono md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <SaberColorPicker />
        </div>

        <MobileNav />
      </div>
    </nav>
  );
}
