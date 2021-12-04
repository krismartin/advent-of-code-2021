import type { Input } from '../../lib/readInput'
type Result = Record<string, number>
type Move = {
  move: string
  unit: number | Function
}

const parseInput = (input: string): Array<Move> | undefined => {
  const [step, rawUnit] = input.split(' ')
  const unit = parseInt(rawUnit)
  if (step === 'down') {
    return [
      {
        move: 'aim',
        unit,
      },
    ]
  } else if (step === 'up') {
    return [
      {
        move: 'aim',
        unit: -unit,
      },
    ]
  } else if (step === 'forward') {
    return [
      {
        move: 'horizontal',
        unit: unit,
      },
      {
        move: 'depth',
        unit: (result: Result): number => result.aim * unit,
      },
    ]
  } else {
    console.warn(`Unknown input ${input}`)
  }
}

const run = (input: Input): number => {
  const result: Result = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  }

  const steps = input.flatMap((i) => parseInput(i))
  steps.forEach((step) => {
    if (step) {
      const { move, unit } = step
      if (typeof unit === 'function') {
        result[move] += unit(result)
      } else {
        result[move] += unit
      }
    }
  })

  console.log(result)
  const answer = result.horizontal * result.depth
  return answer
}

export default run
