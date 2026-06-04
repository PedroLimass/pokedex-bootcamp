import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { del, get, set } from "idb-keyval";

/**
 * Persiste o cache do React Query no IndexedDB. Escolhemos IndexedDB (e não
 * localStorage) porque o cache dos detalhes dos Pokémons pode passar do limite
 * de ~5MB do localStorage. Assim os dados sobrevivem entre sessões e cumprimos
 * a política de uso justo da PokeAPI (cachear localmente o que foi requisitado).
 */
export const asyncPersister = createAsyncStoragePersister({
  storage: {
    getItem: (key) => get(key),
    setItem: (key, value) => set(key, value),
    removeItem: (key) => del(key),
  },
  throttleTime: 1000,
});
