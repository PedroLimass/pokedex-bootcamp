import styled from "styled-components";
import {
  pokedexColors,
  pokedexColorsBody,
  pokedexColorsDark,
} from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: var(--size-notebook);
  margin: 0 auto;
  flex-direction: row;
  padding-top: 6.25rem;
  flex-direction: column;
  align-items: center;

  .btnLoadMore {
    cursor: pointer;
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

    border-style: none;
  }

  .btnLoadMore:hover {
    background-color: ${pokedexColorsDark.water};
  }
`;

export const HeaderText = styled.p`
  width: 100%;
  font-family: Inter;
  font-size: 35px;
  font-weight: 400;
  line-height: 42px;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 30px;
`;

export const SearchBox = styled.input`
  max-width: 1088px;
  width: 100%;
  height: 53px;
  border-radius: 40px;
  border: 1px solid #f1f1f1;

  box-shadow: 4px 4px 16px 0px #011c401a;
  padding-left: 31px;
  font-family: Open Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  ::placeholder {
    color: ${pokedexColorsBody.tinyBlack};
  }
`;

export const SelectBox = styled.select`
  max-width: 135px;
  height: 20px;
  font-family: Open Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;

  option {
    font-family: Source Sans Pro;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  margin-top: 54px;
`;

export const LoadBtnRow = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;
  overflow: auto;

  > :first-child {
    position: sticky;
    margin-top: 15px;
  }
`;
