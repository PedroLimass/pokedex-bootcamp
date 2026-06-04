import type { Pokemon } from "../types/pokemon";

export function getPokemonStat(pokemon: Pokemon, statName: string): number {
  return (
    pokemon.stats.find((entry) => entry.stat.name === statName)?.base_stat ?? 0
  );
}

export function getPokemonTypeNames(pokemon: Pokemon): string[] {
  return pokemon.types.map((entry) => entry.type.name);
}
