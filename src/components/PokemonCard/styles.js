import styled from "styled-components";
import { pokedexColorsBody } from "../../styles/theme";

export const Container = styled.div`
  width: 162px;
  height: 110px;
  border-radius: 15px;
  cursor: pointer;
  background-color: ${props => {
    return props.bgColor;
  }};
  padding: 9px 16px;
  display: flex;
  flex-direction: column;
`;

export const IdNumber = styled.div`
  width: 100%;
  min-height: 13px;

  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: right;
  color: ${props => {
    return props.idColor;
  }};
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
  min-width: 45px;
  min-height: 38px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TagType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 51px;
  height: 16px;

  font-family: "Source Sans Pro", sans-serif;
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: center;
  color: ${pokedexColorsBody.white};

  background: rgb(255, 255, 255, 0.4);
  border-radius: 38px;
`;

export const ImgPokemon = styled.img`
  max-width: 70px;
  max-height: 70px;
  width: 100%;
  height: auto;
`;
