export const color = () => {
  return (
    '#' +
    Math.random()
      .toString(16)
      .slice(2, 8)
  );
};
