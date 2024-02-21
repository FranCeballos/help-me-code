export const createCustomId = (string) => {
  return string.toLowerCase().replaceAll(" ", "-");
};
