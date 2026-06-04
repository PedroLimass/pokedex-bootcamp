import type { NamedAPIResource } from "../types/pokemon";
import type { SortOption } from "../constants/pokemon";
import { getIdFromResourceUrl, searchPokemonIndex } from "./pokemonSearch";

export interface PokemonFilterParams {
  search: string;
  types: string[];
  generation: number | null;
  sort: SortOption;
}

function sortResources(
  resources: NamedAPIResource[],
  sort: SortOption,
): NamedAPIResource[] {
  if (sort === "relevance") return resources;

  const sorted = [...resources];
  switch (sort) {
    case "number-asc":
      return sorted.sort(
        (a, b) => getIdFromResourceUrl(a.url) - getIdFromResourceUrl(b.url),
      );
    case "number-desc":
      return sorted.sort(
        (a, b) => getIdFromResourceUrl(b.url) - getIdFromResourceUrl(a.url),
      );
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
}

/**
 * Aplica busca textual, filtros de tipo (união) e geração, e por fim a
 * ordenação escolhida. Os conjuntos de nomes vêm dos endpoints /type e
 * /generation, cruzados com o índice local.
 */
export function applyPokemonFilters(
  index: NamedAPIResource[],
  params: PokemonFilterParams,
  typeNameSet: Set<string> | null,
  genNameSet: Set<string> | null,
): NamedAPIResource[] {
  let result = params.search.trim()
    ? searchPokemonIndex(index, params.search)
    : index;

  if (typeNameSet) {
    result = result.filter((resource) => typeNameSet.has(resource.name));
  }

  if (genNameSet) {
    result = result.filter((resource) => genNameSet.has(resource.name));
  }

  return sortResources(result, params.sort);
}
