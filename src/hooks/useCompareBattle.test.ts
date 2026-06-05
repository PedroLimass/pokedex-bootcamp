import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useCompareBattle, usePokemonByName } from "./useCompareBattle";
import { createQueryWrapper } from "../test/utils";
import { installFetchMock } from "../test/mockFetch";
import { makePokemon, makeTypeData } from "../test/factories";

const balanced = {
  hp: 60,
  attack: 60,
  defense: 60,
  "special-attack": 60,
  "special-defense": 60,
  speed: 60,
};

describe("useCompareBattle", () => {
  it("não está pronto enquanto faltar um Pokémon", () => {
    installFetchMock({ types: {} });
    const { result } = renderHook(() => useCompareBattle(null, null), {
      wrapper: createQueryWrapper(),
    });
    expect(result.current.isReady).toBe(false);
    expect(result.current.result).toBeNull();
  });

  it("simula a batalha quando os tipos carregam", async () => {
    installFetchMock({
      types: {
        fire: makeTypeData("fire", { double_damage_to: ["grass"] }),
        grass: makeTypeData("grass"),
      },
    });

    const fire = makePokemon({ name: "charmander", types: ["fire"], stats: balanced });
    const grass = makePokemon({ name: "bulbasaur", types: ["grass"], stats: balanced });

    const { result } = renderHook(() => useCompareBattle(fire, grass), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.result?.winner).toBe("a");
  });
});

describe("usePokemonByName", () => {
  it("busca o Pokémon pelo nome", async () => {
    const pikachu = makePokemon({ id: 25, name: "pikachu", types: ["electric"] });
    installFetchMock({ pokemon: { pikachu } });

    const { result } = renderHook(() => usePokemonByName("pikachu"), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.name).toBe("pikachu");
  });

  it("fica desabilitado quando o nome é nulo", () => {
    installFetchMock({});
    const { result } = renderHook(() => usePokemonByName(null), {
      wrapper: createQueryWrapper(),
    });
    expect(result.current.fetchStatus).toBe("idle");
  });
});
