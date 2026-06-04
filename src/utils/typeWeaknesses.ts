import type { PokemonTypeData } from "../types/type";

export interface TypeMatchup {
  type: string;
  multiplier: number;
}

/**
 * Calcula as fraquezas de um Pokémon a partir das relações de dano dos seus
 * próprios tipos (`*_damage_from`). Combina os multiplicadores quando há dois
 * tipos — exige apenas os dados dos 1-2 tipos do Pokémon (cacheados).
 */
export function getWeaknesses(
  defenderTypes: string[],
  typeChart: Map<string, PokemonTypeData>,
): TypeMatchup[] {
  const multipliers = new Map<string, number>();

  const apply = (name: string, factor: number) => {
    multipliers.set(name, (multipliers.get(name) ?? 1) * factor);
  };

  for (const defenderType of defenderTypes) {
    const data = typeChart.get(defenderType);
    if (!data) continue;

    const rel = data.damage_relations;
    rel.double_damage_from.forEach((entry) => apply(entry.name, 2));
    rel.half_damage_from.forEach((entry) => apply(entry.name, 0.5));
    rel.no_damage_from.forEach((entry) => apply(entry.name, 0));
  }

  return [...multipliers.entries()]
    .filter(([, multiplier]) => multiplier > 1)
    .map(([type, multiplier]) => ({ type, multiplier }))
    .sort((a, b) => b.multiplier - a.multiplier);
}
