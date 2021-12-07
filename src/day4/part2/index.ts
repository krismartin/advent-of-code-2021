import { parseInput, markBoards, printBoard, isBingo } from '../part1'
import sumArray from '../../lib/sumArray'

import type { Input } from '../../lib/readInput'
import type { Board, Boards } from '../part1'

const run = (input: Input): number | undefined => {
  const { drawnNumbers, boards } = parseInput(input)

  let lastDrawnNumber: number | undefined
  let lastCompletedBoard: Board | undefined

  drawnNumbers.forEach((drawnNumber) => {
    const incompleteBoards = boards.filter(({ bingo }) => !bingo)

    if (incompleteBoards.length) {
      markBoards(incompleteBoards, drawnNumber)
      incompleteBoards.forEach((board) => {
        if (isBingo(board)) {
          board.bingo = true

          lastCompletedBoard = board
          lastDrawnNumber = drawnNumber
        }
      })
    }
  })

  if (!lastCompletedBoard || !lastDrawnNumber) {
    console.warn('No Bingo!')
    return
  }

  console.log('Last completed board:')
  printBoard(lastCompletedBoard)

  const unmarkedNumbers = lastCompletedBoard.rows
    .flat()
    .filter(({ marked }) => !marked)
    .map(({ number }) => number)
  const sumOfUnmarkedNumbers = sumArray(unmarkedNumbers)
  console.log({ lastDrawnNumber, sumOfUnmarkedNumbers })

  return lastDrawnNumber * sumOfUnmarkedNumbers
}

export default run
