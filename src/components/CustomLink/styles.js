import styled from "styled-components";
import { pokedexColorsBody } from "../../styles/theme";
import { breakPoints } from "../../utils/screenSizes";

export const ContainerCustom = styled.div`
  .active {
    font-family: "Open Sans", sans-serif;
    font-size: 25px;
    font-weight: 700;
    line-height: 34px;
    text-decoration: underline ${pokedexColorsBody.tinyBlack} 3px;
    text-underline-offset: 11px;
  }

  @media (max-width: ${breakPoints.ipadAir}) {
    background-color: #fff;

    padding: 10px 30px;
    .active {
      text-underline-offset: 3px;
    }

    @media (max-width: ${breakPoints.mobile}) {
      padding: 10px 35px 10px 10px;
    }
  }
`;
