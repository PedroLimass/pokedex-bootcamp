import { ProgressBar } from "ms-react-progress-bar";
import "ms-react-progress-bar/dist/ProgressBar.css";
import * as S from "./styles";
import type { PokemonStat } from "../../types/pokemon";

interface ProgressStateProps {
  stats: PokemonStat[];
}

const getStat = (stats: PokemonStat[], statName: string): number => {
  return stats.find((entry) => entry.stat.name === statName)?.base_stat ?? 0;
};

const baseBarOptions = {
  height: "9px",
  borderRadius: "20px",
  labelSize: "12px",
  labelVisibility: false,
  containerStyle: "none",
};

const ProgressState = ({ stats }: ProgressStateProps) => {
  const attack = getStat(stats, "attack");
  const defense = getStat(stats, "defense");
  const speed = getStat(stats, "speed");
  const total = attack + defense + speed;

  const attackOptions = { ...baseBarOptions, barColor: "#48d0b0" };
  const defenseOptions = { ...baseBarOptions, barColor: "#FB6C6C" };
  const totalOptions = { ...baseBarOptions, maxValue: 500, barColor: "#4BC07A" };

  return (
    <S.Container>
      <S.RowProgress>
        <S.TextProgress>Ataque</S.TextProgress>
        <S.ValueAbility>{attack}</S.ValueAbility>
        <S.ProgressBarBox>
          <ProgressBar value={attack} options={attackOptions} />
        </S.ProgressBarBox>
      </S.RowProgress>

      <S.RowProgress>
        <S.TextProgress>Defesa</S.TextProgress>
        <S.ValueAbility>{defense}</S.ValueAbility>
        <S.ProgressBarBox>
          <ProgressBar value={defense} options={defenseOptions} />
        </S.ProgressBarBox>
      </S.RowProgress>

      <S.RowProgress>
        <S.TextProgress>Velocidade</S.TextProgress>
        <S.ValueAbility>{speed}</S.ValueAbility>
        <S.ProgressBarBox>
          <ProgressBar value={speed} options={attackOptions} />
        </S.ProgressBarBox>
      </S.RowProgress>

      <S.RowProgress>
        <S.TextProgress>Total</S.TextProgress>
        <S.ValueAbility>{total}</S.ValueAbility>
        <S.ProgressBarBox>
          <ProgressBar value={total} options={totalOptions} />
        </S.ProgressBarBox>
      </S.RowProgress>
    </S.Container>
  );
};

export default ProgressState;
