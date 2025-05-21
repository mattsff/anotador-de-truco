import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useTeamsStore } from '@/stores/modules/teams'

describe('teams store', () => {
  let teamsStore: ReturnType<typeof useTeamsStore>
  beforeEach(() => {
    setActivePinia(createPinia())
    teamsStore = useTeamsStore()
  })

  it('initializes with default team names', () => {
    expect(teamsStore.team1Name).toBe('Nosotros')
    expect(teamsStore.team2Name).toBe('Ellos')
  })

  it('setTeam1Name updates team1Name', () => {
    teamsStore.setTeam1Name('Alpha')
    expect(teamsStore.team1Name).toBe('Alpha')
  })

  it('setTeam2Name updates team2Name', () => {
    teamsStore.setTeam2Name('Beta')
    expect(teamsStore.team2Name).toBe('Beta')
  })
})
