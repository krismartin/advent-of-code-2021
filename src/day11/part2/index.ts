import type { Input } from '../../lib/readInput'
import { parseInput, tick } from '../part1'

const run = (input: Input): number => {
  const octopuses = parseInput(input)
  let flashes = 0
  let step = 0
  const octopusesCount = octopuses.flat().length
  while (flashes !== octopusesCount) {
    flashes = tick(octopuses)
    step++
  }

  return step
}

export default run
