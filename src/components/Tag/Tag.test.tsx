import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TagType from "./index";

describe("TagType", () => {
  it("traduz o nome do tipo para português", () => {
    render(<TagType>grass</TagType>);
    expect(screen.getByText("Planta")).toBeInTheDocument();
  });

  it("usa fallback capitalizado para tipo desconhecido", () => {
    render(<TagType>mistério</TagType>);
    expect(screen.getByText("Mistério")).toBeInTheDocument();
  });
});
