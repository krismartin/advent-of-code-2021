export default (start: number, stop: number, step: number = 1) =>
  Array(stop + 1 - start)
    .fill(start)
    .map((x, y) => x + y * step)
