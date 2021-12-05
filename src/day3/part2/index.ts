import type { Input } from '../../lib/readInput'
import convertBinaryToDecimal from '../../lib/convertBinaryToDecimal'
import getMostFrequent from '../../lib/getMostFrequent'
import getLeastFrequent from '../../lib/getLeastFrequent'

const generateOxygenRating = (input: Input, index: number): Input => {
  if (input.length === 1) {
    return input
  }

  const mostCommonValue = getMostFrequent(
    input.map((binary) => binary[index]),
    { tieBreaker: '1' }
  )

  const filteredInput = input.filter(
    (binary) => binary[index] === mostCommonValue
  )
  return generateOxygenRating(filteredInput, index + 1)
}

const generateCo2ScrubberRating = (input: Input, index: number): Input => {
  if (input.length === 1) {
    return input
  }

  const leastCommonValue = getLeastFrequent(
    input.map((binary) => binary[index]),
    { tieBreaker: '0' }
  )

  const filteredInput = input.filter(
    (binary) => binary[index] === leastCommonValue
  )
  return generateCo2ScrubberRating(filteredInput, index + 1)
}

const run = (input: Input): number | undefined => {
  const oxygenRating = generateOxygenRating(input, 0)
  if (oxygenRating.length !== 1) {
    console.warn('Unable to determine oxgen rating')
    return
  }

  const oxygenRatingInDecimal = convertBinaryToDecimal(oxygenRating[0])

  const co2ScrubberRating = generateCo2ScrubberRating(input, 0)
  if (co2ScrubberRating.length !== 1) {
    console.warn('Unable to determine CO2 scrubber rating')
    return
  }

  const co2ScrubberRatingInDecimal = convertBinaryToDecimal(
    co2ScrubberRating[0]
  )

  console.log({
    oxygenRating: oxygenRating[0],
    oxygenRatingInDecimal,
    co2ScrubberRating: co2ScrubberRating[0],
    co2ScrubberRatingInDecimal,
  })

  return oxygenRatingInDecimal * co2ScrubberRatingInDecimal
}

export default run
