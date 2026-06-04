import styled from "styled-components";
import { pokedexColors, pokedexColorsBody } from "../../styles/theme";

export const ContainerCustom = styled.div`
  a {
    display: inline-flex;
    align-items: center;
    padding: 9px 18px;
    border-radius: 999px;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: ${pokedexColorsBody.tinyBlack};
    transition:
      background 0.2s ease,
      color 0.2s ease;
  }

  a:hover {
    background: rgba(1, 28, 64, 0.06);
  }

  a.active {
    background: ${pokedexColors.water};
    color: ${pokedexColorsBody.white};
    font-weight: 600;
  }
`;
