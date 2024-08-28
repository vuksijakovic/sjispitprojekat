<template>
  <div id="app">
    <nav><span v-if="isntLoggedIn">
         <router-link to="/">Login</router-link> |
      </span>
    <span v-if="isLoggedIn">
         <router-link to="/order">Naruci</router-link> |
      </span>
      <span v-if="isLoggedIn">
         <router-link to="/my-order">Moje Narudzbine</router-link> |
      </span>
      <router-link to="/books">Knjige</router-link> |
      <router-link to="/authors">Autori</router-link> |
      <router-link to="/publishers">Izdavaci</router-link> |
      <router-link to="/equipment">Oprema</router-link> |
      <router-link to="/book-types">Vrste</router-link> |
      <router-link to="/genres">Zanrovi</router-link> 
      <span v-if="isLoggedIn">
        | <a @click="logout">Logout</a>
      </span>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('token2'),
      isntLoggedIn: !localStorage.getItem('token2')
    };
  },
  watch: {
    isLoggedIn(newValue) {
      if (newValue) {
        this.$forceUpdate();
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token2');
      this.isLoggedIn = false;
      this.$router.push('/'); // Preusmeri na home stranicu nakon odjave
    }
  },
  mounted() {
    this.isLoggedIn = !!localStorage.getItem('token2');
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
