import { createRouter, createWebHistory } from 'vue-router';

import BasicTodo from './containers/BasicTodo/BasicTodo.vue';
import RickAndMorty from './containers/RickAndMorty/RickAndMorty.vue';

const routes = [
  { path: '/todo', component: BasicTodo },
  { path: '/rick-and-morty', component: RickAndMorty },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
