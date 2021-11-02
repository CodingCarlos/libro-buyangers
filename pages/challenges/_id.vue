<template>
  <div v-if="challenge">
    <h1>{{ challenge.title }}</h1>
    <div>
      <p>{{ challenge.description }}</p>
    </div>
  </div>

  <div v-else>
    Error! No existe el reto :(
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'defaultBack',
  computed: {
    id () {
      return this.$route.params.id || null
    },
    challenge () {
      return this.$store.getters['challenges/getById'](this.id)
    }
  },
  async fetch () {
    // Bring the stored challenge by id
    const challenge = this.$store.getters['challenges/getById'](this.id)

    // If not challenge already stored, try to get it back
    if (!challenge) {
      await this.$store.dispatch('challenges/get', this.id)
    }
  }
}
</script>
