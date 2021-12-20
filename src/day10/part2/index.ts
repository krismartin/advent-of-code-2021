import type { Input } from '../../lib/readInput'
import { MAPPINGS, parseInput, checkSyntax } from '../part1'
import sortNumbers from '../../lib/sortNumbers'

const SCORES: Record<string, number> = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const run = (input: Input): number => {
  const missingChars = parseInput(input)
    .map((line) => checkSyntax(line))
    .filter(({ illegalChar }) => !illegalChar)
    .map(({ unclosedChars }) => {
      return unclosedChars
        .map((unclosedChar) => MAPPINGS[unclosedChar])
        .reverse()
    })

  const scores = missingChars.reduce((result: Array<number>, chars) => {
    const scores = chars.map((char) => SCORES[char])
    const score = scores.reduce((result, score) => {
      result = result * 5 + score
      return result
    }, 0)
    result.push(score)
    return result
  }, [])

  const middleIndex = Math.floor(scores.length / 2)
  const answer = sortNumbers(scores)[middleIndex]
  return answer
}

export default run
