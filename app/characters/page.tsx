import { CharacterCard } from "@/components/characters/character-card";
import { Typography } from "@/components/ui/typography";
import { Character } from "@/types/character";
import { SWAPI_URL } from "@/utils/consts";

const getCharacters = async () => {
  const res = await fetch(`${SWAPI_URL}/people`);
  const data: Character[] = await res.json();

  return data;
};

export default async function CharactersPage() {
  const characters = await getCharacters();
  return (
    <main className="container mb-10">
      <Typography variant={"h1"} className="my-6">
        Héroes y Villanos
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {characters.map((character) => (
          <CharacterCard
            key={character.url}
            name={character.name}
            birthYear={character.birth_year}
            films={character.films.length}
            ships={character.starships.length}
            height={character.height}
            mass={character.mass}
            gender={character.gender}
          />
        ))}
      </div>
    </main>
  );
}
