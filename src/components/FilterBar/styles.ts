import styled from "styled-components";
import { pokedexColorsBody } from "../../styles/theme";
import { breakPoints } from "../../utils/screenSizes";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1088px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 22px 24px;
  border-radius: 20px;
  background: ${pokedexColorsBody.white};
  border: 1px solid #eef0f3;
  box-shadow: 0 8px 24px rgba(1, 28, 64, 0.06);

  @media (max-width: ${breakPoints.ipadAir}) {
    width: 90%;
  }

  @media (max-width: ${breakPoints.mobile}) {
    padding: 18px 16px;
    gap: 16px;
  }
`;

export const SearchField = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: rgba(33, 33, 33, 0.35);
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 16px 0 46px;
  border-radius: 14px;
  border: 1px solid #e4e4e4;
  background: #f7f8fa;
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  color: ${pokedexColorsBody.black};
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &::placeholder {
    color: rgba(33, 33, 33, 0.4);
  }

  &:hover {
    border-color: #d6d9de;
  }

  &:focus-visible {
    outline: none;
    border-color: #77bdfe;
    background: ${pokedexColorsBody.white};
  }
`;

export const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 16px;

  @media (max-width: ${breakPoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${pokedexColorsBody.tinyBlack};

  @media (max-width: ${breakPoints.mobile}) {
    width: 100%;
  }
`;

export const Select = styled.select`
  height: 44px;
  min-width: 190px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #e4e4e4;
  background: ${pokedexColorsBody.white};
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus-visible {
    outline: none;
    border-color: #77bdfe;
  }

  @media (max-width: ${breakPoints.mobile}) {
    min-width: 0;
    width: 100%;
  }
`;

export const ClearButton = styled.button`
  height: 44px;
  margin-left: auto;
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

  @media (max-width: ${breakPoints.mobile}) {
    margin-left: 0;
    width: 100%;
  }
`;

export const ChipsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 18px;
  border-top: 1px solid #f1f2f4;
`;

export const ChipsLabel = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${pokedexColorsBody.tinyBlack};
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
