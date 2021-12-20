import type { Input } from '../../lib/readInput'
import { parseInput, getAdjacents, findLowestPoints } from '../part1'
import sortNumbers from '../../lib/sortNumbers'

import type { Point } from '../part1'

const run = (input: Input): number => {
  const locations = parseInput(input)
  const lowestPoints = findLowestPoints(locations)

  const findBasin = (point: Point, basin: Array<Point> = []): Array<Point> => {
    if (!basin.find(({ row, col }) => row === point.row && col === point.col)) {
      basin.push(point)
    } else {
      return basin
    }

    const adjacents = getAdjacents(point, locations).filter(
      ({ row, col, value }) =>
        value !== 9 && (point.row !== row || point.col !== col)
    )

    adjacents.forEach((adjacent) => {
      findBasin(adjacent, basin)
    })

    return basin
  }

  const basinSizes = lowestPoints.reduce((result: number[], point) => {
    const basin = findBasin(point)
    result.push(basin.length)
    return result
  }, [])

  const threeLargestBasins = sortNumbers(basinSizes).reverse().slice(0, 3)
  const answer = threeLargestBasins.reduce(
    (result: number, basinSize) => result * basinSize,
    1
  )

  return answer
}

export default run
