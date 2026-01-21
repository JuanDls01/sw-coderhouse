import "server-only";

import { SWAPI_PROVIDERS } from "@/utils/consts";

export const RESOURCE = {
  PEOPLE: "people",
  PLANETS: "planets",
  STARSHIPS: "starships",
} as const;

type Resource = (typeof RESOURCE)[keyof typeof RESOURCE];

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface FetchOptions {
  page?: number;
  search?: string;
}

const ITEMS_PER_PAGE = 10;

async function fetchFromPrimary<T>(
  resource: Resource,
  options: FetchOptions = {},
): Promise<PaginatedResponse<T>> {
  const { page = 1, search } = options;
  const params = new URLSearchParams();

  params.set("page", String(page));
  if (search) {
    params.set("search", search);
  }

  const url = `${SWAPI_PROVIDERS.PRIMARY}/${resource}/?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Primary API failed: ${response.status}`);
  }

  return response.json() as Promise<PaginatedResponse<T>>;
}

async function fetchFromFallback<T extends { name: string }>(
  resource: Resource,
  options: FetchOptions = {},
): Promise<PaginatedResponse<T>> {
  const { page = 1, search } = options;

  const url = `${SWAPI_PROVIDERS.FALLBACK}/${resource}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Fallback API failed: ${response.status}`);
  }

  const allItems = (await response.json()) as T[];

  // Filter by search (case-insensitive name match)
  const filtered = search
    ? allItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      )
    : allItems;

  // Paginate
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const results = filtered.slice(startIndex, endIndex);

  // Build next/previous URLs (for consistency with primary API)
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const hasNext = page < totalPages;
  const hasPrevious = page > 1;

  return {
    count: filtered.length,
    next: hasNext ? `page=${page + 1}` : null,
    previous: hasPrevious ? `page=${page - 1}` : null,
    results,
  };
}

export async function fetchResource<T extends { name: string }>(
  resource: Resource,
  options: FetchOptions = {},
): Promise<PaginatedResponse<T>> {
  try {
    return await fetchFromPrimary<T>(resource, options);
  } catch {
    console.warn(
      `Primary SWAPI (swapi.dev) failed for ${resource}, falling back to swapi.info`,
    );
    return await fetchFromFallback<T>(resource, options);
  }
}
