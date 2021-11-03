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
      referrerpolicy="no-referrer"
    >
    <h1>
      {{ user.name }}
    </h1>

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
      <h2 class="text-center">
        Mis retos
      </h2>

      <EmptyState
        v-if="user.challenges_count === 0"
        title="No hay retos"
        description="¡Atrévete a completar el primero!"
      />
      <div v-else>
        <ChallengeCompletedCard
          v-for="(val, key) in completed"
          :key="key"
          :challenge="val.id"
          :user="id"
          :comment="val.comment"
          class="my-4"
        />
      </div>
      <!--
      <div class="text-center">
        <v-btn
          text
          @click="getChallenges()"
        >
          Recargar
        </v-btn>
      </div> -->

      <div class="text-center">
        <v-btn
          text
          @click="$store.dispatch('auth/logout')"
          color="red"
        >
          Cerrar sesión
        </v-btn>
      </div>
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
  async fetch () {
    await this.$store.dispatch('ranking/list')

    const id = this.$store.state.auth.id

    if (id) {
      await this.$store.dispatch('complete/list', {
        id,
        col: 'users'
      })
    }
  },
  computed: {
    id () {
      return this.$store.state.auth.id
    },
    user () {
      return this.$store.getters['ranking/getById'](this.id) || {}
    },
    completed () {
      return this.$store.state.complete.users[this.id]
    }
  },
  watch: {
    id () {
      console.log('Id changed!')
      console.log(this.id)
      this.getChallenges()
    }
  },
  created () {
    this.getChallenges()
  },
  methods: {
    async getChallenges () {
      console.log('LOL')
      await this.$store.dispatch('complete/list', {
        col: 'users',
        id: this.id
      })
    }
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
