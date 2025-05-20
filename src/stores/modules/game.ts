import { defineStore } from 'pinia'
import { GAME_POINTS_30 } from '@/config'
import { useTeamsStore, useHistoryStore } from '@/stores'

interface GameState {
  pointsToWin: number
  isMalas: boolean
  gameEnded: boolean
  winningTeam: string | null
  team1Score: number
  team2Score: number
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    pointsToWin: GAME_POINTS_30,
    isMalas: true,
    gameEnded: false,
    winningTeam: null,
    team1Score: 0,
    team2Score: 0,
  }),
  actions: {
    incrementTeam1Score(points: number = 1) {
      if (this.gameEnded) return
      if (this.team1Score + points <= this.pointsToWin) {
        this.team1Score += points
        const teamsStore = useTeamsStore()
        const historyStore = useHistoryStore()
        historyStore.logPointChange({
          teamNumber: 1,
          points,
        })
        this.checkWinCondition()
      }
    },
    incrementTeam2Score(points: number = 1) {
      if (this.gameEnded) return
      if (this.team2Score + points <= this.pointsToWin) {
        this.team2Score += points
        const teamsStore = useTeamsStore()
        const historyStore = useHistoryStore()
        historyStore.logPointChange({
          teamNumber: 2,
          points,
        })
        this.checkWinCondition()
      }
    },
    decrementTeam1Score(points: number = 1) {
      this.team1Score = Math.max(0, this.team1Score - points)
      const teamsStore = useTeamsStore()
      const historyStore = useHistoryStore()
      historyStore.logPointChange({
        teamNumber: 1,
        points: -points,
      })
    },
    decrementTeam2Score(points: number = 1) {
      this.team2Score = Math.max(0, this.team2Score - points)
      const teamsStore = useTeamsStore()
      const historyStore = useHistoryStore()
      historyStore.logPointChange({
        teamNumber: 2,
        points: -points,
      })
    },
    setPointsToWin(points: number) {
      this.pointsToWin = points
      this.resetGame()
    },
    toggleMalas() {
      this.isMalas = !this.isMalas
    },
    checkWinCondition() {
      this.checkMalasCondition()
      const teamsStore = useTeamsStore()
      if (
        this.team1Score >= this.pointsToWin ||
        this.team2Score >= this.pointsToWin
      ) {
        this.gameEnded = true
        this.winningTeam =
          this.team1Score > this.team2Score
            ? teamsStore.team1Name
            : teamsStore.team2Name
      }
    },
    checkMalasCondition() {
      if (
        this.pointsToWin === GAME_POINTS_30 &&
        this.isMalas &&
        this.team1Score >= 15 &&
        this.team2Score >= 15
      ) {
        this.toggleMalas()
      }
    },
    resetGame() {
      this.isMalas = true
      this.gameEnded = false
      this.winningTeam = null
      this.team1Score = 0
      this.team2Score = 0
      const historyStore = useHistoryStore()
      historyStore.resetHistory()
    },
    cancelWin() {
      this.gameEnded = false
      this.winningTeam = null
    },
  },
  persist: true,
})
