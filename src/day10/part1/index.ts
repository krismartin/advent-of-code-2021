import type { Input } from '../../lib/readInput'
import sumArray from '../../lib/sumArray'

const OPENING_CHARS: Array<string> = ['(', '[', '{', '<']
const ILLEGAL_CHAR_SCORES: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const parseInput = (input: Input): string[][] =>
  input.map((line) => line.split(''))

const isValidClosingChar = (
  openingChar: string,
  closingChar: string
): boolean => {
  if (openingChar === '(' && closingChar === ')') {
    return true
  } else if (openingChar === '[' && closingChar === ']') {
    return true
  } else if (openingChar === '{' && closingChar === '}') {
    return true
  } else if (openingChar === '<' && closingChar === '>') {
    return true
  }

  return false
}

const isValid = (
  line: Array<string>
): { valid: boolean; illegalChar: string | undefined } => {
  let openingChars: Array<string> = []
  let illegalChar: string | undefined

  line.every((char) => {
    if (OPENING_CHARS.includes(char)) {
      openingChars.push(char)
      return true
    } else {
      const lastOpeningChar = openingChars[openingChars.length - 1]

      if (isValidClosingChar(lastOpeningChar, char)) {
        openingChars.pop()
        return true
      } else {
        illegalChar = char
        return false
      }
    }
  })

  return {
    valid: !illegalChar,
    illegalChar,
  }
}

const run = (input: Input): number => {
  const illegalChars = parseInput(input).reduce(
    (result: Array<string>, line) => {
      const { illegalChar } = isValid(line)
      if (illegalChar) {
        result.push(illegalChar)
      }
      return result
    },
    []
  )
  const answer = sumArray(illegalChars.map((char) => ILLEGAL_CHAR_SCORES[char]))
  return answer
}

export default run
