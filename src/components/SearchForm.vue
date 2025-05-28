<template>
  <form class="form" @submit.prevent="search">
    <input v-model="name" placeholder="Поиск по названию тендера"/>
    <button type="submit">Поиск</button>
  </form>
</template>

<script setup lang="ts">
import {ref, defineEmits} from 'vue';

const emit = defineEmits<{
  (e: 'search', name: string): void
}>();

const name = ref('');

const search = () => {
  emit('search', name.value);
  name.value = '';
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  gap: 0.5rem;
}
</style>