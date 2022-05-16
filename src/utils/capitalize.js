export const capitalize = value => {
  return value.replace(/(^\w{1})|(\s+\w{1})/g, letter => {
    return letter.toUpperCase();
  });
};

export const zeroPad = num => {
  return `#${String(num).padStart(3, "0")}`;
};
