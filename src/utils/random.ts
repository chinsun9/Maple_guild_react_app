function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max + 1 - min) + min;
}

export { getRandomArbitrary };
