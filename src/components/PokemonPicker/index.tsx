import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonIndex, getPokemonImage } from "../../services/pokeApi";
import { useDebounce } from "../../hooks/useDebounce";
import { usePokemonByName } from "../../hooks/useCompareBattle";
import { searchPokemonIndex } from "../../utils/pokemonSearch";
import { capitalize } from "../../utils/capitalize";
import { colorBackgroundCard } from "../../utils/colorBackgroundCard";
import { pokedexColors } from "../../styles/theme";
import TagType from "../Tag";
import * as S from "./styles";

interface PokemonPickerProps {
  label: string;
  selectedName: string | null;
  onSelect: (name: string | null) => void;
}

const PokemonPicker = ({
  label,
  selectedName,
  onSelect,
}: PokemonPickerProps) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const indexQuery = useQuery({
    queryKey: ["pokemon-index"],
    queryFn: ({ signal }) => fetchPokemonIndex(signal),
  });

  const pokemonQuery = usePokemonByName(selectedName);

  const suggestions = useMemo(() => {
    const index = indexQuery.data ?? [];
    const term = debouncedSearch.trim();
    if (!term) return index.slice(0, 8);
    return searchPokemonIndex(index, term).slice(0, 8);
  }, [indexQuery.data, debouncedSearch]);

  const pokemon = pokemonQuery.data;
  const primaryType = pokemon?.types[0]?.type.name ?? "normal";
  const bgColor = colorBackgroundCard(primaryType, pokedexColors);

  const handleSelect = (name: string) => {
    onSelect(name);
    setSearch("");
    setIsOpen(false);
  };

  if (pokemon) {
    return (
      <S.Wrapper>
        <S.Label>{label}</S.Label>
        <S.SelectedCard $bgColor={bgColor}>
          <img src={getPokemonImage(pokemon)} alt={pokemon.name} />
          <h3>{capitalize(pokemon.name)}</h3>
          <div style={{ display: "flex", gap: 8 }}>
            {pokemon.types.map((entry) => (
              <TagType key={entry.type.name}>{entry.type.name}</TagType>
            ))}
          </div>
          <button type="button" onClick={() => onSelect(null)}>
            Trocar Pokémon
          </button>
        </S.SelectedCard>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Label htmlFor={`picker-${label}`}>{label}</S.Label>
      <S.SearchInput
        id={`picker-${label}`}
        type="text"
        placeholder="Buscar por nome ou ID..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        aria-autocomplete="list"
      />
      {isOpen && suggestions.length > 0 && (
        <S.Dropdown>
          {suggestions.map((resource) => (
            <S.DropdownItem
              key={resource.name}
              onClick={() => handleSelect(resource.name)}
            >
              {capitalize(resource.name)}
            </S.DropdownItem>
          ))}
        </S.Dropdown>
      )}
      {selectedName && pokemonQuery.isLoading && (
        <p style={{ fontSize: 14 }}>Carregando...</p>
      )}
    </S.Wrapper>
  );
};

export default PokemonPicker;
