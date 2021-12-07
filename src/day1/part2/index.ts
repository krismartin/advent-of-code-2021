import slidingWindows from '../../lib/slidingWindows'
import sumArray from '../../lib/sumArray'

import type { Input } from '../../lib/readInput'
type Measurements = Array<number>

const run = (input: Input): number => {
  const measurements: Measurements = input.map((i) => parseInt(i))
  const slidingMeasurements = slidingWindows(measurements, 3)

  const sumOfSlidingMeasurements: Array<number> = slidingMeasurements.map(
    (window) => sumArray(window)
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
