<template>
  <transition name="detail">
    <div v-show="show" class="tender-detail">
      <h2>{{ tender.title }}</h2>
      <p>{{ tender.description }}</p>
      <router-link to="/" @click="show = false">Назад к списку тендеров</router-link>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';

interface TenderDetailData {
  id?: number;
  title?: string;
  description?: string;
}

const route = useRoute();
const tenderId = route.params.id as string;
const tender = ref<TenderDetailData>({});
const show = ref(false);

onMounted(async () => {
  try {
    const response = await fetch(`https://api.test-webest.ru/element/?id=${tenderId}`);
    if (!response.ok) throw new Error('Ошибка сети');
    tender.value = await response.json();
    show.value = true
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped lang="scss">
.tender-detail {
  padding: 0.5rem;
}
.detail-enter-active, .detail-leave-active {
   transition: opacity 0.7s;
 }

.detail-enter-from, .detail-leave-to {
  opacity: 0;
}
</style>