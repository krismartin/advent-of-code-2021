import type { Input } from '../../lib/readInput'
import sumArray from '../../lib/sumArray'

export const MAPPINGS: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}
const OPENING_CHARS = Object.keys(MAPPINGS)
const SCORES: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

export const parseInput = (input: Input): string[][] =>
  input.map((line) => line.split(''))

const isValidClosingChar = (
  openingChar: string,
  closingChar: string
): boolean => MAPPINGS[openingChar] === closingChar

export const checkSyntax = (
  line: Array<string>
): {
  illegalChar: string | undefined
  unclosedChars: Array<string>
} => {
  let unclosedChars: Array<string> = []
  let illegalChar: string | undefined

  line.forEach((char) => {
    if (OPENING_CHARS.includes(char)) {
      unclosedChars.push(char)
    } else {
      const lastUnclosedChar = unclosedChars[unclosedChars.length - 1]

      if (isValidClosingChar(lastUnclosedChar, char)) {
        unclosedChars.pop()
      } else if (!illegalChar) {
        illegalChar = char
      }
    }
  })

  return {
    illegalChar,
    unclosedChars,
  }
}

const run = (input: Input): number => {
  const illegalChars = parseInput(input)
    .map((line) => checkSyntax(line))
    .filter(({ illegalChar }) => Boolean(illegalChar))
    .map(({ illegalChar }) => illegalChar)

  const answer = sumArray(
    illegalChars.map((char) => (char && SCORES[char]) || 0)
  )

  return answer
}

export default run
