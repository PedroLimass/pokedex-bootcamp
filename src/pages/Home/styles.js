import styled from "styled-components";
import {
  pokedexColorsBody,
  pokedexColors,
  pokedexColorsDark,
} from "../../styles/theme";
import { breakPoints } from "../../utils/screenSizes";

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: var(--size-notebook);
  margin: 0 auto;
  flex-direction: row;
  padding-top: 6.25rem;

  @media (max-width: ${breakPoints.ipadAir}) {
    flex-direction: column;
    padding: 2.25rem 10% 0;
  }
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

    @media (max-width: ${breakPoints.mobile}) {
      font-size: 32px;
      line-height: 46px;
    }
  }

  p {
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 36px;
    letter-spacing: 0.02em;
    margin-bottom: 60px;

    @media (max-width: ${breakPoints.mobile}) {
      font-size: 13px;
      line-height: 28px;
    }
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

    @media (max-width: ${breakPoints.mobile}) {
      margin: 0 auto;
    }
  }

  .btnPokemonPage:hover {
    background-color: ${pokedexColorsDark.water};
  }

  @media (max-width: ${breakPoints.mobile}) {
    min-width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const AssetSide = styled.div`
  width: 100%;
  height: auto;

  .imgResponsive {
    width: auto;
    height: auto;
    margin-top: 10%;
    @media (max-width: ${breakPoints.mobile}) {
      max-width: 440px;
    }
  }
`;
