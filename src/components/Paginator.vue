<template>
  <div class="paginator">
    <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
    <b>Страница {{ currentPage }}</b>
    <button @click="nextPage" :disabled="currentPage >= totalPages">Вперед</button>
  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits} from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'page-changed', page: number): void;
}>();

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('page-changed', props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('page-changed', props.currentPage + 1);
  }
};
</script>

<style scoped lang="scss">
.paginator {
  display: flex;
  justify-content: space-between;
}
</style>