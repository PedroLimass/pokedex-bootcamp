import { describe, expect, it } from "vitest";
import { fireEvent, screen, within } from "@testing-library/react";
import Header from "./index";
import { renderWithProviders } from "../../test/utils";

describe("Header", () => {
  it("renderiza os links de navegação", () => {
    renderWithProviders(<Header />);
    // Home/Pokémons/Comparar aparecem no nav desktop e no mobile, então há
    // múltiplas ocorrências — basta garantir que existem.
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getAllByRole("link", { name: "Pokémons" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: "Comparar" }).length,
    ).toBeGreaterThan(0);
  });

  it("não renderiza link de Contato", () => {
    renderWithProviders(<Header />);
    expect(screen.queryByRole("link", { name: "Contato" })).toBeNull();
  });

  it("alterna o menu mobile pelo botão", () => {
    renderWithProviders(<Header />);
    // O botão fica com display:none no desktop, então consultamos direto pelo
    // aria-label em vez do accessible-name (que vem vazio em elemento oculto).
    const button = screen.getByLabelText("Abrir menu");
    fireEvent.click(button);
    expect(screen.getByLabelText("Fechar menu")).toBeInTheDocument();
  });

  it("aponta o logo para a home", () => {
    renderWithProviders(<Header />);
    const logoLink = screen.getByRole("link", { name: /logo/i });
    expect(within(logoLink).getByRole("img")).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
