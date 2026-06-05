import { describe, expect, it } from "vitest";
import {
  getAttackMultiplier,
  getBestTypeMultiplier,
} from "./typeEffectiveness";
import { makeTypeData } from "../test/factories";
import type { PokemonTypeData } from "../types/type";

const chart = new Map<string, PokemonTypeData>([
  [
    "fire",
    makeTypeData("fire", {
      double_damage_to: ["grass", "bug"],
      half_damage_to: ["water", "rock"],
    }),
  ],
  ["normal", makeTypeData("normal", { no_damage_to: ["ghost"] })],
]);

describe("getAttackMultiplier", () => {
  it("dobra contra tipo fraco", () => {
    expect(getAttackMultiplier("fire", ["grass"], chart)).toBe(2);
  });

  it("reduz pela metade contra tipo resistente", () => {
    expect(getAttackMultiplier("fire", ["water"], chart)).toBe(0.5);
  });

  it("combina multiplicadores em tipo duplo", () => {
    expect(getAttackMultiplier("fire", ["grass", "water"], chart)).toBe(1);
  });

  it("zera quando há imunidade", () => {
    expect(getAttackMultiplier("normal", ["ghost"], chart)).toBe(0);
  });

  it("retorna 1 para tipo neutro", () => {
    expect(getAttackMultiplier("fire", ["normal"], chart)).toBe(1);
  });

  it("retorna 1 quando o tipo atacante não está no chart", () => {
    expect(getAttackMultiplier("dragon", ["grass"], chart)).toBe(1);
  });
});

describe("getBestTypeMultiplier", () => {
  it("usa o melhor multiplicador entre os tipos do atacante", () => {
    expect(getBestTypeMultiplier(["fire", "normal"], ["grass"], chart)).toBe(2);
  });
});
