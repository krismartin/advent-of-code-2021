import type { Input } from '../../lib/readInput'

type SignalPattern = Array<string>
type OutputValue = Array<string>
type LineEntry = [SignalPattern, OutputValue]

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

export const parseInput = (input: Input): Array<LineEntry> =>
  input.reduce((entries: Array<LineEntry>, entry) => {
    const [signalPatterns, outputValues] = entry.split(' | ')
    entries.push([signalPatterns.split(' '), outputValues.split(' ')])
    return entries
  }, [])

const run = (input: Input): number => {
  const outputValues = parseInput(input).map((lineEntry) => lineEntry[1])
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
