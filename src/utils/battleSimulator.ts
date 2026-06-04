import type { Pokemon } from "../types/pokemon";
import type { PokemonTypeData } from "../types/type";
import { getPokemonStat, getPokemonTypeNames } from "./pokemonStats";
import { getBestTypeMultiplier } from "./typeEffectiveness";

const BATTLE_LEVEL = 50;
const MOVE_POWER = 80;
const STAB = 1.5;

export type BattleSide = "a" | "b";

export interface BattleTurnLog {
  attacker: BattleSide;
  damage: number;
  typeMultiplier: number;
  remainingHp: { a: number; b: number };
}

export interface BattleResult {
  winner: BattleSide | "draw";
  turns: number;
  finalHp: { a: number; b: number };
  log: BattleTurnLog[];
  summary: string;
}

function pickMoveCategory(pokemon: Pokemon): "physical" | "special" {
  const attack = getPokemonStat(pokemon, "attack");
  const specialAttack = getPokemonStat(pokemon, "special-attack");
  return specialAttack > attack ? "special" : "physical";
}

function getOffenseStat(pokemon: Pokemon, category: "physical" | "special"): number {
  return category === "physical"
    ? getPokemonStat(pokemon, "attack")
    : getPokemonStat(pokemon, "special-attack");
}

function getDefenseStat(pokemon: Pokemon, category: "physical" | "special"): number {
  return category === "physical"
    ? getPokemonStat(pokemon, "defense")
    : getPokemonStat(pokemon, "special-defense");
}

function calculateDamage(
  attacker: Pokemon,
  defender: Pokemon,
  typeChart: Map<string, PokemonTypeData>,
): { damage: number; typeMultiplier: number } {
  const category = pickMoveCategory(attacker);
  const offense = getOffenseStat(attacker, category);
  const defense = Math.max(getDefenseStat(defender, category), 1);
  const attackerTypes = getPokemonTypeNames(attacker);
  const defenderTypes = getPokemonTypeNames(defender);

  const typeMultiplier = getBestTypeMultiplier(
    attackerTypes,
    defenderTypes,
    typeChart,
  );

  const stabMultiplier = typeMultiplier > 0 ? STAB : 1;

  const base =
    (((2 * BATTLE_LEVEL) / 5 + 2) * MOVE_POWER * offense) / defense / 50 + 2;

  const damage = Math.max(
    1,
    Math.floor(base * typeMultiplier * stabMultiplier),
  );

  return { damage, typeMultiplier };
}

/**
 * Simula um combate 1v1 por turnos. Quem tem mais velocidade ataca primeiro e,
 * se o oponente cair, não há revide. Em caso de empate de velocidade, os dois
 * golpeiam simultaneamente — assim Pokémons idênticos se nocauteiam juntos e o
 * resultado é um empate justo, em vez de favorecer arbitrariamente o Pokémon 1.
 */
export function simulateBattle(
  pokemonA: Pokemon,
  pokemonB: Pokemon,
  typeChart: Map<string, PokemonTypeData>,
): BattleResult {
  let hpA = getPokemonStat(pokemonA, "hp");
  let hpB = getPokemonStat(pokemonB, "hp");
  const log: BattleTurnLog[] = [];
  const maxTurns = 50;

  const speedA = getPokemonStat(pokemonA, "speed");
  const speedB = getPokemonStat(pokemonB, "speed");

  const strike = (side: BattleSide) => {
    const attacker = side === "a" ? pokemonA : pokemonB;
    const defender = side === "a" ? pokemonB : pokemonA;
    const { damage, typeMultiplier } = calculateDamage(
      attacker,
      defender,
      typeChart,
    );

    if (side === "a") {
      hpB = Math.max(0, hpB - damage);
    } else {
      hpA = Math.max(0, hpA - damage);
    }

    log.push({
      attacker: side,
      damage,
      typeMultiplier,
      remainingHp: { a: hpA, b: hpB },
    });
  };

  for (let turn = 0; turn < maxTurns && hpA > 0 && hpB > 0; turn += 1) {
    if (speedA === speedB) {
      // Empate de velocidade: ambos atacam na mesma rodada (dano calculado
      // antes de aplicar qualquer baixa), permitindo KO mútuo.
      const hitFromA = calculateDamage(pokemonA, pokemonB, typeChart);
      const hitFromB = calculateDamage(pokemonB, pokemonA, typeChart);

      hpB = Math.max(0, hpB - hitFromA.damage);
      hpA = Math.max(0, hpA - hitFromB.damage);

      log.push({
        attacker: "a",
        damage: hitFromA.damage,
        typeMultiplier: hitFromA.typeMultiplier,
        remainingHp: { a: hpA, b: hpB },
      });
      log.push({
        attacker: "b",
        damage: hitFromB.damage,
        typeMultiplier: hitFromB.typeMultiplier,
        remainingHp: { a: hpA, b: hpB },
      });
      continue;
    }

    const order: BattleSide[] = speedA > speedB ? ["a", "b"] : ["b", "a"];

    for (const side of order) {
      if (hpA <= 0 || hpB <= 0) break;
      strike(side);
    }
  }

  let winner: BattleResult["winner"] = "draw";
  if (hpA > hpB) winner = "a";
  else if (hpB > hpA) winner = "b";

  const summary =
    winner === "draw"
      ? "Empate! Nenhum Pokémon conseguiu nocautear o outro."
      : winner === "a"
        ? `${pokemonA.name} venceu a batalha!`
        : `${pokemonB.name} venceu a batalha!`;

  return {
    winner,
    turns: log.length,
    finalHp: { a: hpA, b: hpB },
    log,
    summary,
  };
}
