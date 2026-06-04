import styled from "styled-components";
import { pokedexColorsBody } from "../../styles/theme";

export const TagType = styled.span<{ $size?: "high" }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  padding: ${({ $size }) => ($size === "high" ? "7px 16px" : "4px 12px")};

  font-family: "Inter", sans-serif;
  font-size: ${({ $size }) => ($size === "high" ? "14px" : "12px")};
  font-weight: 600;
  letter-spacing: 0.2px;
  text-align: center;
  color: ${pokedexColorsBody.white};

  background: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
`;
