<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { CHARACTER, LOCATION, EPISODE } from '../../utils/constants';

</script>

<template>
  <main>
    <h1>rick and morty (REST)</h1>
    <nav>
      <router-link :to="{ path: `/rick-and-morty/${CHARACTER}` }">{{ CHARACTER }}</router-link>
      <router-link :to="{ path: `/rick-and-morty/${LOCATION}` }">{{ LOCATION }}</router-link>
      <router-link :to="{ path: `/rick-and-morty/${EPISODE}` }">{{ EPISODE }}</router-link>
    </nav>
    <router-view />
  </main>
</template>

<style scoped>
</style>
