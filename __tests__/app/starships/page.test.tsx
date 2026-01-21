import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import StarshipsPage from '@/app/starships/page';
import type { Starship } from '@/types/starship';
import type { PaginatedResponse } from '@/lib/swapi';

vi.mock('@/lib/swapi', () => ({
  fetchResource: vi.fn(),
  RESOURCE: { PEOPLE: 'people', PLANETS: 'planets', STARSHIPS: 'starships' },
}));

vi.mock('@/components/starships/starship-card', () => ({
  StarshipCard: ({ name }: { name: string }) => <div data-testid='starship-card'>{name}</div>,
}));

vi.mock('@/components/search-input', () => ({
  SearchInput: () => <div data-testid='search-input' />,
}));

vi.mock('@/components/pagination', () => ({
  Pagination: () => <div data-testid='pagination' />,
}));

vi.mock('@/components/ui/typography', () => ({
  Typography: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
}));

import { fetchResource } from '@/lib/swapi';

const mockFetchResource = vi.mocked(fetchResource);

describe('StarshipsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show empty message when no starships are returned', async () => {
    mockFetchResource.mockResolvedValueOnce({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });

    const searchParams = Promise.resolve({ page: '1' });
    const jsx = await StarshipsPage({ searchParams });
    render(jsx);

    expect(screen.getByText('No se encontraron naves.')).toBeInTheDocument();
    expect(screen.queryByTestId('starship-card')).not.toBeInTheDocument();
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  it('should show empty message with search term when search returns no results', async () => {
    mockFetchResource.mockResolvedValueOnce({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });

    const searchParams = Promise.resolve({ page: '1', search: 'unknown' });
    const jsx = await StarshipsPage({ searchParams });
    render(jsx);

    expect(screen.getByText('No se encontraron naves para "unknown".')).toBeInTheDocument();
  });

  it('should render starships when data is available', async () => {
    mockFetchResource.mockResolvedValueOnce({
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          name: 'X-wing',
          url: 'https://swapi.dev/api/starships/12/',
          films: [],
        },
        {
          name: 'Millennium Falcon',
          url: 'https://swapi.dev/api/starships/10/',
          films: [],
        },
      ],
    } as unknown as PaginatedResponse<Starship>);

    const searchParams = Promise.resolve({ page: '1' });
    const jsx = await StarshipsPage({ searchParams });
    render(jsx);

    expect(screen.getByText('X-wing')).toBeInTheDocument();
    expect(screen.getByText('Millennium Falcon')).toBeInTheDocument();
    expect(screen.getAllByTestId('starship-card')).toHaveLength(2);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
