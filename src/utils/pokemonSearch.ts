import type { NamedAPIResource } from "../types/pokemon";

/** Extrai o ID numérico de uma URL como ".../pokemon/6/". */
export function getIdFromResourceUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : Number.NaN;
}

/**
 * Filtra e ordena o índice de Pokémons por relevância.
 * - Termo numérico: casa por prefixo de ID (ex.: "6" -> 6, 60, 61...).
 * - Termo textual: casa por substring no nome, priorizando os que *começam*
 *   com o termo (ex.: "char" -> charmander/charizard antes de pinchar...).
 */
export function searchPokemonIndex(
  index: NamedAPIResource[],
  term: string,
): NamedAPIResource[] {
  const query = term.trim().toLowerCase();
  if (!query) return index;

  // Busca por ID: aceita "#025", "025", "25" etc. Removemos o "#" e os zeros
  // à esquerda para casar com o ID real da API (ex.: Pikachu = 25, não 025).
  const idMatch = query.match(/^#?0*(\d+)$/);

  if (idMatch) {
    const normalizedId = idMatch[1];
    const exactId = Number(normalizedId);

    // Número exato: mostra apenas aquele Pokémon, se existir.
    const exactMatch = index.find(
      (resource) => getIdFromResourceUrl(resource.url) === exactId,
    );
    if (exactMatch) return [exactMatch];

    // Sem correspondência exata: cai para busca por prefixo de ID.
    return index
      .filter((resource) =>
        String(getIdFromResourceUrl(resource.url)).startsWith(normalizedId),
      )
      .sort(
        (a, b) => getIdFromResourceUrl(a.url) - getIdFromResourceUrl(b.url),
      );
  }

  return index
    .filter((resource) => resource.name.includes(query))
    .sort((a, b) => {
      const aStarts = a.name.startsWith(query) ? 0 : 1;
      const bStarts = b.name.startsWith(query) ? 0 : 1;
      if (aStarts !== bStarts) return aStarts - bStarts;
      return getIdFromResourceUrl(a.url) - getIdFromResourceUrl(b.url);
    });
}
