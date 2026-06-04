export const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

export const TYPE_LABELS: Record<string, string> = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  grass: "Planta",
  electric: "Elétrico",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Veneno",
  ground: "Terra",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  fairy: "Fada",
};

export interface GenerationOption {
  id: number;
  label: string;
}

export const GENERATIONS: GenerationOption[] = [
  { id: 1, label: "Gen I — Kanto" },
  { id: 2, label: "Gen II — Johto" },
  { id: 3, label: "Gen III — Hoenn" },
  { id: 4, label: "Gen IV — Sinnoh" },
  { id: 5, label: "Gen V — Unova" },
  { id: 6, label: "Gen VI — Kalos" },
  { id: 7, label: "Gen VII — Alola" },
  { id: 8, label: "Gen VIII — Galar" },
  { id: 9, label: "Gen IX — Paldea" },
];

export type SortOption =
  | "relevance"
  | "number-asc"
  | "number-desc"
  | "name-asc"
  | "name-desc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevância" },
  { value: "number-asc", label: "Número (menor → maior)" },
  { value: "number-desc", label: "Número (maior → menor)" },
  { value: "name-asc", label: "Nome (A → Z)" },
  { value: "name-desc", label: "Nome (Z → A)" },
];
