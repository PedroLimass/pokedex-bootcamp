/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */

import { useEffect, useState } from "react";
import * as S from "./styles";
import closeIcon from "../../assets/closeIcon.svg";
import TagType from "../Tag";
import StatsSection from "../StatsSection";
import ProgressState from "../ProgressState";

const Modal = ({
  setOpenModal,
  order,
  bgColor,
  image,
  type,
  pokemonName,
  weight,
  height,
  abilities,
  stats,
}) => {
  const [description, setDescription] = useState();
  const LoadDescription = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${1}/`);
    const data = await res.json();
    setDescription(data.flavor_text_entries[0].flavor_text);
  };

  useEffect(() => {
    LoadDescription();
  }, []);

  return (
    <S.Container>
      <S.ModalWrapper>
        <S.SideImage bgColor={bgColor}>
          <S.ModalImg src={image} alt="pokemon" />
          <S.RowTags>
            {type.map(data => {
              return (
                <TagType size="high" key={data.id}>
                  {data?.type.name}
                </TagType>
              );
            })}
          </S.RowTags>
        </S.SideImage>
        <S.ModalContent>
          <S.HeaderModal bgColor={bgColor}>
            <h1>{pokemonName}</h1>
            <span bgColor={bgColor}>{order}</span>
          </S.HeaderModal>
          <p>{description}</p>
          <StatsSection weight={weight} height={height} ability={abilities} />
          <ProgressState stats={stats} />
        </S.ModalContent>
        <S.CloseModalButton
          aria-label="Close modal"
          src={closeIcon}
          onClick={() => {
            setOpenModal(false);
          }}
        />
      </S.ModalWrapper>
    </S.Container>
  );
};

export default Modal;
