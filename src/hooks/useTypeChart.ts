import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchTypeByName } from "../services/pokeApi";
import type { PokemonTypeData } from "../types/type";

/** Carrega e cacheia os dados de tipo necessários para calcular eficácia. */
export function useTypeChart(typeNames: string[]) {
  const uniqueNames = useMemo(
    () => [...new Set(typeNames)].sort(),
    [typeNames],
  );

  const queries = useQueries({
    queries: uniqueNames.map((name) => ({
      queryKey: ["type", name],
      queryFn: ({ signal }: { signal: AbortSignal }) =>
        fetchTypeByName(name, signal),
      enabled: Boolean(name),
    })),
  });

  const typeChart = useMemo(() => {
    const map = new Map<string, PokemonTypeData>();
    queries.forEach((query) => {
      if (query.data) map.set(query.data.name, query.data);
    });
    return map;
  }, [queries]);

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const isReady =
    uniqueNames.length > 0 &&
    uniqueNames.every((name) => typeChart.has(name));

  return { typeChart, isLoading, isError, isReady };
}
