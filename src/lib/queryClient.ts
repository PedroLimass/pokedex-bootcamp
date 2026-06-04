import { QueryClient } from "@tanstack/react-query";

const ONE_DAY = 1000 * 60 * 60 * 24;

/**
 * Defaults alinhados ao comportamento real da PokeAPI:
 * - Os recursos mudam raramente e a API envia `cache-control: max-age=86400`,
 *   então tratamos os dados como "frescos" por 24h (evita refetch desnecessário).
 * - Mantemos em cache por 7 dias (gcTime) para reaproveitar entre navegações.
 * - Retry com backoff exponencial para lidar com falhas transitórias (5xx/rede).
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_DAY,
      gcTime: ONE_DAY * 7,
      retry: 3,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
      refetchOnWindowFocus: false,
    },
  },
});
