<script setup lang="ts">
import { ref, reactive, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';

import { IResult } from '../../../types/RickAndMorty';
import { GET_ALL_CHARACTERS, GET_ALL_LOCATIONS, GET_ALL_EPISODES } from '../../../utils/queries';
import { CHARACTER, EPISODE, LOCATION } from '../../../utils/constants';

const route = useRoute();
const currentRoute = ref(route.path.split('/').at(-1));
let metaData = reactive({
  next: null,
  prev: null,
});
const data = ref<IResult[]>([]);
const isLoading = ref(true);
const hasError = ref(false);
const currentPage = ref(1);
const options = reactive<any>({
  fetchPolicy: 'cache-first',
});

const {
  result: characters,
  error: charactersError,
  refetch: fetchMoreCharacters,
} = useQuery(GET_ALL_CHARACTERS, { page: 1 }, options);
const {
  result: locations,
  error: locationsError,
  refetch: fetchMoreLocations,
} = useQuery(GET_ALL_LOCATIONS, { page: 1 }, options);
const {
  result: episodes,
  error: episodesError,
  refetch: fetchMoreEpisodes,
} = useQuery(GET_ALL_EPISODES, { page: 1 }, options);

const reinitialize = () => {
  currentRoute.value = route.path.split('/').at(-1);
  isLoading.value = true;
  hasError.value = false;
  currentPage.value = 1;
};

const fetchData = () => {
  if (currentRoute.value === CHARACTER) {
    if (characters.value) {
      const shortenedPath = characters.value.characters;
      metaData.prev = shortenedPath.info.prev;
      metaData.next = shortenedPath.info.next;
      data.value = [...shortenedPath.results];
    } else if (charactersError.value) {
      hasError.value = true;
    }
  } else if (currentRoute.value === LOCATION) {
    if (locations.value) {
      const shortenedPath = locations.value.locations;
      metaData.prev = shortenedPath.info.prev;
      metaData.next = shortenedPath.info.next;
      data.value = [...shortenedPath.results];
    } else if (locationsError.value) {
      hasError.value = true;
    }
  } else if (currentRoute.value === EPISODE) {
    if (episodes.value) {
      const shortenedPath = episodes.value.episodes;
      metaData.prev = shortenedPath.info.prev;
      metaData.next = shortenedPath.info.next;
      data.value = [...shortenedPath.results];
    } else if (episodesError.value) {
      hasError.value = true;
    }
  }
  isLoading.value = false;
};

const getPage = async () => {
  if (currentRoute.value === CHARACTER && characters.value) {
    isLoading.value = true;
    const newPage = await fetchMoreCharacters({ page: currentPage.value } as any);
    if (newPage) {
      metaData.prev = newPage.data.characters.info.prev;
      metaData.next = newPage.data.characters.info.next;
      data.value = [...newPage.data.characters.results];
    }
  } else if (currentRoute.value === LOCATION && locations.value) {
    isLoading.value = true;
    const newPage = await fetchMoreLocations({ page: currentPage.value } as any);
    if (newPage) {
      metaData.prev = newPage.data.locations.info.prev;
      metaData.next = newPage.data.locations.info.next;
      data.value = [...newPage.data.locations.results];
    }

  } else if (currentRoute.value === EPISODE && episodes.value) {
    isLoading.value = true;
    const newPage = await fetchMoreEpisodes({ page: currentPage.value } as any);
    if (newPage) {
      metaData.prev = newPage.data.episodes.info.prev;
      metaData.next = newPage.data.episodes.info.next;
      data.value = [...newPage.data.episodes.results];
    }
  }
  isLoading.value = false;
};

// use watchEffect if counting initial state as an update
watchEffect(fetchData);
// works the same as watchEffect:
// onMounted(fetchData);
// watch([characters, locations, episodes], fetchData);

// on change route
watch(route, () => {
  reinitialize();
  fetchData();
});

// on new page
watch(currentPage, getPage);

</script>

<template>
  <section v-if="hasError">
    <em>error! please try again later</em>
  </section>
  <section v-else-if="isLoading || !data.length">
    <em>loading...</em>
  </section>
  <section v-else>
    <ul>
      <li v-for="item in data" :key="item.id">
        <em>{{ item.name }}</em>
      </li>
    </ul>
    <button :disabled="!metaData.prev" @click="currentPage--">prev</button>
    <button :disabled="!metaData.next" @click="currentPage++">next</button>
  </section>
</template>

<style scoped>
</style>
