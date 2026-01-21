import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PlanetsPage from "@/app/planets/page";

vi.mock("@/lib/swapi", () => ({
  fetchResource: vi.fn(),
  RESOURCE: { PEOPLE: "people", PLANETS: "planets", STARSHIPS: "starships" },
}));

import type { Planet } from "@/types/planet";
import type { PaginatedResponse } from "@/lib/swapi";

vi.mock("@/components/planets/planet-card", () => ({
  PlanetCard: ({ name }: { name: string }) => (
    <div data-testid="planet-card">{name}</div>
  ),
}));

vi.mock("@/components/search-input", () => ({
  SearchInput: () => <div data-testid="search-input" />,
}));

vi.mock("@/components/pagination", () => ({
  Pagination: () => <div data-testid="pagination" />,
}));

vi.mock("@/components/ui/typography", () => ({
  Typography: ({ children }: { children: React.ReactNode }) => (
    <h1>{children}</h1>
  ),
}));

import { fetchResource } from "@/lib/swapi";

const mockFetchResource = vi.mocked(fetchResource);

describe("PlanetsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show empty message when no planets are returned", async () => {
    mockFetchResource.mockResolvedValueOnce({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });

    const searchParams = Promise.resolve({ page: "1" });
    const jsx = await PlanetsPage({ searchParams });
    render(jsx);

    expect(screen.getByText("No se encontraron planetas.")).toBeInTheDocument();
    expect(screen.queryByTestId("planet-card")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });

  it("should show empty message with search term when search returns no results", async () => {
    mockFetchResource.mockResolvedValueOnce({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });

    const searchParams = Promise.resolve({ page: "1", search: "unknown" });
    const jsx = await PlanetsPage({ searchParams });
    render(jsx);

    expect(
      screen.getByText('No se encontraron planetas para "unknown".'),
    ).toBeInTheDocument();
  });

  it("should render planets when data is available", async () => {
    mockFetchResource.mockResolvedValueOnce({
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          name: "Tatooine",
          url: "https://swapi.dev/api/planets/1/",
          climate: "arid",
          gravity: "1 standard",
          population: "200000",
          terrain: "desert",
        },
        {
          name: "Alderaan",
          url: "https://swapi.dev/api/planets/2/",
          climate: "temperate",
          gravity: "1 standard",
          population: "2000000000",
          terrain: "grasslands, mountains",
        },
      ],
    } as unknown as PaginatedResponse<Planet>);

    const searchParams = Promise.resolve({ page: "1" });
    const jsx = await PlanetsPage({ searchParams });
    render(jsx);

    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    expect(screen.getByText("Alderaan")).toBeInTheDocument();
    expect(screen.getAllByTestId("planet-card")).toHaveLength(2);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
