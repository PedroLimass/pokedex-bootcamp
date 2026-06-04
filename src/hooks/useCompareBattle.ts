import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonByName } from "../services/pokeApi";
import { simulateBattle } from "../utils/battleSimulator";
import { getPokemonTypeNames } from "../utils/pokemonStats";
import { useTypeChart } from "./useTypeChart";
import type { Pokemon } from "../types/pokemon";

export function useCompareBattle(
  pokemonA: Pokemon | null,
  pokemonB: Pokemon | null,
) {
  const typeNames = useMemo(() => {
    if (!pokemonA || !pokemonB) return [];
    return [
      ...getPokemonTypeNames(pokemonA),
      ...getPokemonTypeNames(pokemonB),
    ];
  }, [pokemonA, pokemonB]);

  const { typeChart, isLoading: typesLoading, isReady } = useTypeChart(typeNames);

  const battleResult = useMemo(() => {
    if (!pokemonA || !pokemonB || !isReady) return null;
    return simulateBattle(pokemonA, pokemonB, typeChart);
  }, [pokemonA, pokemonB, typeChart, isReady]);

  return {
    result: battleResult,
    isLoading: typesLoading,
    isReady: Boolean(pokemonA && pokemonB && isReady),
  };
}

/** Busca um Pokémon pelo nome (reutiliza cache global `["pokemon", name]`). */
export function usePokemonByName(name: string | null) {
  return useQuery({
    queryKey: ["pokemon", name ?? ""],
    queryFn: ({ signal }) => fetchPokemonByName(name!, signal),
    enabled: Boolean(name),
  });
}
