import { parseInput, getPoints } from '../part1'

import type { Input } from '../../lib/readInput'

const run = (input: Input): number => {
  const linesCoordinates = parseInput(input)

  const points = getPoints(linesCoordinates)

  const tally = points
    .map((point) => point.join(','))
    .reduce((obj: Record<string, number>, point) => {
      const value = obj[point]
      obj[point] = value ? value + 1 : 1
      return obj
    }, {})

  const answer = Object.keys(tally).filter((key) => tally[key] > 1).length

  return answer
}

export default run
