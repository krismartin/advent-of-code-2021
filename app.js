const prompts = require('prompts')
const readInput = require('./src/lib/readInput').default

const prompt = {
  type: 'select',
  name: 'input',
  message: 'Pick advent day to run',
  choices: [
    {
      title: 'Day 1: Sonar Sweep - Part 1',
      value: { day: 1, part: 1 },
      selected: true,
    },
    {
      title: 'Day 1: Sonar Sweep - Part 2',
      value: { day: 1, part: 2 },
    },
    {
      title: 'Day 2: Dive! - Part 1',
      value: { day: 2, part: 1 },
    },
    {
      title: 'Day 2: Dive! - Part 2',
      value: { day: 2, part: 2 },
    },
    {
      title: 'Day 3: Binary Diagnostic - Part 1',
      value: { day: 3, part: 1 },
    },
    {
      title: 'Day 3: Binary Diagnostic - Part 2',
      value: { day: 3, part: 2 },
    },
    {
      title: 'Day 4: Giant Squid - Part 1',
      value: { day: 4, part: 1 },
    },
    {
      title: 'Day 5: Hydrothermal Venture - Part 1',
      value: { day: 5, part: 1 },
    },
    {
      title: 'Day 5: Hydrothermal Venture - Part 2',
      value: { day: 5, part: 2 },
    },
    {
      title: 'Day 6: Lanternfish - Part 1',
      value: { day: 6, part: 1 },
    },
  ],
}

;(async () => {
  const { input } = await prompts(prompt)
  processInput(input)
})()

const line = '-'.repeat(process.stdout.columns / 2)

const processInput = ({ day, part }) => {
  const input = readInput(`${__dirname}/src/day${day}/input.txt`)
  const run = require(`./src/day${day}/part${part}`).default

  console.log(line)

  console.log('Input:')
  console.log(input)

  const answer = run(input)
  console.log(`Answer: ${answer}`)

  console.log(line)
}
