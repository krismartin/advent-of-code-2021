import type { Input } from '../../lib/readInput'
import {
  parseInput,
  startingPoints,
  findAdjacents,
  isLowerCase,
} from '../part1'
import type { Map, Path } from '../part1'

const smallCaveVisitedTwice = (currentPath: Path): boolean => {
  const smallCaves = new Set(currentPath.filter((cave) => isLowerCase(cave)))
  return Boolean(
    Array.from(smallCaves).find(
      (cave) => currentPath.filter((p) => p === cave).length === 2
    )
  )
}

const walk = (
  to: string,
  map: Array<Map>,
  currentPath: Path,
  distinctPaths: Array<Path>
): any => {
  if (to === 'end') {
    currentPath.push(to)
    distinctPaths.push(currentPath)
    return
  }

  if (to === 'start') {
    return
  }

  if (
    isLowerCase(to) &&
    smallCaveVisitedTwice(currentPath) &&
    currentPath.includes(to)
  ) {
    return
  }

  currentPath.push(to)
  distinctPaths.push(currentPath)

  findAdjacents(to, map).forEach((adjacent) => {
    walk(adjacent, map, [...currentPath], distinctPaths)
  })
}

const run = (input: Input): number => {
  const map = parseInput(input)

  const completedPaths = startingPoints(map).reduce(
    (result: Array<Path>, point) => {
      const currentPath: Path = [point.from]
      const distinctPaths: Array<Path> = []

      walk(point.to, map, currentPath, distinctPaths)

      const completedPaths = distinctPaths.filter(
        (path) => path[0] === 'start' && path[path.length - 1] === 'end'
      )
      result.push.apply(result, completedPaths)
      return result
    },
    []
  )

  return completedPaths.length
}

export default run
