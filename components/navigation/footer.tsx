import Link from 'next/link';
import { Icons } from '@/components/ui/icons';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/JuanDls01',
    icon: Icons.Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/juanidlsdev',
    icon: Icons.Linkedin,
  },
  {
    name: 'X',
    href: 'https://x.com/JuanDls01',
    icon: Icons.Twitter,
  },
] as const;

export function Footer() {
  return (
    <footer className='bg-primary/80 text-primary-foreground fixed right-0 bottom-0 left-0 z-50 flex h-6 items-center justify-center px-4 backdrop-blur-sm'>
      <div className='flex items-center gap-4'>
        <span className='font-mono text-xs'>
          Creado por el Maestro{' '}
          <Link
            href='https://github.com/JuanDls01'
            target='_blank'
            className='font-bold underline underline-offset-2 transition-opacity hover:opacity-80'
          >
            JuanDls01
          </Link>
        </span>

        <div className='flex items-center gap-2'>
          {SOCIAL_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
              className='transition-opacity hover:opacity-70'
              aria-label={link.name}
            >
              <link.icon className='size-3.5' />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
