import type { Input } from '../../lib/readInput'
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
        return total + diff
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
