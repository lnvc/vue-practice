<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { CHARACTER, LOCATION, EPISODE } from '../../utils/constants';

</script>

<template>
  <main>
    <h1>rick and morty (REST)</h1>
    <nav>
      <router-link :to="{ name: CHARACTER }">{{ CHARACTER }}</router-link>
      <router-link :to="{ name: LOCATION }">{{ LOCATION }}</router-link>
      <router-link :to="{ name: EPISODE }">{{ EPISODE }}</router-link>
    </nav>
    <!-- <List :path="selectedPath" /> -->
    <router-view />
  </main>
</template>

<style scoped>
</style>
