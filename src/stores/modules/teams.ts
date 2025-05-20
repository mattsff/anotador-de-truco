import { defineStore } from 'pinia'

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    team1Name: 'Nosotros',
    team2Name: 'Ellos',
  }),
  actions: {
    setTeam1Name(name: string) {
      this.team1Name = name
    },
    setTeam2Name(name: string) {
      this.team2Name = name
    },
  },
  persist: true,
})
