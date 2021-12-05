import type { Input } from '../../lib/readInput'
import getMostFrequent from '../../lib/getMostFrequent'
import convertBinaryToDecimal from '../../lib/convertBinaryToDecimal'
import flipBits from '../../lib/flipBits'

const calculateGammaRate = (input: Input): string => {
  const gammaRate = input[0].split('').map((_, index) => {
    return getMostFrequent(
      input.map((binary) => binary[index]),
      { tieBreaker: '1' }
    )
  })

  return gammaRate.join('')
}

const run = (input: Input): number => {
  const gammaRate = calculateGammaRate(input)
  const epsilonRate = flipBits(gammaRate)

  const gammaRateInDecimal = convertBinaryToDecimal(gammaRate)
  const epsilonRateInDecimal = convertBinaryToDecimal(epsilonRate)

  console.log({
    gammaRate,
    gammaRateInDecimal,
    epsilonRate,
    epsilonRateInDecimal,
  })

  return gammaRateInDecimal * epsilonRateInDecimal
}

export default run
