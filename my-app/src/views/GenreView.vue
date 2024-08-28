<template>
  <div id="app">
    <AuthorsTable />
  </div>
</template>

<script>
import AuthorsTable from '../components/GenreTable.vue';

export default {
  name: 'App',
  components: {
    AuthorsTable,
  },
};
</script>
