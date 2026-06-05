import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import Modal from "./index";
import { renderWithProviders } from "../../test/utils";
import { installFetchMock } from "../../test/mockFetch";
import { makePokemon, makeTypeData } from "../../test/factories";

const charizard = makePokemon({
  id: 6,
  name: "charizard",
  types: ["fire", "flying"],
  abilities: [{ name: "blaze" }, { name: "solar-power", hidden: true }],
  stats: { hp: 78, attack: 84, speed: 100 },
});

function renderModal(onClose = vi.fn()) {
  return {
    onClose,
    ...renderWithProviders(
      <Modal
        pokemon={charizard}
        pokemonName="Charizard"
        bgColor="#fff"
        idColor="#000"
        image="img"
        onClose={onClose}
      />,
    ),
  };
}

describe("Modal", () => {
  it("renderiza nome, número e habilidades", () => {
    installFetchMock({ types: {} });
    renderModal();

    expect(screen.getByRole("heading", { name: "Charizard" })).toBeInTheDocument();
    expect(screen.getByText("#006")).toBeInTheDocument();
    expect(screen.getByText("blaze")).toBeInTheDocument();
    expect(screen.getByText("(oculta)")).toBeInTheDocument();
  });

  it("exibe a descrição vinda da species", async () => {
    installFetchMock({
      types: {},
      species: {
        "6": {
          flavor_text_entries: [
            {
              flavor_text: "Cospe\nfogo intenso.",
              language: { name: "en", url: "" },
            },
          ],
        },
      },
    });

    renderModal();

    await waitFor(() =>
      expect(screen.getByText("Cospe fogo intenso.")).toBeInTheDocument(),
    );
  });

  it("mostra fraquezas quando o type chart carrega", async () => {
    installFetchMock({
      types: {
        fire: makeTypeData("fire", { double_damage_from: ["water"] }),
        flying: makeTypeData("flying", { double_damage_from: ["rock"] }),
      },
    });

    renderModal();

    await waitFor(() =>
      expect(screen.getByText("Fraquezas")).toBeInTheDocument(),
    );
  });

  it("fecha pelo botão de fechar", () => {
    installFetchMock({ types: {} });
    const { onClose } = renderModal();

    fireEvent.click(screen.getByRole("button", { name: "Fechar modal" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("fecha ao pressionar Escape", () => {
    installFetchMock({ types: {} });
    const { onClose } = renderModal();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });
});
