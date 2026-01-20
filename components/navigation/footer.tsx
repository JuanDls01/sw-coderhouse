import Link from "next/link";
import { Icons, type Icon } from "@/components/ui/icons";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/JuanDls01",
    icon: Icons.Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/juanidlsdev",
    icon: Icons.Linkedin,
  },
  {
    name: "X",
    href: "https://x.com/JuanDls01",
    icon: Icons.Twitter,
  },
] as const;

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-6 bg-primary/80 text-primary-foreground flex items-center justify-center px-4 z-50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono">
          Creado por el Maestro{" "}
          <Link
            href="https://github.com/JuanDls01"
            target="_blank"
            className="font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            JuanDls01
          </Link>
        </span>

        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label={link.name}
            >
              <link.icon className="size-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
