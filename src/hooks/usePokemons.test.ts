import { describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { usePokemons } from "./usePokemons";
import { createQueryWrapper } from "../test/utils";
import { installFetchMock } from "../test/mockFetch";
import { makePokemon, makeTypeData } from "../test/factories";

const index = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
  { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
];

const pokemon = {
  bulbasaur: makePokemon({ id: 1, name: "bulbasaur", types: ["grass"] }),
  charmander: makePokemon({ id: 4, name: "charmander", types: ["fire"] }),
  squirtle: makePokemon({ id: 7, name: "squirtle", types: ["water"] }),
};

const baseFilters = {
  search: "",
  types: [] as string[],
  generation: null as number | null,
  sort: "relevance" as const,
};

const wrapper = createQueryWrapper;

describe("usePokemons", () => {
  it("carrega o índice e os detalhes visíveis", async () => {
    installFetchMock({ index, pokemon });

    const { result } = renderHook(() => usePokemons(baseFilters), {
      wrapper: wrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.pokemons).toHaveLength(3);
    expect(result.current.totalCount).toBe(3);
    expect(result.current.hasMore).toBe(false);
  });

  it("filtra pela busca textual", async () => {
    installFetchMock({ index, pokemon });

    const { result } = renderHook(
      () => usePokemons({ ...baseFilters, search: "char" }),
      { wrapper: wrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.pokemons.map((p) => p.name)).toEqual(["charmander"]);
  });

  it("filtra por tipo usando o endpoint /type", async () => {
    installFetchMock({
      index,
      pokemon,
      types: { fire: makeTypeData("fire", {}, ["charmander"]) },
    });

    const { result } = renderHook(
      () => usePokemons({ ...baseFilters, types: ["fire"] }),
      { wrapper: wrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.pokemons.map((p) => p.name)).toEqual(["charmander"]);
  });

  it("ordena por nome A-Z", async () => {
    installFetchMock({ index, pokemon });

    const { result } = renderHook(
      () => usePokemons({ ...baseFilters, sort: "name-asc" }),
      { wrapper: wrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.pokemons.map((p) => p.name)).toEqual([
      "bulbasaur",
      "charmander",
      "squirtle",
    ]);
  });

  it("reporta erro quando o índice falha", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 500, json: async () => ({}) })),
    );

    const { result } = renderHook(() => usePokemons(baseFilters), {
      wrapper: wrapper(),
    });

    await waitFor(() => expect(result.current.error).not.toBeNull());
  });

  it("loadMore aumenta a janela visível", async () => {
    // 20 pokémons para ultrapassar PAGE_SIZE (18).
    const bigIndex = Array.from({ length: 20 }, (_, i) => ({
      name: `mon${i}`,
      url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`,
    }));
    const bigPokemon = Object.fromEntries(
      bigIndex.map((entry, i) => [
        entry.name,
        makePokemon({ id: i + 1, name: entry.name }),
      ]),
    );
    installFetchMock({ index: bigIndex, pokemon: bigPokemon });

    const { result } = renderHook(() => usePokemons(baseFilters), {
      wrapper: wrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.pokemons).toHaveLength(18);
    expect(result.current.hasMore).toBe(true);

    act(() => result.current.loadMore());

    await waitFor(() => expect(result.current.pokemons).toHaveLength(20));
    expect(result.current.hasMore).toBe(false);
  });
});
