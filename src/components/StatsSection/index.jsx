import * as S from "./styles";
import HeightIcon from "../../assets/height.svg";
import WeightIcon from "../../assets/weight.svg";
import { capitalize } from "../../utils/capitalize";

const StatsSection = ({ weight, height, ability }) => {
  return (
    <S.Container>
      <S.BoxData>
        <S.DataTextAndIcon>
          <img src={WeightIcon} alt="Icone de Balança" />
          <S.TextStates>{weight / 10} kg</S.TextStates>
        </S.DataTextAndIcon>
        <S.TitleState>Peso</S.TitleState>
      </S.BoxData>
      <S.BoxData>
        <S.DataTextAndIcon>
          <img src={HeightIcon} alt="Icone de Régua" />
          <S.TextStates>{height / 10} m</S.TextStates>
        </S.DataTextAndIcon>
        <S.TitleState>Altura</S.TitleState>
      </S.BoxData>
      <S.BoxData>
        <S.DataTextAndIconLast>
          <S.TextStatesLast>{capitalize(ability)}</S.TextStatesLast>
        </S.DataTextAndIconLast>
        <S.TitleState>Poder Principal</S.TitleState>
      </S.BoxData>
    </S.Container>
  );
};

export default StatsSection;
