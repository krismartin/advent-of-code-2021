export default (
  array: Array<string>,
  { tieBreaker }: { tieBreaker: string }
): string => {
  const hashmap = array.reduce((acc: Record<string, number>, val: string) => {
    acc[val] = (acc[val] || 0) + 1
    return acc
  }, {})

  const leastFrequent = Object.keys(hashmap).filter((x) => {
    return hashmap[x] == Math.min.apply(null, Object.values(hashmap))
  })
  return leastFrequent.length > 1 ? tieBreaker : leastFrequent[0]
}
