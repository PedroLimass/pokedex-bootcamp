import type { PokemonTypeData } from "../types/type";

function hasType(list: { name: string }[], typeName: string): boolean {
  return list.some((entry) => entry.name === typeName);
}

/**
 * Multiplicador de um tipo de ataque contra um ou dois tipos do defensor.
 * Combina as relações da PokeAPI (2x, 0.5x, 0x) para cada tipo defensor.
 */
export function getAttackMultiplier(
  attackType: string,
  defenderTypes: string[],
  typeChart: Map<string, PokemonTypeData>,
): number {
  const attackData = typeChart.get(attackType);
  if (!attackData || defenderTypes.length === 0) return 1;

  const { damage_relations: rel } = attackData;

  return defenderTypes.reduce((total, defenderType) => {
    if (hasType(rel.no_damage_to, defenderType)) return total * 0;
    if (hasType(rel.double_damage_to, defenderType)) return total * 2;
    if (hasType(rel.half_damage_to, defenderType)) return total * 0.5;
    return total;
  }, 1);
}

/** Melhor multiplicador entre os tipos do atacante (simula o golpe mais eficaz). */
export function getBestTypeMultiplier(
  attackerTypes: string[],
  defenderTypes: string[],
  typeChart: Map<string, PokemonTypeData>,
): number {
  if (attackerTypes.length === 0) return 1;

  return Math.max(
    ...attackerTypes.map((type) =>
      getAttackMultiplier(type, defenderTypes, typeChart),
    ),
  );
}
