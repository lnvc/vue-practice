import { createApp, provide, h } from 'vue';
import { ApolloClients } from '@vue/apollo-composable';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { createPinia } from 'pinia';
import { persist } from 'pinia-persists';
import { v4 } from 'uuid';
import Cookie from 'js-cookie';
import CryptoJS from 'crypto-js';

import App from './App.vue';
import router from './router';
import { useStore } from './utils/store';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://rickandmortyapi.com/graphql',
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const httpLink2 = createHttpLink({
  uri: 'http://localhost:4000',
});
const cache2 = new InMemoryCache();
const todosClient = new ApolloClient({
  link: httpLink2,
  cache: cache2,
})

const pinia = createPinia();
pinia.use(persist({
  storage: {
    getItem: () => {
      const encryptedStore = window.localStorage.getItem('store');
      if (encryptedStore) {
        const key = Cookie.get('cookie') || v4();
        Cookie.set('cookie', key, { secure: true, expires: 1 });
        try {
          const store = CryptoJS.AES.decrypt(encryptedStore, key).toString(CryptoJS.enc.Utf8);
          console.log('get', JSON.parse(store));
          return JSON.parse(store);
        } catch (err) {
          window.localStorage.removeItem('store');
          return null;
        }
      }
      return null;
    },
    setItem: (_, value) => {
      const key = Cookie.get('cookie') || v4();
      Cookie.set('cookie', key, { secure: true, expires: 1 });
      const encryptedStore = CryptoJS.AES.encrypt(value, key).toString();
      return window.localStorage.setItem('store', encryptedStore);
    },
    removeItem: () => {
      window.localStorage.removeItem('store');
    },
  }
}));

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
      todos: todosClient,
    })
  },
  render: () => h(App),
});

app.use(router);

app.use(pinia);

router.beforeEach((to, from) => {
  const store = useStore(pinia);
  if (!store.isAuthenticated) {
    return '/login';
  }
});

app.mount('#app');
