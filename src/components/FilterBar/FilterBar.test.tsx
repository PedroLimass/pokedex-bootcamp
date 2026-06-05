import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import FilterBar from "./index";
import { POKEMON_TYPES } from "../../constants/pokemon";

const setup = (overrides = {}) => {
  const props = {
    search: "",
    onSearchChange: vi.fn(),
    selectedTypes: [] as string[],
    onToggleType: vi.fn(),
    generation: null as number | null,
    onGenerationChange: vi.fn(),
    sort: "relevance" as const,
    onSortChange: vi.fn(),
    onClear: vi.fn(),
    ...overrides,
  };
  render(<FilterBar {...props} />);
  return props;
};

describe("FilterBar", () => {
  it("dispara onSearchChange ao digitar na busca", () => {
    const { onSearchChange } = setup();
    const input = screen.getByLabelText("Buscar pokemon por nome ou número");
    fireEvent.change(input, { target: { value: "pika" } });
    expect(onSearchChange).toHaveBeenCalledWith("pika");
  });

  it("renderiza um chip para cada tipo", () => {
    setup();
    expect(screen.getByRole("button", { name: "Fogo" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Água" })).toBeInTheDocument();
    // Todos os 18 tipos viram chips (+ nenhum botão extra sem filtro ativo).
    expect(screen.getAllByRole("button")).toHaveLength(POKEMON_TYPES.length);
  });

  it("dispara onToggleType com o slug do tipo ao clicar no chip", () => {
    const { onToggleType } = setup();
    fireEvent.click(screen.getByRole("button", { name: "Fogo" }));
    expect(onToggleType).toHaveBeenCalledWith("fire");
  });

  it("marca o chip ativo via aria-pressed", () => {
    setup({ selectedTypes: ["fire"] });
    expect(screen.getByRole("button", { name: "Fogo" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("dispara onSortChange ao trocar a ordenação", () => {
    const { onSortChange } = setup();
    const [sortSelect] = screen.getAllByRole("combobox");
    fireEvent.change(sortSelect, { target: { value: "name-asc" } });
    expect(onSortChange).toHaveBeenCalledWith("name-asc");
  });

  it("dispara onGenerationChange com número e com null", () => {
    const { onGenerationChange } = setup();
    const [, generationSelect] = screen.getAllByRole("combobox");

    fireEvent.change(generationSelect, { target: { value: "1" } });
    expect(onGenerationChange).toHaveBeenCalledWith(1);

    fireEvent.change(generationSelect, { target: { value: "" } });
    expect(onGenerationChange).toHaveBeenCalledWith(null);
  });

  it("mostra 'Limpar filtros' apenas quando há filtros ativos", () => {
    const { onClear } = setup({ selectedTypes: ["fire"] });
    const clearButton = screen.getByRole("button", { name: "Limpar filtros" });
    fireEvent.click(clearButton);
    expect(onClear).toHaveBeenCalled();
  });

  it("não mostra 'Limpar filtros' sem filtros ativos", () => {
    setup();
    expect(
      screen.queryByRole("button", { name: "Limpar filtros" }),
    ).not.toBeInTheDocument();
  });
});
