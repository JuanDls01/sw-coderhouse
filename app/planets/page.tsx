import { Suspense } from 'react';

import { Pagination } from '@/components/pagination';
import { PlanetCard } from '@/components/planets/planet-card';
import { SearchInput } from '@/components/search-input';
import { Typography } from '@/components/ui/typography';
import { FetchOptions, fetchResource, PaginatedResponse, RESOURCE } from '@/lib/swapi';
import { Planet } from '@/types/planet';

export async function getPlanets(options: FetchOptions = {}): Promise<PaginatedResponse<Planet>> {
  return fetchResource<Planet>(RESOURCE.PLANETS, options);
}

interface PlanetsPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function PlanetsPage({ searchParams }: PlanetsPageProps) {
  const { page, search } = await searchParams;
  const currentPage = Number(page) || 1;

  const { results: planets, count } = await getPlanets({
    page: currentPage,
    search,
  });

  return (
    <main className='container mb-10'>
      <Typography variant={'h1'} className='my-6'>
        Mundos del Borde Exterior
      </Typography>

      <Suspense fallback={null}>
        <SearchInput placeholder='Buscar planetas...' className='mb-6 max-w-md' />
      </Suspense>

      {planets.length === 0 ? (
        <p className='text-muted-foreground py-10 text-center'>
          No se encontraron planetas
          {search ? ` para "${search}"` : ''}.
        </p>
      ) : (
        <>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
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

          <Suspense fallback={null}>
            <Pagination totalItems={count} className='mt-8' />
          </Suspense>
        </>
      )}
    </main>
  );
}
