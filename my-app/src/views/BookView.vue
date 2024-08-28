<template>
  <div id="app">
    <BooksTable />
  </div>
</template>

<script>
import BooksTable from '../components/BookTable.vue';

export default {
  name: 'App',
  components: {
    BooksTable,
  },
};
</script>
