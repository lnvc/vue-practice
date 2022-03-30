import { createApp, provide, h } from 'vue';
import { ApolloClients } from '@vue/apollo-composable';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

import App from './App.vue';
import router from './router';
import { relayStylePagination } from '@apollo/client/utilities';

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

app.mount('#app');
