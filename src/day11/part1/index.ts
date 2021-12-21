import type { Input } from '../../lib/readInput'

type Octopus = {
  row: number
  col: number
  health: number
  flashed: boolean
}

export const parseInput = (input: Input): Octopus[][] =>
  input.map((line, row) =>
    line.split('').map((health, col) => ({
      row,
      col,
      health: parseInt(health),
      flashed: false,
    }))
  )

const getAdjacents = (
  { row, col }: Octopus,
  octopuses: Octopus[][]
): Array<Octopus> => {
  const prevRow = octopuses[row - 1] || []
  const currentRow = octopuses[row]
  const nextRow = octopuses[row + 1] || []

  return [
    currentRow[col - 1], // left
    prevRow[col - 1], // top left
    prevRow[col], // top
    prevRow[col + 1], // top right
    currentRow[col + 1], // right
    nextRow[col + 1], // bottom right
    nextRow[col], // bottom
    nextRow[col - 1], // bottom left
  ].filter(Boolean)
}

export const tick = (octopuses: Octopus[][]): number => {
  const flattenedOctopuses = octopuses.flat()

  const flashOctopus = (octopus: Octopus): void => {
    octopus.health = 0
    octopus.flashed = true
  }

  const increaseHealth = (octopus: Octopus): void => {
    if (octopus.flashed) {
      return
    }

    octopus.health += 1

    if (octopus.health > 9) {
      // max health reached
      flashOctopus(octopus)

      getAdjacents(octopus, octopuses).forEach((adjacent) =>
        increaseHealth(adjacent)
      )
    }
  }

  flattenedOctopuses.forEach((octopus) => increaseHealth(octopus))
  const flashes = flattenedOctopuses.filter(({ flashed }) => flashed).length
  flattenedOctopuses.forEach((octopus) => (octopus.flashed = false))

  return flashes
}

const run = (input: Input): number => {
  const octopuses = parseInput(input)
  const steps = 100
  const flashes = [...new Array(steps)].reduce((count: number) => {
    return count + tick(octopuses)
  }, 0)

  return flashes
}

export default run
