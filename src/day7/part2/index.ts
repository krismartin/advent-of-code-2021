import type { Input } from '../../lib/readInput'
import sumArray from '../../lib/sumArray'
import range from '../../lib/range'

export const parseInput = (input: Input): Array<number> =>
  input[0].split(',').map((i) => parseInt(i))

const run = (input: Input): number | undefined => {
  const currentPositions = parseInput(input)

  const min = Math.min(...currentPositions)
  const max = Math.max(...currentPositions)
  const positions = range(min, max)

  let minCost: number | undefined

  positions.forEach((position) => {
    const totalCost = currentPositions.reduce(
      (total: number, currentPosition) => {
        if (position === currentPosition) {
          return total
        }
        const diff = Math.abs(position - currentPosition)
        // https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF
        const cost = (diff * (diff + 1)) / 2
        return total + cost
      },
      0
    )

    if (!minCost || minCost > totalCost) {
      minCost = totalCost
    }
  })

  return minCost
}

export default run
