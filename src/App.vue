<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <nav>
    <router-link to="/todo">Basic Todo</router-link>
    <router-link to="/rick-and-morty">Rick and Morty (REST)</router-link>
    <router-link to="/rick-and-morty-gql">Rick and Morty (GraphQL)</router-link>
  </nav>
  <router-view />
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
