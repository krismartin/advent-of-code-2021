export default (binary: string): string =>
  binary
    .split('')
    .map((bit) => (1 - parseInt(bit)).toString())
    .join('')
