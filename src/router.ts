import { createRouter, createWebHistory } from 'vue-router';

const BasicTodo = () => import('./containers/BasicTodo/BasicTodo.vue');
const RickAndMorty = () => import('./containers/RickAndMorty/RickAndMorty.vue');
const List = () => import('./containers/RickAndMorty/components/List.vue');
import { CHARACTER, EPISODE, LOCATION } from './utils/constants';

const routes = [
  { path: '/todo', component: BasicTodo },
  {
    path: '/rick-and-morty',
    component: RickAndMorty,
    children: [
      { path: CHARACTER, name: CHARACTER, component: List },
      { path: LOCATION, name: LOCATION, component: List },
      { path: EPISODE, name: EPISODE, component: List },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
