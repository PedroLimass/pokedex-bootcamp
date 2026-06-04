import type { NamedAPIResource } from "./pokemon";

export interface TypeDamageRelations {
  double_damage_from: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  no_damage_to: NamedAPIResource[];
}

export interface TypePokemonEntry {
  slot: number;
  pokemon: NamedAPIResource;
}

export interface PokemonTypeData {
  id: number;
  name: string;
  damage_relations: TypeDamageRelations;
  pokemon: TypePokemonEntry[];
}

export interface GenerationData {
  id: number;
  name: string;
  pokemon_species: NamedAPIResource[];
}
