import { defineStore } from 'pinia';
import { GAME_POINTS_15, GAME_POINTS_30 } from '@/config';
import { useTeamsStore, useHistoryStore } from '@/stores';

interface GameState {
  pointsToWin: number;
  isMalas: boolean;
  gameEnded: boolean;
  winningTeam: string | null;
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    pointsToWin: GAME_POINTS_15,
    isMalas: true,
    gameEnded: false,
    winningTeam: null,
  }),
  actions: {
    setPointsToWin(points: number) {
      this.pointsToWin = points;
      this.isMalas = true; // Reset to malas when changing pointsToWin
      this.gameEnded = false;
      this.winningTeam = null;
    },
    toggleMalas() {
      this.isMalas = !this.isMalas;
    },
    setGameEnded(ended: boolean) {
      this.gameEnded = ended;
    },
    setWinningTeam(team: string | null) {
      this.winningTeam = team;
    },
    checkWinCondition() {
      const teamsStore = useTeamsStore();
      if (
        teamsStore.team1Score >= this.pointsToWin ||
        teamsStore.team2Score >= this.pointsToWin
      ) {
        this.setGameEnded(true);
        this.setWinningTeam(
          teamsStore.team1Score > teamsStore.team2Score
            ? teamsStore.team1Name
            : teamsStore.team2Name
        );
      } else if (this.pointsToWin === GAME_POINTS_30 && this.isMalas && teamsStore.team1Score >= 15 && teamsStore.team2Score >= 15) {
        this.toggleMalas(); 
      }
    },
    resetGame() {
      this.pointsToWin = GAME_POINTS_15;
      this.isMalas = true;
      this.gameEnded = false;
      this.winningTeam = null;
      const teamsStore = useTeamsStore();
      const historyStore = useHistoryStore();
      teamsStore.resetScores();
      historyStore.resetHistory();
    },
  },
});