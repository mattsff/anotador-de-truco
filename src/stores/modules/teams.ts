import { defineStore } from 'pinia'

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    team1Name: 'Equipo 1',
    team2Name: 'Equipo 2',
  }),
  actions: {
    setTeam1Name(name: string) {
      this.team1Name = name
    },
    setTeam2Name(name: string) {
      this.team2Name = name
    },
  },
})
