import type { Input } from '../../lib/readInput'
type Measurements = Array<number>

const run = (input: Input): number => {
  const measurements: Measurements = input.map((i) => parseInt(i))

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

  return increasedCount
}

export default run
