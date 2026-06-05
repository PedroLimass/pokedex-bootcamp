import { useState } from "react";
import { Loading } from "react-loading-dot";
import * as S from "./styles";
import PokemonCard from "../../components/PokemonCard";
import FilterBar from "../../components/FilterBar";
import { pokedexColorsBody } from "../../styles/theme";
import { useDebounce } from "../../hooks/useDebounce";
import { usePokemons } from "../../hooks/usePokemons";
import type { SortOption } from "../../constants/pokemon";

export const PokemonsPage = () => {
  const [search, setSearch] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [generation, setGeneration] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>("relevance");

  const debouncedSearch = useDebounce(search, 400);

  const { pokemons, isLoading, error, hasMore, totalCount, loadMore } =
    usePokemons({ search: debouncedSearch, types, generation, sort });

  const hasActiveFilters =
    debouncedSearch.trim().length > 0 ||
    types.length > 0 ||
    generation !== null;
  const showEmptyState = !isLoading && !error && pokemons.length === 0;

  const toggleType = (type: string) => {
    setTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    );
  };

  const clearFilters = () => {
    setTypes([]);
    setGeneration(null);
    setSort("relevance");
  };

  return (
    <S.Container>
      <S.HeaderText>
        {hasActiveFilters
          ? `${totalCount} Pokémon(s) encontrado(s)`
          : "Mais de 1000 Pokémons para você escolher o seu favorito"}
      </S.HeaderText>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        selectedTypes={types}
        onToggleType={toggleType}
        generation={generation}
        onGenerationChange={setGeneration}
        sort={sort}
        onSortChange={setSort}
        onClear={clearFilters}
      />

      {error && <S.Feedback $isError>{error}</S.Feedback>}

      {showEmptyState && (
        <S.Feedback>
          Nenhum Pokémon encontrado com esses filtros.
        </S.Feedback>
      )}

      {pokemons.length > 0 && (
        <S.Grid>
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </S.Grid>
      )}

      <S.LoadBtnRow>
        {isLoading ? (
          <Loading
            size="0.5rem"
            margin="8px"
            background={pokedexColorsBody.tinyBlack}
            className="loadComponent"
          />
        ) : (
          hasMore && (
            <button type="button" className="btnLoadMore" onClick={loadMore}>
              Load more
            </button>
          )
        )}
      </S.LoadBtnRow>
    </S.Container>
  );
};
