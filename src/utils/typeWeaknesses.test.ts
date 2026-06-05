import { describe, expect, it } from "vitest";
import { getWeaknesses } from "./typeWeaknesses";
import { makeTypeData } from "../test/factories";
import type { PokemonTypeData } from "../types/type";

const chart = new Map<string, PokemonTypeData>([
  [
    "fire",
    makeTypeData("fire", {
      double_damage_from: ["water", "ground", "rock"],
      half_damage_from: ["fire", "grass"],
    }),
  ],
  [
    "flying",
    makeTypeData("flying", {
      double_damage_from: ["rock", "electric", "ice"],
      no_damage_from: ["ground"],
    }),
  ],
]);

describe("getWeaknesses", () => {
  it("lista os tipos que causam dano dobrado", () => {
    const result = getWeaknesses(["fire"], chart);
    expect(result).toEqual([
      { type: "water", multiplier: 2 },
      { type: "ground", multiplier: 2 },
      { type: "rock", multiplier: 2 },
    ]);
  });

  it("combina tipos duplos gerando fraqueza 4x", () => {
    // rock é 2x contra fire e 2x contra flying -> 4x
    const result = getWeaknesses(["fire", "flying"], chart);
    const rock = result.find((entry) => entry.type === "rock");
    expect(rock?.multiplier).toBe(4);
  });

  it("anula fraqueza quando o outro tipo é imune", () => {
    // ground é 2x contra fire, mas 0x contra flying -> 0, não é fraqueza
    const result = getWeaknesses(["fire", "flying"], chart);
    expect(result.some((entry) => entry.type === "ground")).toBe(false);
  });

  it("ordena por multiplicador decrescente", () => {
    const result = getWeaknesses(["fire", "flying"], chart);
    expect(result[0].multiplier).toBeGreaterThanOrEqual(
      result[result.length - 1].multiplier,
    );
  });
});
