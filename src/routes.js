import { lazy } from 'react';

const routes = [
  {
    path: 'home',
    component: lazy(() => import('./Home')),
    exact: true
  },
  {
    path: 'add',
    component: lazy(() => import('./createQuestion')),
    exact: true
  },
  {
    path: 'leaderboard',
    component: lazy(() => import('./LeaderBoard')),
    exact: true
  },
  {
    path: 'questions/:id',
    component: lazy(() => import('./LeaderBoard')),
    exact: true
  }
];

export default routes;