<template>
  <div>
    Стартовая страница

    <router-link to="/add">
      Добавить пользователя
    </router-link>
    <router-link to="/users">
      Открыть список пользователей
    </router-link>

    <hr>

    <div class="form-group">
      <label>Поле формы привязанное к Vuex</label>
      <input
        type="text"
        class="form-control"
        v-model="vuextest"
      >
    </div>

  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  computed: {
    // Двустороннее вычисляемое свойство
    // для считывания и сохранения значения в Vuex
    vuextest: {
      get() {
        return this.$store.state.navbarTitle
      },
      set(value) {
        this.$store.commit('changeTitle', value)
      }
    }
  }
}
</script>
