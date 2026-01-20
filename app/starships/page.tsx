import { StarshipCard } from "@/components/starships/starship-card";
import { Typography } from "@/components/ui/typography";

import { Starship } from "@/types/starship";
import { SWAPI_URL } from "@/utils/consts";

const getStarships = async () => {
  const res = await fetch(`${SWAPI_URL}/starships`);
  const data: Starship[] = await res.json();

  return data;
};

export default async function StarshipsPage() {
  const starships = await getStarships();
  return (
    <main className="container mb-10">
      <Typography variant={"h1"} className="my-6">
        Flota Galáctica
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {starships.map((stship) => (
          <StarshipCard
            key={stship.url}
            name={stship.name}
            films={stship.films.length}
            model={stship.model}
            manufacturer={stship.manufacturer}
            length={stship.length}
            maxAtmospheringSpeed={stship.max_atmosphering_speed}
            crew={stship.crew}
            cargoCapacity={stship.cargo_capacity}
            starshipClass={stship.starship_class}
          />
        ))}
      </div>
    </main>
  );
}
