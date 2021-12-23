import type { Input } from '../../lib/readInput'
import isUpperCase from '../../lib/isUpperCase'

export type Map = {
  from: string
  to: string
}
export type Path = Array<string>

export const isLowerCase = (str: string): boolean => !isUpperCase(str)

export const parseInput = (input: Input): Array<Map> =>
  input.reduce((result: Array<Map>, map) => {
    const [from, to] = map.split('-')
    result.push({ from, to })
    return result
  }, [])

export const startingPoints = (map: Array<Map>): Array<Map> =>
  map.reduce((result: Array<Map>, map) => {
    if (map.from === 'start' || map.to === 'start') {
      result.push({
        from: map.from === 'start' ? map.from : map.to,
        to: map.from === 'start' ? map.to : map.from,
      })
    }
    return result
  }, [])

export const findAdjacents = (from: string, map: Array<Map>): Path => {
  return map.reduce((result: Path, map) => {
    if (from === map.from) {
      result.push(map.to)
    } else if (from === map.to) {
      result.push(map.from)
    }
    return result
  }, [])
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

  if (to === 'start' || (isLowerCase(to) && currentPath.includes(to))) {
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
