<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { storeToRefs } from 'pinia';
import { useStore } from './utils/store';
import Login from './containers/Login/Login.vue';

// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <nav>
    <router-link :to="{ name: 'todos' }">Basic Todo</router-link>
    <router-link :to="{ name: 'rest' }">Rick and Morty (REST)</router-link>
    <router-link :to="{ name: 'gql' }">Rick and Morty (GraphQL)</router-link>
  </nav>
  <router-view />
  <Login />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  display: flex;
  justify-content: space-evenly;
  background-color: aliceblue;
}
</style>
