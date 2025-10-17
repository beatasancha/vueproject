<script setup>
import { ref } from 'vue';
import '/src/style.css'
import 'primeicons/primeicons.css'
import ViewProjectsList from './components/ViewProjectsList.vue';
import CreateProject from './components/CreateProject.vue';

const rating = ref(3);
</script>

<template>
  <CreateProject/>
  <ViewProjectsList/>
</template>


