import { FiSearch } from "react-icons/fi";
import {
  GENERATIONS,
  POKEMON_TYPES,
  SORT_OPTIONS,
  TYPE_LABELS,
  type SortOption,
} from "../../constants/pokemon";
import { colorBackgroundCard } from "../../utils/colorBackgroundCard";
import { pokedexColors } from "../../styles/theme";
import * as S from "./styles";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedTypes: string[];
  onToggleType: (type: string) => void;
  generation: number | null;
  onGenerationChange: (generation: number | null) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onClear: () => void;
}

const FilterBar = ({
  search,
  onSearchChange,
  selectedTypes,
  onToggleType,
  generation,
  onGenerationChange,
  sort,
  onSortChange,
  onClear,
}: FilterBarProps) => {
  const hasActiveFilters =
    selectedTypes.length > 0 || generation !== null || sort !== "relevance";

  return (
    <S.Wrapper>
      <S.SearchField>
        <S.SearchIcon>
          <FiSearch />
        </S.SearchIcon>
        <S.SearchInput
          type="text"
          placeholder="Buscar por nome (ex.: pikachu) ou número (ex.: 25)"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Buscar pokemon por nome ou número"
        />
      </S.SearchField>

      <S.Controls>
        <S.Field>
          Ordenar por
          <S.Select
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value as SortOption)
            }
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </S.Select>
        </S.Field>

        <S.Field>
          Geração
          <S.Select
            value={generation ?? ""}
            onChange={(event) =>
              onGenerationChange(
                event.target.value ? Number(event.target.value) : null,
              )
            }
          >
            <option value="">Todas</option>
            {GENERATIONS.map((gen) => (
              <option key={gen.id} value={gen.id}>
                {gen.label}
              </option>
            ))}
          </S.Select>
        </S.Field>

        {hasActiveFilters && (
          <S.ClearButton type="button" onClick={onClear}>
            Limpar filtros
          </S.ClearButton>
        )}
      </S.Controls>

      <S.ChipsGroup>
        <S.ChipsLabel>Filtrar por tipo</S.ChipsLabel>
        <S.Chips>
          {POKEMON_TYPES.map((type) => {
            const color = colorBackgroundCard(type, pokedexColors);
            const active = selectedTypes.includes(type);
            return (
              <S.Chip
                key={type}
                type="button"
                $color={color}
                $active={active}
                aria-pressed={active}
                onClick={() => onToggleType(type)}
              >
                {TYPE_LABELS[type] ?? type}
              </S.Chip>
            );
          })}
        </S.Chips>
      </S.ChipsGroup>
    </S.Wrapper>
  );
};

export default FilterBar;
