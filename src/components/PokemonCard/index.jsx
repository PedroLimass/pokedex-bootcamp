/* eslint-disable no-unused-vars */
import { useState } from "react";
import * as S from "./styles";
import { capitalize, zeroPad } from "../../utils/capitalize";
import { colorBackgroundCard } from "../../utils/colorBackgroundCard";
import { pokedexColors, pokedexColorsDark } from "../../styles/theme";
import TagType from "../Tag";
import Modal from "../Modal";

const PokemonCard = ({
  order,
  name,
  type,
  image,
  weight,
  height,
  abilities,
  stats,
}) => {
  const bgColor = colorBackgroundCard(type[0].type.name, pokedexColors);
  const IdColor = colorBackgroundCard(type[0].type.name, pokedexColorsDark);
  const NamePokemon = capitalize(name);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => {
      return !prev;
    });
  };

  return (
    <>
      <S.Container bgColor={bgColor} onClick={openModal}>
        <S.IdNumber idColor={IdColor}>{zeroPad(order)}</S.IdNumber>
        <S.PokemonName>{NamePokemon}</S.PokemonName>
        <S.RowData>
          <S.ColumnLeft>
            <S.TypeSide>
              {type.map(data => {
                return <TagType key={data.id}>{data?.type.name}</TagType>;
              })}
            </S.TypeSide>
          </S.ColumnLeft>
          <S.ColumnRight>
            <S.ImgPokemon src={image} />
          </S.ColumnRight>
        </S.RowData>
      </S.Container>

      {showModal && (
        <Modal
          setOpenModal={setShowModal}
          pokemonName={NamePokemon}
          order={zeroPad(order)}
          bgColor={bgColor}
          IdColor={IdColor}
          image={image}
          type={type}
          weight={weight}
          height={height}
          abilities={abilities}
          stats={stats}
        />
      )}
    </>
  );
};

export default PokemonCard;
