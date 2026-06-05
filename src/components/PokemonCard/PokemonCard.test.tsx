import { describe, expect, it } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import PokemonCard from "./index";
import { renderWithProviders } from "../../test/utils";
import { installFetchMock } from "../../test/mockFetch";
import { makePokemon, makeTypeData } from "../../test/factories";

const charizard = makePokemon({
  id: 6,
  name: "charizard",
  types: ["fire", "flying"],
  stats: { hp: 78, attack: 84 },
});

describe("PokemonCard", () => {
  it("exibe nome, número e tipos", () => {
    installFetchMock({});
    renderWithProviders(<PokemonCard pokemon={charizard} />);

    expect(screen.getByText("Charizard")).toBeInTheDocument();
    expect(screen.getByText("#006")).toBeInTheDocument();
    expect(screen.getByText("Fogo")).toBeInTheDocument();
    expect(screen.getByText("Voador")).toBeInTheDocument();
  });

  it("abre o modal ao clicar no card", async () => {
    installFetchMock({
      species: {
        "6": { flavor_text_entries: [] },
      },
      types: {
        fire: makeTypeData("fire"),
        flying: makeTypeData("flying"),
      },
    });

    renderWithProviders(<PokemonCard pokemon={charizard} />);

    fireEvent.click(screen.getByText("Charizard"));

    // No modal há um botão de fechar — confirma que o modal abriu.
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Fechar modal" }),
      ).toBeInTheDocument(),
    );
  });
});
