import { useState } from "react";
import * as S from "./styles";
import { capitalize, zeroPad } from "../../utils/capitalize";
import { colorBackgroundCard } from "../../utils/colorBackgroundCard";
import { pokedexColors, pokedexColorsDark } from "../../styles/theme";
import { getPokemonImage } from "../../services/pokeApi";
import type { Pokemon } from "../../types/pokemon";
import TagType from "../Tag";
import Modal from "../Modal";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const bgColor = colorBackgroundCard(primaryType, pokedexColors);
  const idColor = colorBackgroundCard(primaryType, pokedexColorsDark);
  const name = capitalize(pokemon.name);
  const image = getPokemonImage(pokemon);

  return (
    <>
      <S.Container $bgColor={bgColor} onClick={() => setShowModal(true)}>
        <S.IdNumber $idColor={idColor}>{zeroPad(pokemon.id)}</S.IdNumber>
        <S.PokemonName>{name}</S.PokemonName>
        <S.RowData>
          <S.ColumnLeft>
            <S.TypeSide>
              {pokemon.types.map((data) => (
                <TagType key={data.type.name}>{data.type.name}</TagType>
              ))}
            </S.TypeSide>
          </S.ColumnLeft>
          <S.ColumnRight>
            <S.ImgPokemon src={image} alt={name} />
          </S.ColumnRight>
        </S.RowData>
      </S.Container>

      {showModal && (
        <Modal
          pokemon={pokemon}
          pokemonName={name}
          bgColor={bgColor}
          idColor={idColor}
          image={image}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default PokemonCard;
