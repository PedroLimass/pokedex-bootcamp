import styled from "styled-components";
import { pokedexColorsBody } from "../../styles/theme";

export const ContainerCustom = styled.div`
  .active {
    font-family: "Open Sans", sans-serif;
    font-size: 25px;
    font-weight: 700;
    line-height: 34px;
    text-decoration: underline ${pokedexColorsBody.tinyBlack} 3px;
    text-underline-offset: 11px;
  }
`;
