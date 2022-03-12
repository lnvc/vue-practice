<script setup lang="ts">
import { CHARACTER, LOCATION, EPISODE } from '../../utils/constants';
</script>

<template>
  <main>
    <h1>rick and morty (gql)</h1>
    <nav>
      <router-link :to="{ path: `/rick-and-morty-gql/${CHARACTER}` }">{{ CHARACTER }}</router-link>
      <router-link :to="{ path: `/rick-and-morty-gql/${LOCATION}` }">{{ LOCATION }}</router-link>
      <router-link :to="{ path: `/rick-and-morty-gql/${EPISODE}` }">{{ EPISODE }}</router-link>
    </nav>
    <router-view />
  </main>
</template>

<style scoped>
</style>
