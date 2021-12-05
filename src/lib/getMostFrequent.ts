export default (
  array: Array<string>,
  { tieBreaker }: { tieBreaker: string }
): string => {
  const hashmap = array.reduce((acc: Record<string, number>, val: string) => {
    acc[val] = (acc[val] || 0) + 1
    return acc
  }, {})

  const mostFrequent = Object.keys(hashmap).filter((x) => {
    return hashmap[x] == Math.max.apply(null, Object.values(hashmap))
  })
  return mostFrequent.length > 1 ? tieBreaker : mostFrequent[0]
}
