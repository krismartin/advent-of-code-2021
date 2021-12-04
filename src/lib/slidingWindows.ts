export default <T>(inputArray: Array<T>, windowSize: number): T[][] => {
  return inputArray.reduce((memo: T[][], item: T, index: number) => {
    const window = inputArray.slice(index, index + windowSize).filter(Boolean)
    if (window.length === windowSize) memo.push(window)
    return memo
  }, [])
}
