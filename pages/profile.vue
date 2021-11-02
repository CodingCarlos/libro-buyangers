<template>
  <div
    v-if="$store.state.auth.isLogged"
    class="d-flex flex-column align-center"
  >
    <img
      :src="user.pic"
      height="92px"
      width="92px"
      class="profile-pic rounded-xl mt-6 mb-5"
    />
    <h1>{{ user.name }}</h1>

    <!-- Profile Stats -->
    <v-row class="profile-stats my-4">
      <!-- Posición en el ranking -->
      <v-col class="d-flex flex-column align-center">
        <strong>#{{ user.rank }}</strong>
        <span>En el ranking</span>
      </v-col>

      <!-- Retos completados -->
      <v-col class="d-flex flex-column align-center">
        <strong>{{ user.challenges_count }}</strong>
        <span>Retos completados</span>
      </v-col>
    </v-row>

    <div class="profile-challenges my-4">
      <h2 class="text-center">Mis retos</h2>

      <EmptyState
        v-if="user.challenges_count === 0"
        title="No hay retos"
        description="¡Atrévete a completar el primero!"
      />
    </div>
  </div>
  <div v-else>
    <h1>LOGIN!</h1>
    <v-btn @click="$store.dispatch('auth/login')">
      Entrar con Google
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  computed: {
    user () {
      const uid = this.$store.state.auth.id
      return this.$store.getters['ranking/getById'](uid) || {}
    }
  },
  async fetch () {
    await this.$store.dispatch('ranking/list')
  }
}
</script>

<style scoped>
.profile-stats,
.profile-challenges {
  width: 100%;
}
.profile-stats strong {
  font-size: 2em;
}
</style>
