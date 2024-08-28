<template>
  <div id="app">
    <AuthorsTable />
  </div>
</template>

<script>
import AuthorsTable from '../components/AuthorsTable.vue';

export default {
  name: 'App',
  components: {
    AuthorsTable,
  },
};
</script>
