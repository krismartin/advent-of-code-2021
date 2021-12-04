import type { Input } from '../../lib/readInput'
import convertBinaryToDecimal from '../../lib/convertBinaryToDecimal'
import flipBits from '../../lib/flipBits'

const generateDiagnostic = (
  binaryNumbers: Input
): Record<string, Array<string>> =>
  binaryNumbers.reduce((memo: Record<string, Array<string>>, binary) => {
    binary.split('').forEach((bit, index) => {
      memo[index] ||= []
      memo[index].push(bit)
    })
    return memo
  }, {})

const generateGammaRate = (diagnostic: Record<string, Array<string>>): string =>
  Object.keys(diagnostic)
    .map((index) => {
      const binary = diagnostic[index]
      const counts = binary.reduce(
        (count: Record<string, number>, bit: string) => {
          count[bit] ? count[bit]++ : (count[bit] = 1)
          return count
        },
        {}
      )
      const gammaRate = counts['1'] >= counts['0'] ? '1' : '0'
      return gammaRate
    })
    .join('')

const run = (input: Input): number => {
  const diagnostic = generateDiagnostic(input)
  const gammaRate = generateGammaRate(diagnostic)
  const gammaRateInDecimal = convertBinaryToDecimal(gammaRate)
  const epsilonRate = flipBits(gammaRate)
  const epsilonRateInDecimal = convertBinaryToDecimal(epsilonRate)
  console.log({
    gammaRate,
    gammaRateInDecimal,
    epsilonRate,
    epsilonRateInDecimal,
  })
  const answer = gammaRateInDecimal * epsilonRateInDecimal
  return answer
}

export default run
