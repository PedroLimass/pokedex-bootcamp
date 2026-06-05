import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { CustomLink } from "./index";
import { renderWithProviders } from "../../test/utils";

describe("CustomLink", () => {
  it("renderiza um link com o destino correto", () => {
    renderWithProviders(<CustomLink to="/pokemons">Pokémons</CustomLink>);
    const link = screen.getByRole("link", { name: "Pokémons" });
    expect(link).toHaveAttribute("href", "/pokemons");
  });

  it("marca como ativo quando a rota atual bate com o destino", () => {
    renderWithProviders(<CustomLink to="/compare">Comparar</CustomLink>, {
      route: "/compare",
    });
    expect(screen.getByRole("link", { name: "Comparar" })).toHaveClass(
      "active",
    );
  });

  it("não marca como ativo em outra rota", () => {
    renderWithProviders(<CustomLink to="/compare">Comparar</CustomLink>, {
      route: "/pokemons",
    });
    expect(screen.getByRole("link", { name: "Comparar" })).not.toHaveClass(
      "active",
    );
  });
});
