<template>
  <div>
    <SearchForm class="search-form" @search="handleSearch"/>
    <Transition name="fade">
      <div v-show="showTenders" class="grid">
        <TenderCard v-for="tender in paginatedTenders" :key="tender.id" :tender="tender"/>
      </div>
    </Transition>

    <Paginator
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-changed="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch, computed} from 'vue';
import TenderCard from '../components/TenderCard.vue';
import Paginator from '../components/Paginator.vue';
import SearchForm from '../components/SearchForm.vue';
import {useRouter} from "vue-router";

interface Tender {
  id: number;
  title: string;
  description?: string;
}

const router = useRouter();
const tenders = ref<Tender[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(100);
const totalPages = ref(0);
const showTenders = ref(true);

const fetchTenders = async (page: number) => {
  try {
    showTenders.value = false;
    const number = (page - 1) * 30 % itemsPerPage.value;
    const loadPage = Math.floor((page - 1) * 30 / itemsPerPage.value) + 1;

    const response = await fetch(`https://api.test-webest.ru/list/?page=${loadPage}`);
    if (!response.ok) throw new Error('Ошибка сети');
    const data = await response.json();
    const temp = data.data;
    tenders.value = temp.slice(number, number + 30)
    itemsPerPage.value = data.page_size;
    totalPages.value = Math.ceil(data.total / data.page_size);

    if (number > 70) {
      const response = await fetch(`https://api.test-webest.ru/list/?page=${loadPage + 1}`);
      if (!response.ok) throw new Error('Ошибка сети');
      const data = await response.json();

      const temp = data.data;
      tenders.value.push(...temp.slice(0, 30 - tenders.value.length));
    }
    showTenders.value = true;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => fetchTenders(1));

watch(currentPage, () => {
  fetchTenders(currentPage.value);
  window.scrollTo(0, 0);
});

const changePage = (page: number) => currentPage.value = page;

const handleSearch = (name: string) => {
  const tender = tenders.value.find((item) => item.title === name);
  if (tender) {
    currentPage.value = 1;
    router.push({name: 'TenderDetail', params: {id: tender.id}});
  }
};

const paginatedTenders = computed(() => tenders.value);
</script>

<style scoped lang="scss">
.search-form {
  padding: 1rem 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>