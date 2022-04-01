import { createRouter, createWebHistory } from 'vue-router';

const BasicTodo = () => import('./containers/BasicTodo/BasicTodo.vue');
const RickAndMorty = () => import('./containers/RickAndMorty/RickAndMorty.vue');
const RickAndMortyGql = () => import('./containers/RickAndMortyGql/RickAndMortyGql.vue');
const List = () => import('./containers/RickAndMorty/components/List.vue');
const ListGql = () => import('./containers/RickAndMortyGql/components/List.vue');
const Login = () => import('./containers/Login/Login.vue');

import { CHARACTER, EPISODE, LOCATION } from './utils/constants';

const routes = [
  { path: '/todo', name: 'todos', component: BasicTodo },
  {
    path: '/rick-and-morty-gql',
    component: RickAndMortyGql,
    name: 'gql',
    children: [
      { path: CHARACTER, component: ListGql },
      { path: LOCATION, component: ListGql },
      { path: EPISODE, component: ListGql },
    ],
  },
  {
    path: '/rick-and-morty',
    component: RickAndMorty,
    name: 'rest',
    children: [
      { path: CHARACTER, component: List },
      { path: LOCATION, component: List },
      { path: EPISODE, component: List },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
