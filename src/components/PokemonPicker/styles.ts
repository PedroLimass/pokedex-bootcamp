import styled from "styled-components";
import { pokedexColorsBody } from "../../styles/theme";
import { breakPoints } from "../../utils/screenSizes";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 360px;
  position: relative;
`;

export const Label = styled.label`
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${pokedexColorsBody.black};
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 40px;
  border: 1px solid #f1f1f1;
  box-shadow: 4px 4px 16px 0px #011c401a;
  padding: 0 20px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;

  ::placeholder {
    color: ${pokedexColorsBody.tinyBlack};
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: 88px;
  left: 0;
  right: 0;
  z-index: 5;
  background: ${pokedexColorsBody.white};
  border-radius: 12px;
  box-shadow: 4px 8px 24px rgba(1, 28, 64, 0.15);
  max-height: 240px;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 8px 0;
`;

export const DropdownItem = styled.li`
  padding: 10px 20px;
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  cursor: pointer;
  text-transform: capitalize;

  &:hover {
    background: #f5f5f5;
  }
`;

export const SelectedCard = styled.div<{ $bgColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-radius: 16px;
  background-color: ${({ $bgColor }) => $bgColor};
  min-height: 200px;

  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }

  h3 {
    font-family: "Inter", sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: ${pokedexColorsBody.white};
    text-transform: capitalize;
  }

  button {
    margin-top: 4px;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.35);
    color: ${pokedexColorsBody.white};
    font-family: "Inter", sans-serif;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }

  @media (max-width: ${breakPoints.mobile}) {
    min-height: 160px;

    img {
      width: 90px;
      height: 90px;
    }
  }
`;
