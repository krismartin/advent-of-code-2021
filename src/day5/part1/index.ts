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
  } else {
    const longestDistance = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1))
    // diagonal line
    const points = [...Array(longestDistance)].reduce(
      (points: Array<Coordinate>, _) => {
        const [currentX, currentY] = points[points.length - 1]

        let nextX
        if (currentX === x2) {
          nextX = x2
        } else {
          nextX = x2 > currentX ? currentX + 1 : currentX - 1
        }

        let nextY
        if (currentY === y2) {
          nextY = y2
        } else {
          nextY = y2 > currentY ? currentY + 1 : currentY - 1
        }

        points.push([nextX, nextY])
        return points
      },
      [[x1, y1]]
    )
    return points
  }
}

export const getPoints = (
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

export const parseInput = (input: Input): Array<LineCoordinates> => {
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
