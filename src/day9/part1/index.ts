import type { Input } from '../../lib/readInput'

export type Point = {
  row: number
  col: number
  value: number
}

export const parseInput = (input: Input): Point[][] =>
  input.reduce((result: Point[][], numbers, row) => {
    result.push(
      numbers.split('').map((value, col) => ({
        row,
        col,
        value: parseInt(value),
      }))
    )
    return result
  }, [])

export const getAdjacents = (
  { row, col }: Point,
  locations: ReturnType<typeof parseInput>
): Array<Point> => {
  const currentRow = locations[row]
  const prevRow = locations[row - 1] || []
  const nextRow = locations[row + 1] || []

  return [
    currentRow[col - 1], // left
    prevRow[col], // top
    currentRow[col + 1], // right
    nextRow[col], // bottom
  ].filter((n) => n !== undefined)
}

export const findLowestPoints = (
  locations: ReturnType<typeof parseInput>
): Array<Point> => {
  return locations.reduce((result: Array<Point>, points) => {
    const isLowestPoint = (point: Point): boolean => {
      const adjacents = getAdjacents(point, locations)
      return adjacents.every((adjacent) => adjacent.value > point.value)
    }

    const lowestPoints = points.filter((point) => isLowestPoint(point))
    return result.concat(lowestPoints)
  }, [])
}

const run = (input: Input): number => {
  const lowestPoints = findLowestPoints(parseInput(input))
  console.log({ lowestPoints })

  const sumOfRiskLevels = lowestPoints.reduce((sum: number, { value }) => {
    const riskLevel = value + 1
    return sum + riskLevel
  }, 0)

  return sumOfRiskLevels
}

export default run
