import type { Input } from '../../lib/readInput'
import chunkArray from '../../lib/chunkArray'
import sumArray from '../../lib/sumArray'

type DrawnNumber = number
type DrawnNumbers = Array<DrawnNumber>

type BoardNumber = {
  number: number
  marked: boolean
}
export type Board = {
  bingo: boolean
  rows: BoardNumber[][]
  cols: BoardNumber[][]
}
export type Boards = Array<Board>

const BOARD_SIZE: number = 5

export const markBoards = (boards: Boards, drawnNumber: number): void => {
  boards.forEach((board, boardIndex) => {
    ;[board.rows, board.cols].forEach((numbers) => {
      const numbersToBeMarked = numbers
        .flat()
        .filter(({ number }) => number === drawnNumber)
      numbersToBeMarked.forEach((number) => (number.marked = true))
    })
  })
}

export const isBingo = (board: Board): boolean => {
  const markedRows = board.rows.find((numbers) =>
    numbers.every(({ marked }) => marked)
  )
  if (markedRows) {
    return true
  }

  const markedCols = board.cols.find((numbers) =>
    numbers.every(({ marked }) => marked)
  )
  if (markedCols) {
    return true
  }

  return false
}

const findBingo = (boards: Boards): Board | undefined => {
  const board = boards.find((board) => isBingo(board))
  if (board) {
    board.bingo = true
  }
  return board
}

const createBoard = (numbers: Array<number>): Board => {
  const boardNumbers = numbers.map((number) => ({ number, marked: false }))

  const rows = chunkArray(boardNumbers, BOARD_SIZE)
  const cols = boardNumbers.reduce((arr: Board['cols'], number, index) => {
    const colIndex = index % BOARD_SIZE
    if (!arr[colIndex]) {
      arr[colIndex] = []
    }
    arr[colIndex].push(number)
    return arr
  }, [])

  return { bingo: false, rows, cols }
}

export const parseInput = (
  input: Input
): { drawnNumbers: DrawnNumbers; boards: Boards } => {
  const drawnNumbers = input[0].split(',').map((number) => parseInt(number))

  const numbers = input
    .slice(1)
    .flatMap((numbers) => numbers.split(' ').filter(Boolean))
    .map((number) => parseInt(number))
  const boardNumbers = chunkArray(numbers, BOARD_SIZE * BOARD_SIZE)

  const boards = boardNumbers.map((numbers) => createBoard(numbers))

  return { drawnNumbers, boards }
}

export const printBoard = (board: Board) => {
  board.rows.forEach((row) => {
    const numbers = row
      .map(({ number, marked }) =>
        marked ? '\x1b[31m' + number + '\u0336\x1b[0m' : number
      )
      .join('\t')
    console.log(numbers)
    console.log('\n')
  })
}

const run = (input: Input): number | undefined => {
  const { drawnNumbers, boards } = parseInput(input)
  console.log({ drawnNumbers, numberOfBoards: boards.length })

  let lastDrawnNumber: DrawnNumber | undefined

  const completedBoard = drawnNumbers.reduce(
    (winner: Board | undefined, drawnNumber) => {
      if (!winner) {
        markBoards(boards, drawnNumber)
        winner = findBingo(boards)
        lastDrawnNumber = drawnNumber
      }
      return winner
    },
    undefined
  )

  if (!completedBoard || !lastDrawnNumber) {
    console.warn('No Bingo!')
    return
  }

  console.log('Completed board:')
  printBoard(completedBoard)

  const unmarkedNumbers = completedBoard.rows
    .flat()
    .filter(({ marked }) => !marked)
    .map(({ number }) => number)
  const sumOfUnmarkedNumbers = sumArray(unmarkedNumbers)
  console.log({ lastDrawnNumber, sumOfUnmarkedNumbers })

  return lastDrawnNumber * sumOfUnmarkedNumbers
}

export default run
