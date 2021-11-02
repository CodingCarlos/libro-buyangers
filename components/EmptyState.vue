<template>
  <div
    class="d-flex flex-column align-center"
  >
    <v-icon :size="iconSize" class="my-4">
      {{ icon }}
    </v-icon>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    title: {
      type: String,
      default: '¡No encontramos nada!'
    },
    description: {
      type: String,
      default: 'Parece que esta lista está vacía'
    },
    icon: {
      type: String,
      default: 'mdi-robot-confused-outline'
    },
    iconSize: {
      type: [String, Number],
      default: '56'
    }
  }
}
</script>
