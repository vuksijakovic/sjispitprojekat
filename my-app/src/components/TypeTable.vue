<template>
  <div>
    <h1>Vrste knjiga</h1>
    <table>
      <thead>
        <tr>
          <th>Naziv</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="author in authors" :key="author.id">
          <td>{{ author.naziv }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authors: [],
    };
  },
  methods: {
    async fetchAuthors() {
      try {
        const response = await fetch('http://localhost:9000/vrsta_knjige');
        const data = await response.json();
        this.authors = data;
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    },
  },
  mounted() {
    this.fetchAuthors();
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  margin: 10px;

  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>
