import type { Input } from '../../lib/readInput'
import { parseInput } from '../part1'
import sumArray from '../../lib/sumArray'

type Fishes = {
  [timer: number]: number
}

const tick = (fishes: Fishes): void => {
  const fishesWithZeroTimer = fishes[0]
  for (let i = 0; i < 8; i++) {
    fishes[i] = fishes[i + 1]
  }
  fishes[8] = fishesWithZeroTimer
  fishes[6] += fishesWithZeroTimer
}

const numberAfterDays = (fishes: Fishes, days: number): number => {
  const fishesCopy = { ...fishes }
  for (let i = 0; i < days; i++) {
    tick(fishesCopy)
  }
  return sumArray(Object.values(fishesCopy))
}

const run = (input: Input): number => {
  const fishes: Fishes = {}
  for (let i = 0; i < 9; i++) {
    fishes[i] = 0
  }

  parseInput(input).forEach((timer) => {
    fishes[timer]++
  })

  return numberAfterDays(fishes, 256)
}

export default run
