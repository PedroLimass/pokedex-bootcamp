/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Loading } from "react-loading-dot";
import * as S from "./styles";
import PokemonCard from "../../components/PokemonCard";
import { pokedexColorsBody } from "../../styles/theme";

export const PokemonsPage = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadData, setloadData] = useState(false);

  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=18",
  );

  const getAllPokemons = async () => {
    setloadData(true);
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    const createPokemonObject = results => {
      results.forEach(async pokemon => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
        );
        const data = await res.json();
        setAllPokemons(currentList => {
          return [...currentList, data];
        });
      });
    };

    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    setloadData(false);
  }, [loadMore]);

  return (
    <S.Container>
      <S.HeaderText>
        Mais de 250 Pokemons para você escolher o seu favorito
      </S.HeaderText>
      <S.SearchBox type="text" placeholder="Pesquisar pokemon" />

      {allPokemons.length >= 18 && (
        <S.Grid>
          {allPokemons.map((data, index) => {
            return (
              <PokemonCard
                key={index}
                name={data.name}
                order={data.order}
                type={data.types}
                image={data.sprites.other.dream_world.front_default}
                weight={data.weight}
                height={data.height}
                abilities={data.abilities[0].ability.name}
                stats={data.stats}
              />
            );
          })}
        </S.Grid>
      )}
      <S.LoadBtnRow>
        {loadData ? (
          <Loading
            size="0.5rem"
            margin="8px"
            background={pokedexColorsBody.tinyBlack}
            className="loadComponent"
          />
        ) : (
          <button
            type="button"
            className="btnLoadMore"
            onClick={() => {
              return getAllPokemons();
            }}
          >
            Load more
          </button>
        )}
      </S.LoadBtnRow>
    </S.Container>
  );
};
