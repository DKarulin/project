<template>
  <div>

    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <router-link 
        to="/" 
        class="navbar-brand">
        {{ layoutTitle }}
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"/>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <router-link
            tag="li"
            to="/"
            exact
            active-class="active">
            <a
              class="nav-link"
              href="#">Главная</a>
          </router-link>
          <router-link
            tag="li"
            to="/users"
            exact
            active-class="active">
            <a
              class="nav-link"
              href="#">Список пользователей</a>
          </router-link>
          <router-link
            tag="li"
            to="/add"
            exact
            active-class="active">
            <a
              class="nav-link"
              href="#">Добавить пользователя</a>
          </router-link>
        </ul>
      </div>
    </nav>

    <main
      id="app"
      role="main"
      class="container">
      <router-view/>
    </main>

  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: 'App',
  computed: {
    // Заголовок страницы из хранилища Vuex
    // который будет на всех страницах
    layoutTitle() {
      return this.$store.state.navbarTitle
    }
  }
}
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
