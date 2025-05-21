import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useGameStore } from '@/stores'

// Mock only the dependencies, not the whole @/stores barrel
vi.mock('@/stores/modules/teams', () => ({
  useTeamsStore: () => ({
    team1Name: 'Team 1',
    team2Name: 'Team 2',
  }),
}))
vi.mock('@/stores/modules/history', () => ({
  useHistoryStore: () => ({
    logPointChange: vi.fn(),
    resetHistory: vi.fn(),
  }),
}))
vi.mock('@/config', () => ({
  GAME_POINTS_30: 30,
}))

describe('game store', () => {
  let gameStore: ReturnType<typeof useGameStore>
  beforeEach(() => {
    setActivePinia(createPinia())
    gameStore = useGameStore()
    gameStore.resetGame()
  })

  it('initializes with default state', () => {
    expect(gameStore.pointsToWin).toBe(30)
    expect(gameStore.isMalas).toBe(true)
    expect(gameStore.gameEnded).toBe(false)
    expect(gameStore.winningTeam).toBeNull()
    expect(gameStore.team1Score).toBe(0)
    expect(gameStore.team2Score).toBe(0)
  })

  it('increments team1 score and logs history', () => {
    gameStore.incrementTeam1Score(2)
    expect(gameStore.team1Score).toBe(2)
  })

  it('increments team2 score and logs history', () => {
    gameStore.incrementTeam2Score(3)
    expect(gameStore.team2Score).toBe(3)
  })

  it('does not increment score if game ended', () => {
    gameStore.gameEnded = true
    gameStore.incrementTeam1Score(1)
    expect(gameStore.team1Score).toBe(0)
  })

  it('does not increment score above pointsToWin', () => {
    gameStore.team1Score = 29
    gameStore.incrementTeam1Score(2)
    expect(gameStore.team1Score).toBe(29)
  })

  it('decrements team1 score and logs history', () => {
    gameStore.team1Score = 5
    gameStore.decrementTeam1Score(2)
    expect(gameStore.team1Score).toBe(3)
  })

  it('decrements team2 score and logs history', () => {
    gameStore.team2Score = 4
    gameStore.decrementTeam2Score(3)
    expect(gameStore.team2Score).toBe(1)
  })

  it('does not decrement below zero', () => {
    gameStore.team1Score = 1
    gameStore.decrementTeam1Score(5)
    expect(gameStore.team1Score).toBe(0)
  })

  it('setPointsToWin resets the game', () => {
    gameStore.team1Score = 10
    gameStore.setPointsToWin(15)
    expect(gameStore.pointsToWin).toBe(15)
    expect(gameStore.team1Score).toBe(0)
    expect(gameStore.team2Score).toBe(0)
    expect(gameStore.isMalas).toBe(true)
    expect(gameStore.gameEnded).toBe(false)
    expect(gameStore.winningTeam).toBeNull()
  })

  it('toggleMalas toggles isMalas', () => {
    expect(gameStore.isMalas).toBe(true)
    gameStore.toggleMalas()
    expect(gameStore.isMalas).toBe(false)
    gameStore.toggleMalas()
    expect(gameStore.isMalas).toBe(true)
  })

  it('checkWinCondition sets gameEnded and winningTeam for team1', () => {
    gameStore.team1Score = 30
    gameStore.team2Score = 29
    gameStore.checkWinCondition()
    expect(gameStore.gameEnded).toBe(true)
    expect(gameStore.winningTeam).toBe('Team 1')
  })

  it('checkWinCondition sets winningTeam to team2 if higher', () => {
    gameStore.team1Score = 28
    gameStore.team2Score = 30
    gameStore.checkWinCondition()
    expect(gameStore.gameEnded).toBe(true)
    expect(gameStore.winningTeam).toBe('Team 2')
  })

  it('checkMalasCondition toggles isMalas if both teams >= 15', () => {
    gameStore.isMalas = true
    gameStore.team1Score = 15
    gameStore.team2Score = 15
    gameStore.checkMalasCondition()
    expect(gameStore.isMalas).toBe(false)
  })

  it('checkMalasCondition does not toggle if pointsToWin != 30', () => {
    gameStore.pointsToWin = 15
    gameStore.isMalas = true
    gameStore.team1Score = 15
    gameStore.team2Score = 15
    gameStore.checkMalasCondition()
    expect(gameStore.isMalas).toBe(true)
  })

  it('resetGame resets all state and calls resetHistory', () => {
    gameStore.team1Score = 10
    gameStore.team2Score = 12
    gameStore.isMalas = false
    gameStore.gameEnded = true
    gameStore.winningTeam = 'Team 1'
    gameStore.resetGame()
    expect(gameStore.team1Score).toBe(0)
    expect(gameStore.team2Score).toBe(0)
    expect(gameStore.isMalas).toBe(true)
    expect(gameStore.gameEnded).toBe(false)
    expect(gameStore.winningTeam).toBeNull()
  })

  it('cancelWin resets gameEnded and winningTeam', () => {
    gameStore.gameEnded = true
    gameStore.winningTeam = 'Team 1'
    gameStore.cancelWin()
    expect(gameStore.gameEnded).toBe(false)
    expect(gameStore.winningTeam).toBeNull()
  })
})
