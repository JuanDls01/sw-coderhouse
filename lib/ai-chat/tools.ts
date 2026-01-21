import { tool } from "ai";
import { z } from "zod";
import { fetchResource, RESOURCE } from "@/lib/swapi";
import { SWAPI_PROVIDERS } from "@/utils/consts";
import type { Character } from "@/types/character";
import type { Planet } from "@/types/planet";
import type { Starship } from "@/types/starship";

export const swapiTools = {
  searchPeople: tool({
    description:
      "Busca información detallada sobre personajes de Star Wars (nombre, altura, peso, color de pelo, color de ojos, etc.). Usa esto cuando necesites datos específicos de un personaje.",
    inputSchema: z.object({
      name: z.string().describe("Nombre del personaje a buscar (en inglés)"),
    }),
    execute: async ({ name }) => {
      const response = await fetchResource<Character>(RESOURCE.PEOPLE, {
        search: name,
      });
      return {
        data: response.results[0] ?? null,
        count: response.count,
      };
    },
    toModelOutput: ({ output }) => {
      if (!output.data) {
        return { type: "text", value: "No se encontró el personaje." };
      }
      const {
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
      } = output.data;
      return {
        type: "text",
        value: `Personaje: ${name}, Altura: ${height}cm, Peso: ${mass}kg, Pelo: ${hair_color}, Piel: ${skin_color}, Ojos: ${eye_color}, Nacimiento: ${birth_year}, Género: ${gender}`,
      };
    },
  }),

  searchPlanets: tool({
    description:
      "Busca información detallada sobre planetas de Star Wars (clima, terreno, población, diámetro, etc.). Usa esto cuando necesites datos específicos de un planeta.",
    inputSchema: z.object({
      name: z.string().describe("Nombre del planeta a buscar (en inglés)"),
    }),
    execute: async ({ name }) => {
      const response = await fetchResource<Planet>(RESOURCE.PLANETS, {
        search: name,
      });
      return {
        data: response.results[0] ?? null,
        count: response.count,
      };
    },
    toModelOutput: ({ output }) => {
      if (!output.data) {
        return { type: "text", value: "No se encontró el planeta." };
      }
      const {
        name,
        climate,
        terrain,
        population,
        diameter,
        gravity,
        surface_water,
      } = output.data;
      return {
        type: "text",
        value: `Planeta: ${name}, Clima: ${climate}, Terreno: ${terrain}, Población: ${population}, Diámetro: ${diameter}km, Gravedad: ${gravity}, Agua superficial: ${surface_water}%`,
      };
    },
  }),

  searchStarships: tool({
    description:
      "Busca información detallada sobre naves espaciales de Star Wars (modelo, fabricante, velocidad, capacidad de carga, etc.). Usa esto cuando necesites datos específicos de una nave.",
    inputSchema: z.object({
      name: z.string().describe("Nombre de la nave a buscar (en inglés)"),
    }),
    execute: async ({ name }) => {
      const response = await fetchResource<Starship>(RESOURCE.STARSHIPS, {
        search: name,
      });
      return {
        data: response.results[0] ?? null,
        count: response.count,
      };
    },
    toModelOutput: ({ output }) => {
      if (!output.data) {
        return { type: "text", value: "No se encontró la nave." };
      }
      const {
        name,
        model,
        manufacturer,
        starship_class,
        crew,
        passengers,
        cargo_capacity,
        hyperdrive_rating,
        length,
      } = output.data;
      return {
        type: "text",
        value: `Nave: ${name}, Modelo: ${model}, Fabricante: ${manufacturer}, Clase: ${starship_class}, Tripulación: ${crew}, Pasajeros: ${passengers}, Carga: ${cargo_capacity}kg, Hiperimpulsor: ${hyperdrive_rating}, Longitud: ${length}m`,
      };
    },
  }),

  getAllCounts: tool({
    description:
      'Obtiene el conteo total de todos los recursos en Star Wars (personajes, planetas, naves). Usa esto cuando te pregunten "cuántos" o "cuántas" cosas hay en total.',
    inputSchema: z.object({}),
    execute: async () => {
      const response = await fetch(SWAPI_PROVIDERS.PRIMARY);
      if (!response.ok) {
        throw new Error("No se pudo obtener los conteos");
      }
      const endpoints = (await response.json()) as Record<string, string>;

      const counts = await Promise.all(
        Object.entries(endpoints).map(async ([resource, url]) => {
          const res = await fetch(url);
          const data = (await res.json()) as { count: number };
          return [resource, data.count] as const;
        }),
      );

      return Object.fromEntries(counts);
    },
    toModelOutput: ({ output }) => ({
      type: "text",
      value: `Conteos: ${Object.entries(output)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ")}`,
    }),
  }),
};
