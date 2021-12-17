import type { Input } from '../../lib/readInput'
import { parseInput } from '../part1'

const includes = (
  str1: string | undefined,
  str2: string | undefined
): boolean => {
  if (!str1 || !str2) {
    return false
  }
  const set = new Set([...str1])
  return [...str2].every((x) => set.has(x))
}

const run = (input: Input): number | undefined => {
  const entries = parseInput(input)

  const answer = entries.reduce((sum: number, entry) => {
    const signalPatterns = entry[0].map((pattern) =>
      pattern.split('').sort().join('')
    )

    // Get known digits (1, 4, 7 and 8)
    const mappings: { [digit: number]: string | undefined } = {
      1: signalPatterns.find((pattern) => pattern.length === 2),
      4: signalPatterns.find((pattern) => pattern.length === 4),
      7: signalPatterns.find((pattern) => pattern.length === 3),
      8: signalPatterns.find((pattern) => pattern.length === 7),
    }

    // Unknown digits: 0, 2, 3, 5, 6 and 9

    // Digit: 6
    mappings[6] = signalPatterns.find(
      (pattern) => pattern.length === 6 && !includes(pattern, mappings[1])
    )

    // Digit: 9
    mappings[9] = signalPatterns.find(
      (pattern) =>
        pattern.length === 6 &&
        pattern !== mappings[6] &&
        includes(pattern, mappings[4])
    )

    // Digit: 0
    mappings[0] = signalPatterns.find(
      (pattern) =>
        pattern.length === 6 &&
        pattern !== mappings[6] &&
        pattern !== mappings[9]
    )

    // Digit: 3
    mappings[3] = signalPatterns.find(
      (pattern) => pattern.length === 5 && includes(pattern, mappings[1])
    )

    // Digit: 5
    mappings[5] = signalPatterns.find(
      (pattern) =>
        pattern.length === 5 &&
        pattern !== mappings[3] &&
        includes(mappings[6], pattern)
    )

    // Digit: 2
    mappings[2] = signalPatterns.find(
      (pattern) =>
        pattern.length === 5 &&
        pattern !== mappings[3] &&
        pattern !== mappings[5]
    )

    const dictionary = Object.fromEntries(
      Object.entries(mappings).map((x) => x.reverse())
    )

    const outputValues = entry[1].map((outputValue) =>
      outputValue.split('').sort().join('')
    )
    const output = Number(
      outputValues.map((outputValue) => dictionary[outputValue]).join('')
    )

    return sum + output
  }, 0)

  return answer
}

export default run
