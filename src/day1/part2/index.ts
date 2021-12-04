import slidingWindows from '../../lib/slidingWindows'

import type { Input } from '../../lib/readInput'
type Measurements = Array<number>

const run = (input: Input): number => {
  const measurements: Measurements = input.map((i) => parseInt(i))
  const slidingMeasurements = slidingWindows(measurements, 3)

  const sumOfSlidingMeasurements: Array<number> = slidingMeasurements.map(
    (window) => window.reduce((sum, measurement) => (sum += measurement), 0)
  )

  let increasedCount = 0
  sumOfSlidingMeasurements.reduce(
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
