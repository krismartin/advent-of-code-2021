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
      selected: true,
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
  run(input)
  console.log(line)
}
