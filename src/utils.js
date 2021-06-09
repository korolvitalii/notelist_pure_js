export default (min = 0, max = 999) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
