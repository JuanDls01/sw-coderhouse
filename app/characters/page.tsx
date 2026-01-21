import { Suspense } from "react";

import { CharacterCard } from "@/components/characters/character-card";
import { Pagination } from "@/components/pagination";
import { SearchInput } from "@/components/search-input";
import { Typography } from "@/components/ui/typography";
import {
  FetchOptions,
  fetchResource,
  PaginatedResponse,
  RESOURCE,
} from "@/lib/swapi";
import { Character } from "@/types/character";

export async function getCharacters(
  options: FetchOptions = {},
): Promise<PaginatedResponse<Character>> {
  return fetchResource<Character>(RESOURCE.PEOPLE, options);
}

interface CharactersPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function CharactersPage({
  searchParams,
}: CharactersPageProps) {
  const { page, search } = await searchParams;
  const currentPage = Number(page) || 1;

  const { results: characters, count } = await getCharacters({
    page: currentPage,
    search,
  });

  return (
    <main className="container mb-10">
      <Typography variant={"h1"} className="my-6">
        Héroes y Villanos
      </Typography>

      <Suspense fallback={null}>
        <SearchInput
          placeholder="Buscar personajes..."
          className="mb-6 max-w-md"
        />
      </Suspense>

      {characters.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">
          No se encontraron personajes
          {search ? ` para "${search}"` : ""}.
        </p>
      ) : (
        <>
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

          <Suspense fallback={null}>
            <Pagination totalItems={count} className="mt-8" />
          </Suspense>
        </>
      )}
    </main>
  );
}
