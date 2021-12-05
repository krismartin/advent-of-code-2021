import type { Input } from '../../lib/readInput'
import convertBinaryToDecimal from '../../lib/convertBinaryToDecimal'
import flipBits from '../../lib/flipBits'

const calculateGammaRate = (input: Input): string => {
  const gammaRate = input[0].split('').map((_, index) => {
    const binaryNumbers = input.map((binary) => binary[index])
    const count = binaryNumbers.length

    const countOnes = binaryNumbers.filter((bit) => bit === '1').length
    return countOnes >= count - countOnes ? '1' : '0'
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
