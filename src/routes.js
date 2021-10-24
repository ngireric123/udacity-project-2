import { route } from 'react';

const routes = [
  {
    path: 'home',
    component: route(() => import('./Home')),
    exact: true
  },
  {
    path: 'add',
    component: route(() => import('./createQuestion')),
    exact: true
  },
  {
    path: 'leaderboard',
    component: route(() => import('./LeaderBoard')),
    exact: true
  },
  {
    path: 'questions/:id',
    component: route(() => import('./LeaderBoard')),
    exact: true
  }
];

export default routes;