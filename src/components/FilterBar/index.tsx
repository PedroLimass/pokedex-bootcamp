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
  selectedTypes: string[];
  onToggleType: (type: string) => void;
  generation: number | null;
  onGenerationChange: (generation: number | null) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onClear: () => void;
}

const FilterBar = ({
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
    </S.Wrapper>
  );
};

export default FilterBar;
