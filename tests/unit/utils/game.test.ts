import { describe, it, expect } from 'vitest'
import { buildGroups } from '@/utils/game'

describe('buildGroups', () => {
  it('returns empty array for 0 points', () => {
    expect(buildGroups(0)).toEqual([])
  })

  it('returns [5] for 5 points', () => {
    expect(buildGroups(5)).toEqual([5])
  })

  it('returns [5, 5] for 10 points', () => {
    expect(buildGroups(10)).toEqual([5, 5])
  })

  it('returns [5, 5, 5] for 15 points', () => {
    expect(buildGroups(15)).toEqual([5, 5, 5])
  })

  it('returns [5, 5, 5] for 17 points (ignores remainder if totalGroups >= 3)', () => {
    expect(buildGroups(17)).toEqual([5, 5, 5])
  })

  it('returns [5, 2] for 7 points', () => {
    expect(buildGroups(7)).toEqual([5, 2])
  })

  it('returns [5, 5, 3] for 13 points', () => {
    expect(buildGroups(13)).toEqual([5, 5, 3])
  })

  it('returns [5, 5, 5] for 20 points (max 3 groups of 5)', () => {
    expect(buildGroups(20)).toEqual([5, 5, 5])
  })

  it('returns [5, 5, 5] for 25 points (max 3 groups of 5)', () => {
    expect(buildGroups(25)).toEqual([5, 5, 5])
  })

  it('returns [5, 5, 5] for 29 points (max 3 groups of 5)', () => {
    expect(buildGroups(29)).toEqual([5, 5, 5])
  })

  it('returns [5, 5, 5] for multiples of 5 >= 15', () => {
    expect(buildGroups(30)).toEqual([5, 5, 5])
    expect(buildGroups(35)).toEqual([5, 5, 5])
  })
})
