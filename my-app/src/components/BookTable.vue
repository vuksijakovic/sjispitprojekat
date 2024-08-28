<template>
  <div>
    <h1>Knjige</h1>
    <table>
      <thead>
        <tr>
          <th>Naziv</th>
          <th>Cijena</th>
          <th>Autor</th>
          <th>Zanr</th>
          <th>Tip knjige</th>
          <th>Izdavac</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.naziv }}</td>
          <td>{{ book.cijena }}</td>
          <td>{{ book.authorName }}</td>
          <td>{{ book.genreName }}</td>
          <td>{{ book.bookTypeName }}</td>
          <td>{{ book.publisherName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await fetch('http://localhost:9000/knjiga');
        const data = await response.json();

        // Mapiranje podataka knjiga i povlačenje povezanih imena
        this.books = await Promise.all(
          data.map(async (book) => {
            const authorName = await this.fetchName('autor', book.autor_id);
            const genreName = await this.fetchName('zanr', book.zanr_id);
            const bookTypeName = await this.fetchName('vrsta_knjige', book.vrsta_knjige_id);
            const publisherName = await this.fetchName('izdavac', book.izdavac_id);

            return {
              ...book,
              authorName,
              genreName,
              bookTypeName,
              publisherName,
            };
          })
        );
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    async fetchName(entity, id) {
      try {
        const response = await fetch(`http://localhost:9000/${entity}/${id}`);
        const data = await response.json();
        return data.naziv; 
      } catch (error) {
        console.error(`Error fetching ${entity} name:`, error);
        return '';
      }
    },
  },
  mounted() {
    this.fetchBooks();
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
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>
