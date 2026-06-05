import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ProgressState from "./index";
import { makePokemon } from "../../test/factories";

const stats = makePokemon({
  stats: {
    hp: 78,
    attack: 84,
    defense: 78,
    "special-attack": 109,
    "special-defense": 85,
    speed: 100,
  },
}).stats;

describe("ProgressState", () => {
  it("exibe todos os 6 stats base", () => {
    render(<ProgressState stats={stats} />);
    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("Ataque")).toBeInTheDocument();
    expect(screen.getByText("Defesa")).toBeInTheDocument();
    expect(screen.getByText("Atq. Esp.")).toBeInTheDocument();
    expect(screen.getByText("Def. Esp.")).toBeInTheDocument();
    expect(screen.getByText("Velocidade")).toBeInTheDocument();
  });

  it("calcula o total correto (soma dos 6 stats)", () => {
    render(<ProgressState stats={stats} />);
    // 78+84+78+109+85+100 = 534
    expect(screen.getByText("534")).toBeInTheDocument();
  });

  it("trata stats ausentes como 0", () => {
    render(<ProgressState stats={[]} />);
    const total = screen.getByText("Total").closest("div") as HTMLElement;
    expect(within(total).getByText("0")).toBeInTheDocument();
  });
});
