import * as S from "./styles";
import type { PokemonStat } from "../../types/pokemon";

interface ProgressStateProps {
  stats: PokemonStat[];
}

const STAT_CONFIG: { key: string; label: string; color: string }[] = [
  { key: "hp", label: "HP", color: "#FF5959" },
  { key: "attack", label: "Ataque", color: "#F5AC78" },
  { key: "defense", label: "Defesa", color: "#FAE078" },
  { key: "special-attack", label: "Atq. Esp.", color: "#9DB7F5" },
  { key: "special-defense", label: "Def. Esp.", color: "#A7DB8D" },
  { key: "speed", label: "Velocidade", color: "#FA92B2" },
];

const STAT_SCALE = 200;

const getStat = (stats: PokemonStat[], statName: string): number => {
  return stats.find((entry) => entry.stat.name === statName)?.base_stat ?? 0;
};

const ProgressState = ({ stats }: ProgressStateProps) => {
  const rows = STAT_CONFIG.map((config) => ({
    ...config,
    value: getStat(stats, config.key),
  }));

  const total = rows.reduce((sum, row) => sum + row.value, 0);

  return (
    <S.Container>
      <S.Title>Estatísticas base</S.Title>
      {rows.map((row) => (
        <S.RowProgress key={row.key}>
          <S.TextProgress>{row.label}</S.TextProgress>
          <S.ValueAbility>{row.value}</S.ValueAbility>
          <S.ProgressBarBox>
            <S.ProgressBarFill
              $pct={Math.min(100, (row.value / STAT_SCALE) * 100)}
              $color={row.color}
            />
          </S.ProgressBarBox>
        </S.RowProgress>
      ))}
      <S.TotalRow>
        <span>Total</span>
        <span>{total}</span>
      </S.TotalRow>
    </S.Container>
  );
};

export default ProgressState;
