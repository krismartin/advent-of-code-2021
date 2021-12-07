export default <T>(inputArray: Array<T>, chunkSize: number): T[][] => {
  return inputArray.reduce((resultArray: T[][], item, index) => {
    const chunkIndex = Math.floor(index / chunkSize)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])
}
