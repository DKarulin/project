<!-- Компонент редактирования пользователя -->

<template>
  <div>
    <div
      v-if="!user"
      class="alert alert-warning">
      <i class="fa fa-refresh fa-spin"/>
      Загрузка
    </div>
    <div
      v-else
      class="card">
      <div class="card-header">
        <span class="pull-right">
          {{ user.id }}
        </span>

        {{ title }}
      </div>
      <div class="card-body">

        <user-form v-model="user">
          <div slot="buttons">
            <button
              type="button"
              class="btn btn-success"
              @click="save">
              Сохранить изменения
            </button>

            <button
              type="button"
              class="btn btn-danger"
              @click="remove">
              Удалить пользователя
            </button>
          </div>
        </user-form>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import UserForm from '@/components/user-form.vue'

export default {
  name: 'UserEdit',
  components: {
    UserForm
  },
  data: () => ({
    // Объект с данными редактируемого пользователя
    user: null,

    // REST URL
    restUrl: 'http://localhost:3004/users/'
  }),
  computed: {
    id() {
      return this.$route.params.id
    },

    // URL для работы с текущим пользователем
    url() {
      return `${this.restUrl}${this.id}`
    },

    // Заголовок окна формы
    title() {
      return !this.user.firstName || !this.user.lastName
        ? 'Пользователь'
        : [this.user.firstName, this.user.lastName, this.user.phone].join(' ')
    }
  },
  watch: {
    // Обновление данных при изменениях маршрута
    // или можно через хук beforeRouteUpdate
    $route: 'loadData'
  },
  mounted() {
    this.loadData()
  },
  methods: {
    // Загрузка данных пользователя
    loadData() {
      axios
        .get(this.url)
        .then(response => response.data)
        .then(response => {
          this.user = response
        })
    },

    // Сохранение изменений
    save() {
      // Валидация пользователя через vee-validate
      // внутри формы мы инъектируем $validator
      this.$validator.validateAll()
      if (this.errors.any()) {
        // eslint-disable-next-line
        alert('Не все поля заполнены!')
        return
      }

      // После обновления перекидываем на страницу с таблицей
      axios.patch(this.url, this.user).then(() => {
        this.$router.push({ path: '/users' })
      })
    },

    // Удаление пользователя
    remove() {
      // eslint-disable-next-line
      const confirmed = confirm('Удалить пользователя?')
      if (!confirmed) {
        return
      }

      // После удаления перекидываем на страницу с таблицей
      axios.delete(this.url).then(() => {
        this.$router.push({ path: '/users' })
      })
    }
  }
}
</script>
