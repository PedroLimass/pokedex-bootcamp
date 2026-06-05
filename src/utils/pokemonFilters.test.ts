import { describe, expect, it } from "vitest";
import { applyPokemonFilters } from "./pokemonFilters";
import type { NamedAPIResource } from "../types/pokemon";

const index: NamedAPIResource[] = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
  { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
  { name: "mewtwo", url: "https://pokeapi.co/api/v2/pokemon/150/" },
];

const names = (results: NamedAPIResource[]) => results.map((r) => r.name);

const base = {
  search: "",
  types: [] as string[],
  generation: null as number | null,
  sort: "relevance" as const,
};

describe("applyPokemonFilters", () => {
  it("sem filtros e relevância mantém a ordem do índice", () => {
    expect(names(applyPokemonFilters(index, base, null, null))).toEqual([
      "bulbasaur",
      "charizard",
      "pikachu",
      "mewtwo",
    ]);
  });

  it("ordena por número decrescente", () => {
    const result = applyPokemonFilters(
      index,
      { ...base, sort: "number-desc" },
      null,
      null,
    );
    expect(names(result)).toEqual([
      "mewtwo",
      "pikachu",
      "charizard",
      "bulbasaur",
    ]);
  });

  it("ordena por nome A-Z", () => {
    const result = applyPokemonFilters(
      index,
      { ...base, sort: "name-asc" },
      null,
      null,
    );
    expect(names(result)).toEqual([
      "bulbasaur",
      "charizard",
      "mewtwo",
      "pikachu",
    ]);
  });

  it("filtra por conjunto de tipos", () => {
    const typeSet = new Set(["charizard", "pikachu"]);
    const result = applyPokemonFilters(index, base, typeSet, null);
    expect(names(result)).toEqual(["charizard", "pikachu"]);
  });

  it("filtra por geração", () => {
    const genSet = new Set(["bulbasaur", "charizard"]);
    const result = applyPokemonFilters(index, base, null, genSet);
    expect(names(result)).toEqual(["bulbasaur", "charizard"]);
  });

  it("combina busca textual com filtro de tipo", () => {
    const typeSet = new Set(["charizard", "pikachu"]);
    const result = applyPokemonFilters(
      index,
      { ...base, search: "char" },
      typeSet,
      null,
    );
    expect(names(result)).toEqual(["charizard"]);
  });

  it("interseção de tipo e geração", () => {
    const typeSet = new Set(["charizard", "pikachu", "mewtwo"]);
    const genSet = new Set(["pikachu", "mewtwo"]);
    const result = applyPokemonFilters(index, base, typeSet, genSet);
    expect(names(result)).toEqual(["pikachu", "mewtwo"]);
  });
});
