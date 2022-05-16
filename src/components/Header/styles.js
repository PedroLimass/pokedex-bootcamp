import styled from "styled-components";
import { pokedexColorsBody } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 93px;
  background-color: ${pokedexColorsBody.white};
  justify-content: center;
  box-shadow: 0px 4px 16px 0px #011c4033;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  max-width: var(--size-notebook);
  width: 90%;
  height: 100%;
  padding-right: 9.6rem;

  justify-content: space-between;

  img {
    width: 159px;
    height: 60px;
  }
`;

export const Menu = styled.nav`
  display: flex;
  min-width: 320px;
  gap: 110px;
  color: black;
  justify-content: space-between;

  a {
    font-family: "Open Sans", sans-serif;
    color: ${pokedexColorsBody.tinyBlack};
    font-size: 25px;
    font-weight: 400;
    line-height: 34px;
  }
`;
