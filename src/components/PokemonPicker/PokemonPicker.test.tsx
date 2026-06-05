import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import PokemonPicker from "./index";
import { renderWithProviders } from "../../test/utils";
import { installFetchMock } from "../../test/mockFetch";
import { makePokemon } from "../../test/factories";

const index = [
  { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
];

describe("PokemonPicker", () => {
  it("mostra sugestões ao digitar e seleciona uma", async () => {
    installFetchMock({ index });
    const onSelect = vi.fn();

    renderWithProviders(
      <PokemonPicker label="Pokémon A" selectedName={null} onSelect={onSelect} />,
    );

    const input = screen.getByPlaceholderText("Buscar por nome ou ID...");
    fireEvent.change(input, { target: { value: "pika" } });

    const option = await screen.findByText("Pikachu");
    fireEvent.click(option);

    expect(onSelect).toHaveBeenCalledWith("pikachu");
  });

  it("exibe o card do Pokémon selecionado e permite trocar", async () => {
    const pikachu = makePokemon({ id: 25, name: "pikachu", types: ["electric"] });
    installFetchMock({ index, pokemon: { pikachu } });
    const onSelect = vi.fn();

    renderWithProviders(
      <PokemonPicker
        label="Pokémon A"
        selectedName="pikachu"
        onSelect={onSelect}
      />,
    );

    await waitFor(() =>
      expect(screen.getByText("Pikachu")).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByRole("button", { name: "Trocar Pokémon" }));
    expect(onSelect).toHaveBeenCalledWith(null);
  });
});
