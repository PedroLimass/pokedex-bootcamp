const FALLBACK_COLOR = "#A499C1";

export const colorBackgroundCard = (
  typeColor: string,
  colorObject: Record<string, string>,
): string => {
  return colorObject[typeColor] ?? FALLBACK_COLOR;
};
