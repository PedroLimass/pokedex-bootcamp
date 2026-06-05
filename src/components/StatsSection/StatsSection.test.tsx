import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import StatsSection from "./index";

describe("StatsSection", () => {
  it("converte peso e altura para kg e metros", () => {
    render(<StatsSection weight={905} height={17} ability="blaze" />);
    expect(screen.getByText("90.5 kg")).toBeInTheDocument();
    expect(screen.getByText("1.7 m")).toBeInTheDocument();
  });

  it("capitaliza a habilidade principal", () => {
    render(<StatsSection weight={100} height={10} ability="blaze" />);
    expect(screen.getByText("Blaze")).toBeInTheDocument();
  });

  it("renderiza os rótulos das seções", () => {
    render(<StatsSection weight={100} height={10} ability="blaze" />);
    expect(screen.getByText("Peso")).toBeInTheDocument();
    expect(screen.getByText("Altura")).toBeInTheDocument();
    expect(screen.getByText("Poder Principal")).toBeInTheDocument();
  });
});
