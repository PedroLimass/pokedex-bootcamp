import type {
  NamedAPIResource,
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
} from "../types/pokemon";
import type { GenerationData, PokemonTypeData } from "../types/type";

const BASE_URL = "https://pokeapi.co/api/v2";

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao buscar: ${url}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Busca o índice completo (nome + url) de todos os Pokémons de uma vez.
 * É um payload leve e permite filtrar/buscar localmente sem N requests.
 */
export async function fetchPokemonIndex(
  signal?: AbortSignal,
): Promise<NamedAPIResource[]> {
  const data = await getJson<PokemonListResponse>(
    `${BASE_URL}/pokemon?limit=100000&offset=0`,
    signal,
  );
  return data.results;
}

export async function fetchPokemonByName(
  name: string,
  signal?: AbortSignal,
): Promise<Pokemon> {
  return getJson<Pokemon>(`${BASE_URL}/pokemon/${name}`, signal);
}

export async function fetchPokemonSpecies(
  idOrName: string | number,
  signal?: AbortSignal,
): Promise<PokemonSpecies> {
  return getJson<PokemonSpecies>(
    `${BASE_URL}/pokemon-species/${idOrName}`,
    signal,
  );
}

export async function fetchTypeByName(
  name: string,
  signal?: AbortSignal,
): Promise<PokemonTypeData> {
  return getJson<PokemonTypeData>(`${BASE_URL}/type/${name}`, signal);
}

export async function fetchGeneration(
  id: number,
  signal?: AbortSignal,
): Promise<GenerationData> {
  return getJson<GenerationData>(`${BASE_URL}/generation/${id}`, signal);
}

/**
 * Retorna o melhor sprite disponível, com fallbacks (alguns Pokémons não têm
 * a imagem do dream_world).
 */
export function getPokemonImage(pokemon: Pokemon): string {
  return (
    pokemon.sprites.other?.dream_world?.front_default ??
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.other?.home?.front_default ??
    pokemon.sprites.front_default ??
    ""
  );
}
