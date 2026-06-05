import { describe, expect, it } from "vitest";
import { getPokemonStat, getPokemonTypeNames } from "./pokemonStats";
import { makePokemon } from "../test/factories";

describe("getPokemonStat", () => {
  it("retorna o valor base do stat pedido", () => {
    const pokemon = makePokemon({ stats: { hp: 78, speed: 100 } });
    expect(getPokemonStat(pokemon, "hp")).toBe(78);
    expect(getPokemonStat(pokemon, "speed")).toBe(100);
  });

  it("retorna 0 quando o stat não existe", () => {
    const pokemon = makePokemon({ stats: { hp: 50 } });
    expect(getPokemonStat(pokemon, "attack")).toBe(0);
  });
});

describe("getPokemonTypeNames", () => {
  it("extrai os nomes dos tipos na ordem dos slots", () => {
    const pokemon = makePokemon({ types: ["fire", "flying"] });
    expect(getPokemonTypeNames(pokemon)).toEqual(["fire", "flying"]);
  });
});
