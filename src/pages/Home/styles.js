import styled from "styled-components";
import {
  pokedexColorsBody,
  pokedexColors,
  pokedexColorsDark,
} from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: var(--size-notebook);
  margin: 0 auto;
  flex-direction: row;
  padding-top: 6.25rem;
`;

export const InfoPokedex = styled.div`
  min-width: 483px;
  h1 {
    font-family: Inter;
    font-size: 54px;
    font-weight: 800;
    line-height: 76px;
    color: ${pokedexColorsBody.black};
    margin-bottom: 20px;
  }

  p {
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 36px;
    letter-spacing: 0.02em;
    margin-bottom: 60px;
  }

  .btnPokemonPage {
    height: 66px;
    padding: 18px 27px 24px;
    background-color: ${pokedexColors.water};
    border-radius: 11px;
    font-family: Inter;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    color: ${pokedexColorsBody.white};
  }

  .btnPokemonPage:hover {
    background-color: ${pokedexColorsDark.water};
  }
`;

export const AssetSide = styled.div`
  width: 100%;
  height: auto;
`;
