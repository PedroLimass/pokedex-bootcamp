export const capitalize = (value: string): string => {
  return value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => {
    return letter.toUpperCase();
  });
};

export const zeroPad = (num: number): string => {
  return `#${String(num).padStart(3, "0")}`;
};
