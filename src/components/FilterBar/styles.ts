import styled from "styled-components";
import { pokedexColorsBody } from "../../styles/theme";
import { breakPoints } from "../../utils/screenSizes";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1088px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${breakPoints.ipadAir}) {
    width: 90%;
  }
`;

export const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 16px;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${pokedexColorsBody.tinyBlack};
`;

export const Select = styled.select`
  height: 44px;
  min-width: 200px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #e4e4e4;
  background: ${pokedexColorsBody.white};
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  cursor: pointer;

  @media (max-width: ${breakPoints.mobile}) {
    min-width: 0;
    width: 100%;
  }
`;

export const ClearButton = styled.button`
  height: 44px;
  padding: 0 18px;
  border: none;
  border-radius: 12px;
  background: rgba(1, 28, 64, 0.06);
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${pokedexColorsBody.tinyBlack};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(1, 28, 64, 0.12);
  }
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chip = styled.button<{ $color: string; $active: boolean }>`
  padding: 7px 14px;
  border-radius: 999px;
  border: 2px solid ${({ $color }) => $color};
  background: ${({ $active, $color }) => ($active ? $color : "transparent")};
  color: ${({ $active, $color }) =>
    $active ? pokedexColorsBody.white : $color};
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  filter: ${({ $active }) => ($active ? "saturate(1.1)" : "none")};

  &:hover {
    opacity: 0.85;
  }
`;
