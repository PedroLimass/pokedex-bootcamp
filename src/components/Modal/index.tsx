import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiX } from "react-icons/fi";
import * as S from "./styles";
import TagType from "../Tag";
import StatsSection from "../StatsSection";
import ProgressState from "../ProgressState";
import { zeroPad } from "../../utils/capitalize";
import { fetchPokemonSpecies } from "../../services/pokeApi";
import { useTypeChart } from "../../hooks/useTypeChart";
import { getPokemonTypeNames } from "../../utils/pokemonStats";
import { getWeaknesses } from "../../utils/typeWeaknesses";
import { colorBackgroundCard } from "../../utils/colorBackgroundCard";
import { pokedexColors } from "../../styles/theme";
import { TYPE_LABELS } from "../../constants/pokemon";
import type { Pokemon } from "../../types/pokemon";

interface ModalProps {
  pokemon: Pokemon;
  pokemonName: string;
  bgColor: string;
  idColor: string;
  image: string;
  onClose: () => void;
}

const Modal = ({
  pokemon,
  pokemonName,
  bgColor,
  image,
  onClose,
}: ModalProps) => {
  const { data: species, isError } = useQuery({
    queryKey: ["pokemon-species", pokemon.id],
    queryFn: ({ signal }) => fetchPokemonSpecies(pokemon.id, signal),
  });

  const typeNames = getPokemonTypeNames(pokemon);
  const { typeChart } = useTypeChart(typeNames);

  const weaknesses = useMemo(
    () => getWeaknesses(typeNames, typeChart),
    [typeNames, typeChart],
  );

  const description = useMemo(() => {
    if (isError) return "Descrição indisponível no momento.";
    if (!species) return "";

    const entry =
      species.flavor_text_entries.find((item) => item.language.name === "en") ??
      species.flavor_text_entries[0];

    return entry?.flavor_text.replace(/[\n\f\r]/g, " ") ?? "";
  }, [species, isError]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const ability = pokemon.abilities[0]?.ability.name ?? "";

  return (
    <S.Container onClick={onClose}>
      <S.ModalWrapper onClick={(event) => event.stopPropagation()}>
        <S.CloseModalButton aria-label="Fechar modal" onClick={onClose}>
          <FiX />
        </S.CloseModalButton>

        <S.SideImage $bgColor={bgColor}>
          <S.ModalImg src={image} alt={pokemonName} />
          <S.RowTags>
            {pokemon.types.map((data) => (
              <TagType size="high" key={data.type.name}>
                {data.type.name}
              </TagType>
            ))}
          </S.RowTags>
        </S.SideImage>

        <S.ModalContent>
          <S.HeaderModal $bgColor={bgColor}>
            <h1>{pokemonName}</h1>
            <span>{zeroPad(pokemon.id)}</span>
          </S.HeaderModal>

          {description && <p className="description">{description}</p>}

          <StatsSection
            weight={pokemon.weight}
            height={pokemon.height}
            ability={ability}
          />

          <S.Section>
            <S.SectionTitle>Habilidades</S.SectionTitle>
            <S.ChipRow>
              {pokemon.abilities.map((entry) => (
                <S.AbilityChip key={entry.ability.name}>
                  {entry.ability.name.replace("-", " ")}
                  {entry.is_hidden && <small>(oculta)</small>}
                </S.AbilityChip>
              ))}
            </S.ChipRow>
          </S.Section>

          {weaknesses.length > 0 && (
            <S.Section>
              <S.SectionTitle>Fraquezas</S.SectionTitle>
              <S.ChipRow>
                {weaknesses.map((matchup) => (
                  <S.WeaknessChip
                    key={matchup.type}
                    $color={colorBackgroundCard(matchup.type, pokedexColors)}
                  >
                    {TYPE_LABELS[matchup.type] ?? matchup.type}
                    <strong>×{matchup.multiplier}</strong>
                  </S.WeaknessChip>
                ))}
              </S.ChipRow>
            </S.Section>
          )}

          <ProgressState stats={pokemon.stats} />
        </S.ModalContent>
      </S.ModalWrapper>
    </S.Container>
  );
};

export default Modal;
