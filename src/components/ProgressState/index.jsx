// import ProgressBar from "react-progress-bar";
import { ProgressBar } from "ms-react-progress-bar";
import "ms-react-progress-bar/dist/ProgressBar.css";

import * as S from "./styles";

const ProgressState = ({ stats }) => {
  const attack = stats[1].base_stat;
  const defense = stats[2].base_stat;
  const speed = stats[5].base_stat;
  const total = attack + defense + speed;

  const Ataque = {
    height: "9px",
    borderRadius: "20px",
    labelSize: "12px",
    labelVisibility: false,
    barColor: "#48d0b0",
    containerStyle: "none",
  };

  const Defesa = {
    height: "9px",
    borderRadius: "20px",
    labelSize: "12px",
    labelVisibility: false,
    barColor: "#FB6C6C",
    containerStyle: "none",
  };

  const Total = {
    maxValue: 500,
    height: "9px",
    borderRadius: "20px",
    labelSize: "12px",
    labelVisibility: false,
    barColor: "#4BC07A",
    containerStyle: "none",
  };

  return (
    <S.Container>
      <S.RowProgress>
        <S.TextProgress>Ataque</S.TextProgress>
        <S.ValueAbility>{attack}</S.ValueAbility>
        <S.ProgressBarBox>
          <ProgressBar value={attack} options={Ataque} />
        </S.ProgressBarBox>
      </S.RowProgress>

      <S.RowProgress>
        <S.TextProgress>Defesa</S.TextProgress>
        <S.ValueAbility>{defense}</S.ValueAbility>
        <S.ProgressBarBox>
          <ProgressBar value={defense} options={Defesa} />
        </S.ProgressBarBox>
      </S.RowProgress>

      <S.RowProgress>
        <S.TextProgress>Vl. Ataque</S.TextProgress>
        <S.ValueAbility>{speed}</S.ValueAbility>
        <S.ProgressBarBox>
          <ProgressBar value={speed} options={Ataque} />
        </S.ProgressBarBox>
      </S.RowProgress>

      <S.RowProgress>
        <S.TextProgress>Total</S.TextProgress>
        <S.ValueAbility>{total}</S.ValueAbility>
        <S.ProgressBarBox>
          <ProgressBar value={total} options={Total} />
        </S.ProgressBarBox>
      </S.RowProgress>
    </S.Container>
  );
};

export default ProgressState;
