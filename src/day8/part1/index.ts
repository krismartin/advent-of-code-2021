import type { Input } from '../../lib/readInput'

type OutputValue = Array<string>

const DIGIT_SEGMENT_MAPPINGS: { [digit: number]: number } = {
  1: 2, // 1 -> 2 segments
  2: 5, // 2 -> 5 segments
  3: 5, // 3 -> 5 segments
  4: 4, // 4 -> 4 segments
  5: 5, // 5 -> 5 segments
  6: 6, // 6 -> 6 segments
  7: 3, // 7 -> 3 segments
  8: 7, // 8 -> 7 segments
  9: 6, // 9 -> 6 segments
}

export const parseInput = (input: Input): Array<OutputValue> =>
  input.reduce((values: Array<OutputValue>, entry) => {
    const outputValues = entry.split('| ')[1]
    values.push(outputValues.split(' '))
    return values
  }, [])

const run = (input: Input): number | undefined => {
  const outputValues = parseInput(input)
  const digitsToFind = [1, 4, 7, 8]
  const segmentsToFind = digitsToFind.map(
    (digit) => DIGIT_SEGMENT_MAPPINGS[digit]
  )

  const answer = outputValues.reduce((count, values) => {
    const outputSegments = values.map((val) => val.length)
    return (
      count +
      outputSegments.filter((segments) => segmentsToFind.includes(segments))
        .length
    )
  }, 0)

  return answer
}

export default run
