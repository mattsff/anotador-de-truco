export function buildGroups(points: number): number[] {
  const totalGroups = Math.floor(points / 5)
  const remainder = points % 5
  const result = []
  for (let i = 0; i < Math.min(totalGroups, 3); i++) {
    result.push(5)
  }
  if (totalGroups < 3 && remainder > 0) {
    result.push(remainder)
  }
  return result
}
