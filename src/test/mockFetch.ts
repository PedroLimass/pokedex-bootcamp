import { vi } from "vitest";
import type { Pokemon } from "../types/pokemon";
import type { GenerationData, PokemonTypeData } from "../types/type";

export interface MockApiData {
  index?: { name: string; url: string }[];
  pokemon?: Record<string, Pokemon>;
  species?: Record<string, { flavor_text_entries: unknown[] }>;
  types?: Record<string, PokemonTypeData>;
  generations?: Record<string, GenerationData>;
}

const jsonResponse = (data: unknown) =>
  ({
    ok: true,
    status: 200,
    json: async () => data,
  }) as Response;

const notFound = () =>
  ({
    ok: false,
    status: 404,
    json: async () => ({}),
  }) as Response;

/**
 * Substitui global.fetch por um mock que roteia pelas rotas da PokeAPI usadas
 * nos serviços. Retorna o spy para asserts (ex.: número de chamadas).
 */
export function installFetchMock(data: MockApiData) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input.toString();

    if (url.includes("/pokemon?")) {
      return jsonResponse({ results: data.index ?? [] });
    }

    const speciesMatch = url.match(/\/pokemon-species\/([^/?]+)/);
    if (speciesMatch) {
      const key = speciesMatch[1];
      const species = data.species?.[key];
      return species ? jsonResponse(species) : notFound();
    }

    const pokemonMatch = url.match(/\/pokemon\/([^/?]+)/);
    if (pokemonMatch) {
      const key = pokemonMatch[1];
      const pokemon = data.pokemon?.[key];
      return pokemon ? jsonResponse(pokemon) : notFound();
    }

    const typeMatch = url.match(/\/type\/([^/?]+)/);
    if (typeMatch) {
      const key = typeMatch[1];
      const type = data.types?.[key];
      return type ? jsonResponse(type) : notFound();
    }

    const genMatch = url.match(/\/generation\/([^/?]+)/);
    if (genMatch) {
      const key = genMatch[1];
      const generation = data.generations?.[key];
      return generation ? jsonResponse(generation) : notFound();
    }

    return notFound();
  });

  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}
