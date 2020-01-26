<!-- Компонент для пагинации по таблице -->

<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">

      <li
        class="page-item"
        :class="{ disabled: page === 1 }"
      >
        <a
          href="#"
          class="page-link"
          aria-label="Previous"
          @click.prevent="prevPage">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        class="page-item"
        v-for="item in maxPages"
        :key="item"
        :class="{ active: page === item }">
        <a
          href="#"
          class="page-link"
          @click.prevent="selectPage(item)">
          {{ item }}
        </a>
      </li>

      <li
        class="page-item"
        :class="{ disabled: page === maxPages }"
      >
        <a
          href="#"
          class="page-link"
          aria-label="Next"
          @click.prevent="nextPage">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>

    </ul>
  </nav>
</template>

<script>
export default {
  name: 'RowsPaginator',
  model: {
    prop: 'page'
  },
  props: {
    // Выбранная страница
    page: {
      type: Number,
      required: true
    },

    // Количество строк на страницу
    perPage: {
      type: Number,
      required: true
    },

    // Общее количество строк в таблице
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    // Максимальное количество страниц
    maxPages() {
      return Math.ceil(this.total / this.perPage)
    }
  },
  methods: {
    // Предыдущая страница
    prevPage() {
      const pageNum = this.page - 1
      if (pageNum > 0) {
        this.selectPage(pageNum)
      }
    },

    // Следующая страница
    nextPage() {
      const pageNum = this.page + 1
      if (pageNum <= this.maxPages) {
        this.selectPage(pageNum)
      }
    },

    // Выбор новой страницы
    selectPage(page) {
      this.$emit('input', page)
    }
  }
}
</script>
