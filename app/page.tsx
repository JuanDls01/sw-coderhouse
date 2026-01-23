import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/ui/icons';
import { Typography } from '@/components/ui/typography';
import { fetchResource, RESOURCE } from '@/lib/swapi';

export async function getAllCounts() {
  const [characters, planets, starships] = await Promise.all([
    fetchResource(RESOURCE.PEOPLE, {}),
    fetchResource(RESOURCE.PLANETS, {}),
    fetchResource(RESOURCE.STARSHIPS, {}),
  ]);

  return {
    characters: characters.count,
    planets: planets.count,
    starships: starships.count,
  };
}

export default async function Home() {
  const stats = await getAllCounts();

  return (
    <main className='flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-6 py-12'>
      <div className='flex max-w-2xl flex-col items-center gap-8 text-center'>
        <Image src='/starwars.png' alt='Star Wars Logo' width={400} height={170} priority />

        <Typography variant='h1' className='text-primary'>
          Explora la Galaxia
        </Typography>

        <Typography className='text-muted-foreground text-lg'>
          Descubre personajes, naves estelares y planetas del universo de Star Wars. Una galaxia muy, muy
          lejana te espera.
        </Typography>

        <div className='mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6'>
          <StatCard label='Personajes' value={stats.characters} href='/characters' />
          <StatCard label='Naves' value={stats.starships} href='/starships' />
          <StatCard label='Planetas' value={stats.planets} href='/planets' />
        </div>

        {/* CTAs */}
        <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
          <Link
            href='/chat'
            className='group border-primary/30 bg-primary/5 hover:border-primary hover:bg-primary/10 hover:shadow-primary/20 flex flex-1 items-center gap-4 rounded-lg border px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'
          >
            <div className='border-primary/40 bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border'>
              <Icons.MessageCircle className='text-primary size-5' />
            </div>
            <div className='flex flex-col items-start'>
              <span className='text-foreground text-sm font-medium'>Consulta el Holocron</span>
              <span className='text-muted-foreground text-xs'>Pregunta sobre el universo Star Wars</span>
            </div>
            <Icons.ChevronRight className='text-primary/60 ml-auto size-5 transition-transform group-hover:translate-x-1' />
          </Link>

          <Link
            href='/transform'
            className='group border-primary/30 bg-primary/5 hover:border-primary hover:bg-primary/10 hover:shadow-primary/20 flex flex-1 items-center gap-4 rounded-lg border px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'
          >
            <div className='border-primary/40 bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border'>
              <Icons.Sparkles className='text-primary size-5' />
            </div>
            <div className='flex flex-col items-start'>
              <span className='text-foreground text-sm font-medium'>Holocreador</span>
              <span className='text-muted-foreground text-xs'>Transfórmate en personaje Star Wars</span>
            </div>
            <Icons.ChevronRight className='text-primary/60 ml-auto size-5 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link
      href={href}
      className='group border-border bg-card/50 hover:border-primary hover:bg-card/80 hover:shadow-primary/10 flex flex-col items-center gap-2 rounded-lg border p-6 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'
    >
      <span className='text-primary font-mono text-4xl font-bold'>{value}</span>
      <span className='text-muted-foreground text-sm tracking-wider uppercase'>{label}</span>
      <span className='text-muted-foreground/70 group-hover:text-primary flex items-center gap-1 text-xs transition-colors'>
        Ver listado
        <Icons.ChevronRight className='size-3 transition-transform group-hover:translate-x-0.5' />
      </span>
    </Link>
  );
}
