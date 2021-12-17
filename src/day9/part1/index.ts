import type { Input } from '../../lib/readInput'

const parseInput = (input: Input): number[][] =>
  input.reduce((result: number[][], numbers) => {
    result.push(numbers.split('').map((num) => parseInt(num)))
    return result
  }, [])

const findLowestPoints = (
  input: ReturnType<typeof parseInput>
): Array<number> => {
  return input.reduce((result: Array<number>, numbers, row) => {
    const getAdjacents = (row: number, column: number): Array<number> => {
      return [
        numbers[column - 1], // left
        (input[row - 1] || [])[column], // top
        numbers[column + 1], // right
        (input[row + 1] || [])[column], // bottom
      ].filter((n) => n !== undefined)
    }

    const isLowestPoint = (number: number, adjacents: Array<number>): boolean =>
      adjacents.every((adjacent) => adjacent > number)

    numbers.forEach((number, column) => {
      if (isLowestPoint(number, getAdjacents(row, column))) {
        result.push(number)
      }
    })
    return result
  }, [])
}

const run = (input: Input): number => {
  const lowestPoints = findLowestPoints(parseInput(input))

  const sumOfRiskLevels = lowestPoints.reduce((sum: number, number) => {
    const riskLevel = number + 1
    return sum + riskLevel
  }, 0)

  return sumOfRiskLevels
}

export default run
