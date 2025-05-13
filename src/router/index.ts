import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Scoreboard from '@/components/Scoreboard.vue';
import TeamConfig from '@/components/TeamConfig.vue';
import History from '@/components/History.vue';
import GameConfig from '@/components/GameConfig.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Scoreboard',
    component: Scoreboard,
  },
  {
    path: '/teams',
    name: 'TeamConfig',
    component: TeamConfig,
  },
  {
    path: '/history',
    name: 'History',
    component: History,
  },
  {
    path: '/game-config',
    name: 'GameConfig',
    component: GameConfig,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;