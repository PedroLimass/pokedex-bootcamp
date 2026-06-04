import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  fetchGeneration,
  fetchPokemonByName,
  fetchPokemonIndex,
  fetchTypeByName,
} from "../services/pokeApi";
import { applyPokemonFilters } from "../utils/pokemonFilters";
import type { SortOption } from "../constants/pokemon";
import type { Pokemon } from "../types/pokemon";

export const PAGE_SIZE = 18;

export interface PokemonFilters {
  search: string;
  types: string[];
  generation: number | null;
  sort: SortOption;
}

interface UsePokemonsResult {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  totalCount: number;
  loadMore: () => void;
}

/**
 * Orquestra a listagem usando React Query:
 * - O índice completo é uma query cacheada única.
 * - Filtros de tipo/geração resolvem listas de nomes via /type e /generation
 *   (cacheadas) que são cruzadas com o índice — sem baixar todos os detalhes.
 * - Cada Pokémon visível é uma query própria, reaproveitada em toda a app.
 */
export function usePokemons(filters: PokemonFilters): UsePokemonsResult {
  const { search, types, generation, sort } = filters;
  const normalizedSearch = search.trim().toLowerCase();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const indexQuery = useQuery({
    queryKey: ["pokemon-index"],
    queryFn: ({ signal }) => fetchPokemonIndex(signal),
  });

  const typeQueries = useQueries({
    queries: types.map((name) => ({
      queryKey: ["type", name],
      queryFn: ({ signal }: { signal: AbortSignal }) =>
        fetchTypeByName(name, signal),
    })),
  });

  const generationQuery = useQuery({
    queryKey: ["generation", generation],
    queryFn: ({ signal }) => fetchGeneration(generation as number, signal),
    enabled: generation !== null,
  });

  const typesReady = typeQueries.every((query) => query.data);
  const generationReady = generation === null || Boolean(generationQuery.data);

  const typesSignature = typeQueries
    .map((query) => (query.data ? query.data.name : ""))
    .join("|");

  const typeNameSet = useMemo(() => {
    if (types.length === 0) return null;
    const set = new Set<string>();
    typeQueries.forEach((query) => {
      query.data?.pokemon.forEach((entry) => set.add(entry.pokemon.name));
    });
    return set;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typesSignature, types.length]);

  const genNameSet = useMemo(() => {
    if (generation === null || !generationQuery.data) return null;
    return new Set(
      generationQuery.data.pokemon_species.map((entry) => entry.name),
    );
  }, [generation, generationQuery.data]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [normalizedSearch, typesSignature, generation, sort]);

  const filtered = useMemo(
    () =>
      applyPokemonFilters(
        indexQuery.data ?? [],
        { search, types, generation, sort },
        typeNameSet,
        genNameSet,
      ),
    [indexQuery.data, search, types, generation, sort, typeNameSet, genNameSet],
  );

  const visibleResources = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  const detailQueries = useQueries({
    queries: visibleResources.map((resource) => ({
      queryKey: ["pokemon", resource.name],
      queryFn: ({ signal }: { signal: AbortSignal }) =>
        fetchPokemonByName(resource.name, signal),
    })),
  });

  const pokemons = detailQueries
    .map((query) => query.data)
    .filter((data): data is Pokemon => Boolean(data));

  const filtersLoading = !typesReady || !generationReady;
  const isLoadingDetails = detailQueries.some((query) => query.isLoading);
  const isLoading =
    indexQuery.isLoading || filtersLoading || isLoadingDetails;

  const hasError =
    Boolean(indexQuery.error) || detailQueries.some((query) => query.error);

  const loadMore = useCallback(() => {
    setVisibleCount((current) => current + PAGE_SIZE);
  }, []);

  return {
    pokemons,
    isLoading,
    error: hasError ? "Não foi possível carregar os Pokémons." : null,
    hasMore: visibleCount < filtered.length,
    totalCount: filtered.length,
    loadMore,
  };
}
