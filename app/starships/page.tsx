import { Suspense } from 'react';

import { Pagination } from '@/components/pagination';
import { SearchInput } from '@/components/search-input';
import { StarshipCard } from '@/components/starships/starship-card';
import { Typography } from '@/components/ui/typography';
import { FetchOptions, fetchResource, PaginatedResponse, RESOURCE } from '@/lib/swapi';
import { Starship } from '@/types/starship';

export async function getStarships(options: FetchOptions = {}): Promise<PaginatedResponse<Starship>> {
  return fetchResource<Starship>(RESOURCE.STARSHIPS, options);
}

interface StarshipsPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function StarshipsPage({ searchParams }: StarshipsPageProps) {
  const { page, search } = await searchParams;
  const currentPage = Number(page) || 1;

  const { results: starships, count } = await getStarships({
    page: currentPage,
    search,
  });

  return (
    <main className='container mb-10'>
      <Typography variant={'h1'} className='my-6'>
        Flota Galáctica
      </Typography>

      <Suspense fallback={null}>
        <SearchInput placeholder='Buscar naves...' className='mb-6 max-w-md' />
      </Suspense>

      {starships.length === 0 ? (
        <p className='text-muted-foreground py-10 text-center'>
          No se encontraron naves
          {search ? ` para "${search}"` : ''}.
        </p>
      ) : (
        <>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
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

          <Suspense fallback={null}>
            <Pagination totalItems={count} className='mt-8' />
          </Suspense>
        </>
      )}
    </main>
  );
}
