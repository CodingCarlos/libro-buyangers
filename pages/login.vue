<template>
  <div class="d-flex flex-column align-center text-center">
    <h1 class="my-16">
      Entrar al Gran Libro de Retos Buyanger
    </h1>

    <p class="my-8">
      <v-btn
        color="primary"
        x-large
        @click="login()"
      >
        <v-icon
          size="18"
          class="mr-4"
        >
          mdi-google
        </v-icon>
        Entrar con google
      </v-btn>
    </p>
    <p>
      <em>Próximamente, también con email y contraseña</em>
    </p>

    <div v-if="isLoading" class="my-8">
      <p>Verificando tu cuenta...</p>
      <v-progress-circular indeterminate color="primary" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'empty',
  data: () => ({
    isLoading: false
  }),
  methods: {
    async login () {
      this.isLoading = true

      if (this.$store.state.auth.isLogged) {
        this.isLoading = false
        return this.authRedirect()
      }

      await this.$store.dispatch('auth/login')
      this.isLoading = false

      return this.authRedirect()
    },
    // Navigate to the post-auth route
    authRedirect () {
      if (this.$route.query.redirect) {
        // If redirect param in url, then go there
        return this.$router.replace(this.$route.query.redirect)
      }

      return this.$router.replace('/challenges')
    }
  }
}
</script>
