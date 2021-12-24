import type { Input } from '../../lib/readInput'

export type Coordinate = {
  x: number
  y: number
}

export const FOLD_INSTRUCTIONS = [
  { x: 655 },
  { y: 447 },
  { x: 327 },
  { y: 223 },
  { x: 163 },
  { y: 111 },
  { x: 81 },
  { y: 55 },
  { x: 40 },
  { y: 27 },
  { y: 13 },
  { y: 6 },
]

export const parseInput = (input: Input): Array<Coordinate> =>
  input.reduce((result: Array<Coordinate>, coordinate) => {
    const [x, y] = coordinate.split(',')
    result.push({ x: parseInt(x), y: parseInt(y) })
    return result
  }, [])

export const transformCoordinates = (
  coordinates: Array<Coordinate>,
  instructions: { fold: { x?: number; y?: number } }
): void => {
  const {
    fold: { x: foldX, y: foldY },
  } = instructions

  if (foldY) {
    coordinates
      .filter(({ y }) => y > foldY)
      .forEach(
        (coordinate) => (coordinate.y = -Math.abs(coordinate.y) + foldY * 2)
      )
  } else if (foldX) {
    coordinates
      .filter(({ x }) => x > foldX)
      .forEach(
        (coordinate) => (coordinate.x = -Math.abs(coordinate.x) + foldX * 2)
      )
  }
}

const countUniqueCoordinates = (coordinates: Array<Coordinate>): number => {
  return coordinates
    .map(({ x, y }) => `${x},${y}`)
    .reduce((unique: Array<string>, coordinate) => {
      if (!unique.includes(coordinate)) {
        unique.push(coordinate)
      }
      return unique
    }, []).length
}

const run = (input: Input): number => {
  const coordinates = parseInput(input)

  FOLD_INSTRUCTIONS.slice(0, 1).forEach((instruction) => {
    transformCoordinates(coordinates, { fold: instruction })
  })

  return countUniqueCoordinates(coordinates)
}

export default run
