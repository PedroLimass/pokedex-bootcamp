import type { Pokemon, PokemonStat } from "../types/pokemon";
import type { PokemonTypeData, TypeDamageRelations } from "../types/type";

type StatMap = Partial<{
  hp: number;
  attack: number;
  defense: number;
  "special-attack": number;
  "special-defense": number;
  speed: number;
}>;

const buildStats = (stats: StatMap): PokemonStat[] =>
  Object.entries(stats).map(([name, base_stat]) => ({
    base_stat: base_stat ?? 0,
    effort: 0,
    stat: { name, url: "" },
  }));

export const makePokemon = (overrides: {
  id?: number;
  name?: string;
  types?: string[];
  stats?: StatMap;
  abilities?: { name: string; hidden?: boolean }[];
  weight?: number;
  height?: number;
}): Pokemon => {
  const {
    id = 1,
    name = "pokemon",
    types = ["normal"],
    stats = {},
    abilities = [{ name: "ability-one" }],
    weight = 100,
    height = 10,
  } = overrides;

  return {
    id,
    name,
    order: id,
    height,
    weight,
    sprites: {
      front_default: `sprite-${name}`,
      other: {
        dream_world: { front_default: `dream-${name}` },
      },
    },
    types: types.map((type, index) => ({
      slot: index + 1,
      type: { name: type, url: "" },
    })),
    abilities: abilities.map((ability, index) => ({
      slot: index + 1,
      is_hidden: ability.hidden ?? false,
      ability: { name: ability.name, url: "" },
    })),
    stats: buildStats(stats),
  };
};

const emptyRelations = (): TypeDamageRelations => ({
  double_damage_from: [],
  double_damage_to: [],
  half_damage_from: [],
  half_damage_to: [],
  no_damage_from: [],
  no_damage_to: [],
});

const toResources = (names: string[]) =>
  names.map((name) => ({ name, url: "" }));

export const makeTypeData = (
  name: string,
  relations: Partial<Record<keyof TypeDamageRelations, string[]>> = {},
  pokemonNames: string[] = [],
): PokemonTypeData => {
  const damage_relations = emptyRelations();
  (Object.keys(relations) as (keyof TypeDamageRelations)[]).forEach((key) => {
    damage_relations[key] = toResources(relations[key] ?? []);
  });

  return {
    id: 1,
    name,
    damage_relations,
    pokemon: pokemonNames.map((pokemonName, index) => ({
      slot: index + 1,
      pokemon: { name: pokemonName, url: "" },
    })),
  };
};
