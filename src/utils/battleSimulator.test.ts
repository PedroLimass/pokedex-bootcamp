import { describe, expect, it } from "vitest";
import { simulateBattle } from "./battleSimulator";
import { makePokemon, makeTypeData } from "../test/factories";
import type { PokemonTypeData } from "../types/type";

const balancedStats = {
  hp: 60,
  attack: 60,
  defense: 60,
  "special-attack": 60,
  "special-defense": 60,
  speed: 60,
};

describe("simulateBattle", () => {
  it("dois Pokémons idênticos terminam em empate", () => {
    const chart = new Map<string, PokemonTypeData>([
      ["normal", makeTypeData("normal")],
    ]);
    const a = makePokemon({ name: "ditto", types: ["normal"], stats: balancedStats });
    const b = makePokemon({ name: "ditto", types: ["normal"], stats: balancedStats });

    const result = simulateBattle(a, b, chart);

    expect(result.winner).toBe("draw");
    expect(result.finalHp.a).toBe(result.finalHp.b);
  });

  it("vantagem de tipo decide o vencedor com stats iguais", () => {
    const chart = new Map<string, PokemonTypeData>([
      ["fire", makeTypeData("fire", { double_damage_to: ["grass"] })],
      ["grass", makeTypeData("grass")],
    ]);
    const fire = makePokemon({
      name: "charmander",
      types: ["fire"],
      stats: balancedStats,
    });
    const grass = makePokemon({
      name: "bulbasaur",
      types: ["grass"],
      stats: balancedStats,
    });

    const result = simulateBattle(fire, grass, chart);

    expect(result.winner).toBe("a");
    expect(result.summary).toContain("charmander");
  });

  it("Pokémon mais rápido e forte nocauteia sem sofrer revide", () => {
    const chart = new Map<string, PokemonTypeData>([
      ["normal", makeTypeData("normal")],
    ]);
    const fast = makePokemon({
      name: "jolteon",
      types: ["normal"],
      stats: { ...balancedStats, attack: 255, speed: 130 },
    });
    const fragile = makePokemon({
      name: "magikarp",
      types: ["normal"],
      stats: { hp: 1, attack: 10, defense: 1, "special-attack": 10, "special-defense": 1, speed: 10 },
    });

    const result = simulateBattle(fast, fragile, chart);

    expect(result.winner).toBe("a");
    expect(result.finalHp.b).toBe(0);
    expect(result.finalHp.a).toBe(60);
  });

  it("limita a quantidade de turnos para evitar loop infinito", () => {
    const chart = new Map<string, PokemonTypeData>([
      ["normal", makeTypeData("normal")],
    ]);
    // HP altíssimo e defesa altíssima: dano mínimo, mas deve parar no limite.
    const tank = makePokemon({
      name: "tank",
      types: ["normal"],
      stats: { hp: 250, attack: 1, defense: 250, "special-attack": 1, "special-defense": 250, speed: 50 },
    });
    const tank2 = makePokemon({
      name: "tank2",
      types: ["normal"],
      stats: { hp: 250, attack: 1, defense: 250, "special-attack": 1, "special-defense": 250, speed: 50 },
    });

    const result = simulateBattle(tank, tank2, chart);

    // 50 turnos máximos, 2 golpes por turno (mesma velocidade) => até 100 logs.
    expect(result.log.length).toBeLessThanOrEqual(100);
  });
});
