import type { Input } from '../../lib/readInput'
type Measurements = Array<number>

const run = (input: Input): void => {
  const measurements: Measurements = input.map((i) => parseInt(i))
  console.log('Input:')
  console.log(measurements)

  let increasedCount = 0
  measurements.reduce(
    (prevMeasurement: number | undefined, measurement: number) => {
      if (prevMeasurement && measurement > prevMeasurement) {
        increasedCount++
      }
      return measurement
    },
    undefined
  )

  console.log(`Answer: ${increasedCount}`)
}

export default run
