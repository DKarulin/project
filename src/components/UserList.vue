<!-- Компонент таблицы -->

<template>
  <div class="card">
    <div class="card-header">
      <button
        type="button"
        class="float-right btn btn-sm btn-primary btn-outline"
        @click="loadData">
        <i :class="['fa fa-fw fa-refresh', loading ? 'fa-spin' : '']"/>
        Обновить таблицу
      </button>
      {{ title }} &ndash; {{ totalRows }}
    </div>
    <div class="card-body">

      <div class="form-group">
        <div class="col-md-2">
          <rows-picker v-model.number="rowsPerPage" />
        </div>
        <div class="col-md-4">
          <p class="form-control-static">
            Выбрано элементов на страницу {{ rowsPerPage }}
          </p>
        </div>
      </div>

      <table
        ref="table"
        class="table table-striped">
        <thead>
          <slot name="header"/>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredRows"
            :key="item.id">
            <slot
              name="row"
              v-bind="item"/>
          </tr>
        </tbody>
      </table>

      <div class="form-group">
        <strong>Выбрана страница {{ selectedPage }}</strong>
        <rows-paginator
          v-model.number="selectedPage"
          :per-page="rowsPerPage"
          :total="totalRows" />
      </div>
    </div>
  </div>
</template>

<script>
// Используемые плагины
import axios from 'axios'

// Используемые компоненты
import RowsPicker from './Dashboard/RowsPerPage.vue'
import RowsPaginator from './Dashboard/RowsPaginator.vue'

export default {
  name: 'DashboardGrid',
  components: {
    RowsPicker,
    RowsPaginator
  },
  props: {
    // Заголовок таблицы
    title: {
      type: String,
      default: 'Таблица'
    },

    // URL загрузки списка
    url: {
      type: String,
      required: true
    }
  },
  data: () => ({
    // Список для таблицы
    list: [],

    // Количество строк на страницу
    rowsPerPage: 5,

    // Отображаемая страница
    selectedPage: 1,

    // Флаг обновления данных
    loading: false
  }),
  computed: {
    // Количество строк в таблице
    totalRows() {
      return this.list.length
    },

    // Отображаемые строки таблицы
    filteredRows() {
      return this.list.filter((item, index) => {
        const startIndex = (this.selectedPage - 1) * this.rowsPerPage
        const finalIndex = startIndex + this.rowsPerPage

        return startIndex <= index && index < finalIndex
      })
    }
  },
  watch: {
    // При изменении количества элементов на страницу
    rowsPerPage() {
      this.selectedPage = 1
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    // Загрузка данных таблицы
    loadData() {
      this.loading = true

      axios
        .get(this.url)
        .then(response => response.data)
        .then(response => {
          this.list = response
          this.loading = false
        })
    }
  }
}
</script>
