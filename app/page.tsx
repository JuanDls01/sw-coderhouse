import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { fetchResource, RESOURCE } from "@/lib/swapi";

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
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-6 py-12">
      <div className="flex flex-col items-center gap-8 max-w-2xl text-center">
        <Image
          src="/starwars.png"
          alt="Star Wars Logo"
          width={400}
          height={170}
          priority
        />

        <Typography variant="h1" className="text-primary">
          Explora la Galaxia
        </Typography>

        <Typography className="text-muted-foreground text-lg">
          Descubre personajes, naves estelares y planetas del universo de Star
          Wars. Una galaxia muy, muy lejana te espera.
        </Typography>

        <div className="grid grid-cols-3 gap-6 mt-8 w-full">
          <StatCard
            label="Personajes"
            value={stats.characters}
            href="/characters"
          />
          <StatCard label="Naves" value={stats.starships} href="/starships" />
          <StatCard label="Planetas" value={stats.planets} href="/planets" />
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm transition-colors hover:border-primary hover:bg-card/80"
    >
      <span className="text-4xl font-bold text-primary font-mono">{value}</span>
      <span className="text-sm text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </Link>
  );
}
