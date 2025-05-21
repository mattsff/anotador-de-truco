import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useHistoryStore } from '@/stores/modules/history'

describe('history store', () => {
  let historyStore: ReturnType<typeof useHistoryStore>
  beforeEach(() => {
    setActivePinia(createPinia())
    historyStore = useHistoryStore()
    historyStore.resetHistory()
  })

  it('initializes with empty pointsLog', () => {
    expect(historyStore.pointsLog).toEqual([])
  })

  it('logPointChange adds a record', () => {
    historyStore.logPointChange({ teamNumber: 1, points: 2 })
    expect(historyStore.pointsLog).toEqual([{ teamNumber: 1, points: 2 }])
  })

  it('logPointChange can add multiple records', () => {
    historyStore.logPointChange({ teamNumber: 1, points: 2 })
    historyStore.logPointChange({ teamNumber: 2, points: 3 })
    expect(historyStore.pointsLog).toEqual([
      { teamNumber: 1, points: 2 },
      { teamNumber: 2, points: 3 },
    ])
  })

  it('resetHistory clears pointsLog', () => {
    historyStore.logPointChange({ teamNumber: 1, points: 2 })
    historyStore.resetHistory()
    expect(historyStore.pointsLog).toEqual([])
  })
})
