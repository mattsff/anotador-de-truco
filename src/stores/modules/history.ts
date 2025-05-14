import { defineStore } from 'pinia'

interface HistoryRecord {
  team: string
  points: number
}

interface HistoryState {
  pointsLog: HistoryRecord[]
}

export const useHistoryStore = defineStore('history', {
  state: (): HistoryState => ({
    pointsLog: [],
  }),
  actions: {
    logPointChange(record: HistoryRecord) {
      this.pointsLog.push(record)
    },
    resetHistory() {
      this.pointsLog = []
    },
  },
})
