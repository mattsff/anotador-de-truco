import { defineStore } from 'pinia';
import { useGameStore } from '@/stores';

interface TeamsState {
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
}

export const useTeamsStore = defineStore('teams', {
  state: (): TeamsState => ({
    team1Name: 'Equipo 1',
    team2Name: 'Equipo 2',
    team1Score: 0,
    team2Score: 0,
  }),
  actions: {
    setTeam1Name(name: string) {
      this.team1Name = name;
    },
    setTeam2Name(name: string) {
      this.team2Name = name;
    },
    incrementTeam1Score(points: number) {
      const gameStore = useGameStore();
      if (this.team1Score + points <= gameStore.pointsToWin) {
        this.team1Score += points;
      }
    },
    incrementTeam2Score(points: number) {
      const gameStore = useGameStore();
      if (this.team2Score + points <= gameStore.pointsToWin) {
        this.team2Score += points;
      }
    },
    decrementTeam1Score(points: number) {
      this.team1Score = Math.max(0, this.team1Score - points);
    },
    decrementTeam2Score(points: number) {
      this.team2Score = Math.max(0, this.team2Score - points);
    },
    resetScores() {
      this.team1Score = 0;
      this.team2Score = 0;
    },
  },
});