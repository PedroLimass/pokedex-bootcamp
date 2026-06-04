import { Fragment, useMemo, useState } from "react";
import { Loading } from "react-loading-dot";
import PokemonPicker from "../../components/PokemonPicker";
import {
  useCompareBattle,
  usePokemonByName,
} from "../../hooks/useCompareBattle";
import { capitalize } from "../../utils/capitalize";
import { getPokemonStat, getPokemonTypeNames } from "../../utils/pokemonStats";
import { getBestTypeMultiplier } from "../../utils/typeEffectiveness";
import { useTypeChart } from "../../hooks/useTypeChart";
import { getPokemonImage } from "../../services/pokeApi";
import { pokedexColors, pokedexColorsBody } from "../../styles/theme";
import * as S from "./styles";

type CombatantState = "winner" | "loser" | "draw";

const hpBarColor = (pct: number): string => {
  if (pct > 50) return pokedexColors.grass;
  if (pct > 20) return pokedexColors.electric;
  return pokedexColors.fire;
};

export const ComparePage = () => {
  const [nameA, setNameA] = useState<string | null>(null);
  const [nameB, setNameB] = useState<string | null>(null);
  const [hasCompared, setHasCompared] = useState(false);

  const queryA = usePokemonByName(nameA);
  const queryB = usePokemonByName(nameB);

  const pokemonA = queryA.data ?? null;
  const pokemonB = queryB.data ?? null;

  const canCompare = Boolean(pokemonA && pokemonB);
  const { result, isLoading, isReady } = useCompareBattle(
    hasCompared ? pokemonA : null,
    hasCompared ? pokemonB : null,
  );

  const previewTypes = useMemo(() => {
    if (!pokemonA || !pokemonB) return [];
    return [...getPokemonTypeNames(pokemonA), ...getPokemonTypeNames(pokemonB)];
  }, [pokemonA, pokemonB]);

  const { typeChart, isReady: typesReady } = useTypeChart(
    hasCompared ? previewTypes : [],
  );

  const typeAdvantage = useMemo(() => {
    if (!pokemonA || !pokemonB || !typesReady) return null;
    const multA = getBestTypeMultiplier(
      getPokemonTypeNames(pokemonA),
      getPokemonTypeNames(pokemonB),
      typeChart,
    );
    const multB = getBestTypeMultiplier(
      getPokemonTypeNames(pokemonB),
      getPokemonTypeNames(pokemonA),
      typeChart,
    );
    return { multA, multB };
  }, [pokemonA, pokemonB, typeChart, typesReady]);

  const handleCompare = () => {
    if (canCompare) setHasCompared(true);
  };

  const handleReset = () => {
    setHasCompared(false);
    setNameA(null);
    setNameB(null);
  };

  const winnerName =
    result?.winner === "a"
      ? pokemonA?.name
      : result?.winner === "b"
        ? pokemonB?.name
        : null;

  return (
    <S.Container>
      <S.HeaderText>Comparar Pokémons</S.HeaderText>
      <S.Subtitle>
        Escolha dois Pokémons e simule uma batalha 1v1 com stats base e
        eficácia de tipos da PokeAPI.
      </S.Subtitle>

      <S.Arena>
        <PokemonPicker
          label="Pokémon 1"
          selectedName={nameA}
          onSelect={(name) => {
            setNameA(name);
            setHasCompared(false);
          }}
        />
        <S.VsBadge>VS</S.VsBadge>
        <PokemonPicker
          label="Pokémon 2"
          selectedName={nameB}
          onSelect={(name) => {
            setNameB(name);
            setHasCompared(false);
          }}
        />
      </S.Arena>

      <S.CompareBtn
        type="button"
        disabled={!canCompare}
        onClick={handleCompare}
      >
        Simular batalha
      </S.CompareBtn>

      {!hasCompared && (
        <S.Hint>Selecione os dois Pokémons e clique em simular.</S.Hint>
      )}

      {hasCompared && isLoading && (
        <S.Hint>
          <Loading
            size="0.5rem"
            margin="8px"
            background={pokedexColorsBody.tinyBlack}
          />
        </S.Hint>
      )}

      {hasCompared && isReady && result && pokemonA && pokemonB && (
        <S.ResultPanel>
          <S.WinnerBanner>
            <h2>
              {result.winner === "draw"
                ? "Empate!"
                : `${capitalize(winnerName ?? "")} vence!`}
            </h2>
            <p>{result.summary}</p>
          </S.WinnerBanner>

          <S.Combatants>
            {[pokemonA, pokemonB].map((pokemon, index) => {
              const side: "a" | "b" = index === 0 ? "a" : "b";
              const state: CombatantState =
                result.winner === "draw"
                  ? "draw"
                  : result.winner === side
                    ? "winner"
                    : "loser";
              const maxHp = getPokemonStat(pokemon, "hp");
              const finalHp = result.finalHp[side];
              const pct = maxHp > 0 ? Math.round((finalHp / maxHp) * 100) : 0;

              const combatant = (
                <S.Combatant key={pokemon.id} $state={state}>
                  {state === "winner" && <S.Crown>👑</S.Crown>}
                  <img src={getPokemonImage(pokemon)} alt={pokemon.name} />
                  <S.CombatantName>{capitalize(pokemon.name)}</S.CombatantName>
                  <S.HpBarTrack>
                    <S.HpBarFill $pct={pct} $color={hpBarColor(pct)} />
                  </S.HpBarTrack>
                  <S.HpText>
                    {finalHp}/{maxHp} HP
                  </S.HpText>
                </S.Combatant>
              );

              return index === 0 ? (
                <Fragment key={pokemon.id}>
                  {combatant}
                  <S.ResultVs>VS</S.ResultVs>
                </Fragment>
              ) : (
                combatant
              );
            })}
          </S.Combatants>

          <S.Meta>Batalha resolvida em {result.turns} golpe(s)</S.Meta>

          <S.CompareTable>
            <S.CompareRow>
              <S.CompareCell
                $align="left"
                $highlight={
                  getPokemonStat(pokemonA, "hp") >
                  getPokemonStat(pokemonB, "hp")
                }
              >
                {getPokemonStat(pokemonA, "hp")}
              </S.CompareCell>
              <S.CompareLabel>HP base</S.CompareLabel>
              <S.CompareCell
                $align="right"
                $highlight={
                  getPokemonStat(pokemonB, "hp") >
                  getPokemonStat(pokemonA, "hp")
                }
              >
                {getPokemonStat(pokemonB, "hp")}
              </S.CompareCell>
            </S.CompareRow>

            <S.CompareRow>
              <S.CompareCell
                $align="left"
                $highlight={
                  getPokemonStat(pokemonA, "speed") >
                  getPokemonStat(pokemonB, "speed")
                }
              >
                {getPokemonStat(pokemonA, "speed")}
              </S.CompareCell>
              <S.CompareLabel>Velocidade</S.CompareLabel>
              <S.CompareCell
                $align="right"
                $highlight={
                  getPokemonStat(pokemonB, "speed") >
                  getPokemonStat(pokemonA, "speed")
                }
              >
                {getPokemonStat(pokemonB, "speed")}
              </S.CompareCell>
            </S.CompareRow>

            {typeAdvantage && (
              <S.CompareRow>
                <S.CompareCell
                  $align="left"
                  $highlight={typeAdvantage.multA > typeAdvantage.multB}
                >
                  {typeAdvantage.multA}x
                </S.CompareCell>
                <S.CompareLabel>Vantagem de tipo</S.CompareLabel>
                <S.CompareCell
                  $align="right"
                  $highlight={typeAdvantage.multB > typeAdvantage.multA}
                >
                  {typeAdvantage.multB}x
                </S.CompareCell>
              </S.CompareRow>
            )}
          </S.CompareTable>

          <div style={{ textAlign: "center" }}>
            <S.CompareBtn type="button" onClick={handleReset}>
              Nova comparação
            </S.CompareBtn>
          </div>
        </S.ResultPanel>
      )}
    </S.Container>
  );
};
