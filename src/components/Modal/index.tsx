import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import * as S from "./styles";
import closeIcon from "../../assets/closeIcon.svg";
import TagType from "../Tag";
import StatsSection from "../StatsSection";
import ProgressState from "../ProgressState";
import { zeroPad } from "../../utils/capitalize";
import { fetchPokemonSpecies } from "../../services/pokeApi";
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
  const {
    data: species,
    isError,
  } = useQuery({
    queryKey: ["pokemon-species", pokemon.id],
    queryFn: ({ signal }) => fetchPokemonSpecies(pokemon.id, signal),
  });

  const description = useMemo(() => {
    if (isError) return "Descrição indisponível no momento.";
    if (!species) return "";

    const entry =
      species.flavor_text_entries.find((item) => item.language.name === "en") ??
      species.flavor_text_entries[0];

    return entry?.flavor_text.replace(/[\n\f\r]/g, " ") ?? "";
  }, [species, isError]);

  const ability = pokemon.abilities[0]?.ability.name ?? "";

  return (
    <S.Container>
      <S.ModalWrapper>
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
          <p>{description}</p>
          <StatsSection
            weight={pokemon.weight}
            height={pokemon.height}
            ability={ability}
          />
          <ProgressState stats={pokemon.stats} />
        </S.ModalContent>
        <S.CloseModalButton
          aria-label="Close modal"
          src={closeIcon}
          onClick={onClose}
        />
      </S.ModalWrapper>
    </S.Container>
  );
};

export default Modal;
