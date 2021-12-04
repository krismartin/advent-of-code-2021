import type { Input } from '../../lib/readInput'
type Result = Record<string, number>

const parseInput = (input: string): { move: string; unit: number } => {
  const [step, rawUnit] = input.split(' ')
  const unit = parseInt(rawUnit)
  return {
    move: step === 'forward' ? 'horizontal' : 'depth',
    unit: step === 'up' ? -unit : unit,
  }
}

const run = (input: Input): number => {
  const result: Result = {
    horizontal: 0,
    depth: 0,
  }

  const steps = input.map((i) => parseInput(i))
  steps.forEach(({ move, unit }) => {
    result[move] += unit
  })

  console.log(result)
  const answer = result.horizontal * result.depth
  return answer
}

export default run
