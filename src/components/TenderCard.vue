<template>
  <div class="tender-card">
    <h3>{{ tender.title }}</h3>
    <p>{{ tender.description }}</p>
    <router-link :to="{ name: 'TenderDetail', params: { id: tender.id } }">Подробнее</router-link>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';

defineProps<{
  tender: {
    id: number;
    title: string;
    description?: string;
  };
}>();
</script>

<style scoped lang="scss">
.tender-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
}
</style>