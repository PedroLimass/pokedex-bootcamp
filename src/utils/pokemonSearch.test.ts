import { describe, expect, it } from "vitest";
import { getIdFromResourceUrl, searchPokemonIndex } from "./pokemonSearch";
import type { NamedAPIResource } from "../types/pokemon";

const index: NamedAPIResource[] = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
  { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
  { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
  { name: "raichu", url: "https://pokeapi.co/api/v2/pokemon/26/" },
  { name: "poliwag", url: "https://pokeapi.co/api/v2/pokemon/60/" },
  { name: "mewtwo", url: "https://pokeapi.co/api/v2/pokemon/150/" },
];

const names = (results: NamedAPIResource[]) => results.map((r) => r.name);

describe("getIdFromResourceUrl", () => {
  it("extrai o id numérico da url", () => {
    expect(getIdFromResourceUrl("https://pokeapi.co/api/v2/pokemon/25/")).toBe(
      25,
    );
  });

  it("retorna NaN para url inválida", () => {
    expect(getIdFromResourceUrl("url-invalida")).toBeNaN();
  });
});

describe("searchPokemonIndex", () => {
  it("retorna o índice inteiro quando o termo é vazio", () => {
    expect(searchPokemonIndex(index, "")).toBe(index);
    expect(searchPokemonIndex(index, "   ")).toBe(index);
  });

  it("filtra por substring no nome", () => {
    expect(names(searchPokemonIndex(index, "chu"))).toEqual([
      "pikachu",
      "raichu",
    ]);
  });

  it("prioriza nomes que começam com o termo", () => {
    const result = names(searchPokemonIndex(index, "char"));
    expect(result).toEqual(["charmander", "charizard"]);
  });

  it("é case-insensitive", () => {
    expect(names(searchPokemonIndex(index, "PIKA"))).toEqual(["pikachu"]);
  });

  it("busca por id exato retorna apenas aquele pokémon", () => {
    expect(names(searchPokemonIndex(index, "6"))).toEqual(["charizard"]);
  });

  it("ignora o # na busca por id", () => {
    expect(names(searchPokemonIndex(index, "#25"))).toEqual(["pikachu"]);
  });

  it("ignora zeros à esquerda na busca por id", () => {
    expect(names(searchPokemonIndex(index, "006"))).toEqual(["charizard"]);
    expect(names(searchPokemonIndex(index, "#025"))).toEqual(["pikachu"]);
  });

  it("cai para busca por prefixo de id quando não há id exato", () => {
    // Não existe id "2" exato no índice, então casa por prefixo: 25, 26.
    expect(names(searchPokemonIndex(index, "2"))).toEqual([
      "pikachu",
      "raichu",
    ]);
  });

  it("retorna vazio quando nada casa", () => {
    expect(searchPokemonIndex(index, "xyz")).toEqual([]);
  });
});
