import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CharactersPage from "@/app/characters/page";

vi.mock("@/lib/swapi", () => ({
  fetchResource: vi.fn(),
  RESOURCE: { PEOPLE: "people", PLANETS: "planets", STARSHIPS: "starships" },
}));

import type { Character } from "@/types/character";
import type { PaginatedResponse } from "@/lib/swapi";

vi.mock("@/components/characters/character-card", () => ({
  CharacterCard: ({ name }: { name: string }) => (
    <div data-testid="character-card">{name}</div>
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

describe("CharactersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show empty message when no characters are returned", async () => {
    mockFetchResource.mockResolvedValueOnce({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });

    const searchParams = Promise.resolve({ page: "1" });
    const jsx = await CharactersPage({ searchParams });
    render(jsx);

    expect(
      screen.getByText("No se encontraron personajes."),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("character-card")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });

  it("should show empty message with search term when search returns no results", async () => {
    mockFetchResource.mockResolvedValueOnce({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });

    const searchParams = Promise.resolve({ page: "1", search: "xyz" });
    const jsx = await CharactersPage({ searchParams });
    render(jsx);

    expect(
      screen.getByText('No se encontraron personajes para "xyz".'),
    ).toBeInTheDocument();
  });

  it("should render characters when data is available", async () => {
    mockFetchResource.mockResolvedValueOnce({
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          name: "Luke Skywalker",
          url: "https://swapi.dev/api/people/1/",
          birth_year: "19BBY",
          films: [],
          starships: [],
          height: "172",
          mass: "77",
          gender: "male",
        },
        {
          name: "Darth Vader",
          url: "https://swapi.dev/api/people/4/",
          birth_year: "41.9BBY",
          films: [],
          starships: [],
          height: "202",
          mass: "136",
          gender: "male",
        },
      ],
    } as unknown as PaginatedResponse<Character>);

    const searchParams = Promise.resolve({ page: "1" });
    const jsx = await CharactersPage({ searchParams });
    render(jsx);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Darth Vader")).toBeInTheDocument();
    expect(screen.getAllByTestId("character-card")).toHaveLength(2);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
