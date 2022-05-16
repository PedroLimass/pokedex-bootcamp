export const colorBackgroundCard = (typeColor, colorObject) => {
  const colorsArray = Object.entries(colorObject);

  const color = colorsArray.filter(([key]) => {
    return key === typeColor;
  });

  return color[0][1];
};
