<template>
  <div
    v-if="challenge"
    class="d-flex flex-column align-center"
  >
    <v-avatar
      size="64"
      color="primary lighten-3"
      class="my-6"
    >
      R
    </v-avatar>

    <h1>{{ challenge.title }}</h1>

    <div class="text-center my-2">
      <p>{{ challenge.description }}</p>
    </div>

    <div>
      <ChallengeCompleteModal
        :challenge="challenge.id"
      />
    </div>

    <div class="mt-12">
      <h2 class="text-center">
        ¿Quienes lo han hecho?
      </h2>

      <EmptyState
        title="Nadie ha completado aún este reto"
        description="¡Atrévete a ser el primero!"
      />
    </div>

  </div>

  <div v-else>
    <EmptyState
      title="No encontramos el reto"
      description="Parece que el reto que buscas ha dejado de existir, o nunca ha existido"
    />
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
