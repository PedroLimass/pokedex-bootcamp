import styled from "styled-components";
import { pokedexColorsBody } from "../../styles/theme";

export const Container = styled.div<{ $bgColor: string }>`
  width: 100%;
  height: 110px;
  border-radius: 15px;
  cursor: pointer;
  background-color: ${({ $bgColor }) => $bgColor};
  padding: 9px 16px;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 18px rgba(1, 28, 64, 0.18);
  }
`;

export const IdNumber = styled.div<{ $idColor: string }>`
  width: 100%;
  min-height: 13px;

  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: right;
  color: ${({ $idColor }) => $idColor};
`;

export const PokemonName = styled.div`
  width: 100%;
  min-height: 13px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: ${pokedexColorsBody.white};
`;

export const RowData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
`;

export const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const TypeSide = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

export const ImgPokemon = styled.img`
  max-width: 70px;
  max-height: 70px;
  width: 100%;
  height: auto;
`;
