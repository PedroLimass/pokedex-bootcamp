import { describe, expect, it } from "vitest";
import { capitalize, zeroPad } from "./capitalize";

describe("capitalize", () => {
  it("capitaliza a primeira letra de uma palavra", () => {
    expect(capitalize("pikachu")).toBe("Pikachu");
  });

  it("capitaliza cada palavra separada por espaço", () => {
    expect(capitalize("mr mime")).toBe("Mr Mime");
  });

  it("mantém string vazia sem erro", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("zeroPad", () => {
  it("formata com # e três dígitos", () => {
    expect(zeroPad(6)).toBe("#006");
    expect(zeroPad(25)).toBe("#025");
    expect(zeroPad(150)).toBe("#150");
  });

  it("não trunca números com mais de três dígitos", () => {
    expect(zeroPad(1025)).toBe("#1025");
  });
});
