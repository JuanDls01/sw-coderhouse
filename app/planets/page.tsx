import { PlanetCard } from "@/components/planets/planet-card";
import { Typography } from "@/components/ui/typography";
import { Planet } from "@/types/planet";
import { SWAPI_URL } from "@/utils/consts";

const getPlanets = async () => {
  const res = await fetch(`${SWAPI_URL}/planets`);
  const data: Planet[] = await res.json();
  return data;
};

export default async function PlanetsPage() {
  const planets = await getPlanets();
  return (
    <main className="container mb-10">
      <Typography variant={"h1"} className="my-6">
        Mundos del Borde Exterior
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {planets.map((planet) => (
          <PlanetCard
            key={planet.url}
            name={planet.name}
            climate={planet.climate}
            gravity={planet.gravity}
            population={planet.population}
            terrain={planet.terrain}
          />
        ))}
      </div>
    </main>
  );
}
