<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ICharacter, ILocation, IEpisode } from '../../../types/RickAndMorty';
import { RICK_AND_MORTY_API } from '../../../utils/constants';

const route = useRoute();
let metaData = reactive({
  count: 0,
  pages: 0,
  next: null,
  prev: null,
});
const data = ref<ICharacter[] | ILocation[] | IEpisode[]>([]);
const isLoading = ref(true);
const hasError = ref(false);
const currentPage = ref(1);

const reinitialize = () => {
  isLoading.value = true;
  hasError.value = false;
  currentPage.value = 1;
};

const fetchData = async () => {
  isLoading.value = true;
  const res = await fetch(`${RICK_AND_MORTY_API}/${route.name?.toString()}/?page=${currentPage.value}`)
    .then(res => {
      isLoading.value = false;
      return res.json();
    })
    .catch(err => {
      isLoading.value = false;
      return {
        error: err
      };
    })

  if (res.error) {
    hasError.value = true;
  } else {
    hasError.value = false;
    data.value = [...res.results];
    metaData.count = res.info.count;
    metaData.pages = res.info.pages;
    metaData.prev = res.info.prev;
    metaData.next = res.info.next;
  }
};

onMounted(() => fetchData());

watch(route, reinitialize);

watch([currentPage, route], fetchData);

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
