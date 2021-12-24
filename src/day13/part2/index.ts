import type { Input } from '../../lib/readInput'
import { FOLD_INSTRUCTIONS, parseInput, transformCoordinates } from '../part1'

import type { Coordinate } from '../part1'

const drawCoordinates = (coordinates: Array<Coordinate>): void => {
  const maxX = Math.max(...coordinates.map(({ x }) => x))
  const maxY = Math.max(...coordinates.map(({ y }) => y))

  ;[...new Array(maxY + 1)].forEach((_, row) => {
    let draw = ''
    ;[...new Array(maxX + 1)].forEach((_, col) => {
      draw += Boolean(coordinates.find(({ x, y }) => x === col && y === row))
        ? '🟢'
        : '⚫️'
    })
    console.log(draw)
  })
}

const run = (input: Input): string => {
  const coordinates = parseInput(input)

  FOLD_INSTRUCTIONS.forEach((instruction) => {
    transformCoordinates(coordinates, { fold: instruction })
  })

  console.log(coordinates)
  drawCoordinates(coordinates)
  return '☝🏼'
}

export default run
