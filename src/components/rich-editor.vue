<template>
  <div>
    <vue-editor v-model="content" />
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'RichEditor',
  components: {
    VueEditor
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({
    content: ''
  }),
  watch: {
    // При изменении локального состояния
    // отправляем наверх
    content() {
      this.$emit('input', this.content)
    }
  },
  created() {
    // Копируем в локальное состояние
    this.content = this.value
  }
}
</script>
