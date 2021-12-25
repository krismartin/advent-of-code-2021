import type { Input } from '../../lib/readInput'
import slidingWindows from '../../lib/slidingWindows'

type JoiningElement = string
type InsertionRule = {
  [elements: string]: JoiningElement
}

const TEMPLATE = 'CNBPHFBOPCSPKOFNHVKV'

const parseInput = (input: Input): InsertionRule =>
  input.reduce((result: InsertionRule, rule) => {
    const [adjacentElements, joiningElement] = rule.split(' -> ')
    return {
      ...result,
      [adjacentElements]: joiningElement,
    }
  }, {})

const run = (input: Input): number => {
  const insertionRules = parseInput(input)
  const steps = 10
  const templateArray = TEMPLATE.split('')

  const finalPolymer = [...new Array(steps)].reduce((result: Array<string>) => {
    const polymer = slidingWindows(result, 2).reduce(
      (result: Array<string>, elements) => {
        const joiningElement = insertionRules[elements.join('')]

        if (result.length === 0) {
          result.push(elements[0])
        }
        return result.concat([joiningElement, elements[1]])
      },
      []
    )

    return polymer
  }, templateArray)

  const count = finalPolymer.reduce(
    (result: Record<string, number>, element) => {
      return {
        ...result,
        [element]: (result[element] || 0) + 1,
      }
    },
    {}
  )

  const values = Object.values(count)
  const maxCount = Math.max(...values)
  const minCount = Math.min(...values)

  return maxCount - minCount
}

export default run
