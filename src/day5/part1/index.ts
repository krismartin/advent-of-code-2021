import range from '../../lib/range'
import sortNumbers from '../../lib/sortNumbers'

import type { Input } from '../../lib/readInput'

type Coordinate = [number, number]
type LineCoordinates = [Coordinate, Coordinate]

const getLinePoints = (
  lineCoordinates: LineCoordinates
): Array<Coordinate> | undefined => {
  const [x1, y1] = lineCoordinates[0]
  const [x2, y2] = lineCoordinates[1]

  if (x1 === x2) {
    const [min, max] = sortNumbers([y1, y2])
    return range(min, max).map((y) => [x1, y])
  } else if (y1 === y2) {
    const [min, max] = sortNumbers([x1, x2])
    return range(min, max).map((x) => [x, y1])
  }

  return
}

const getPoints = (
  linesCoordinates: Array<LineCoordinates>
): Array<Coordinate> => {
  return linesCoordinates.reduce((arr: Array<Coordinate>, lineCoordinates) => {
    const points = getLinePoints(lineCoordinates)
    if (!points) {
      return arr
    }
    return arr.concat(points)
  }, [])
}

const parseInput = (input: Input): Array<LineCoordinates> => {
  return input.reduce((lines: Array<LineCoordinates>, line) => {
    // x1,y1 -> x2,y2
    const [coordinate1, coordinate2] = line.split(' -> ')
    lines.push([
      coordinate1.split(',').map((n) => parseInt(n)) as Coordinate,
      coordinate2.split(',').map((n) => parseInt(n)) as Coordinate,
    ])
    return lines
  }, [])
}

const run = (input: Input): number => {
  const linesCoordinates = parseInput(input)

  const points = getPoints(
    // Remove the diagonals
    linesCoordinates.filter((lineCoordinates) => {
      const [x1, y1] = lineCoordinates[0]
      const [x2, y2] = lineCoordinates[1]
      return x1 === x2 || y1 === y2
    })
  )

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
