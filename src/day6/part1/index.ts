import type { Input } from '../../lib/readInput'

export const parseInput = (input: Input): Array<number> =>
  input[0].split(',').map((i) => parseInt(i))

const run = (input: Input): number => {
  const initialState = parseInput(input)
  const numberOfDays: number = 80

  const finalState = [...Array(numberOfDays)].reduce(
    (state: Array<number>, _, index) => {
      const newState: Array<number> = []
      let newItemCount = 0

      state.forEach((timer) => {
        let nextTimer = timer - 1
        if (nextTimer < 0) {
          nextTimer = 6
          newItemCount++
        }
        newState.push(nextTimer)
      })

      return newState.concat(Array(newItemCount).fill(8))
    },
    initialState
  )

  return finalState.length
}

export default run
