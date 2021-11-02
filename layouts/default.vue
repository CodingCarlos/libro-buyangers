<template>
  <v-app>
    <v-app-bar
      fixed
      app
      color="white"
    >
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn> -->
      <v-toolbar-title>
        Buyangers
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-person</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="mb-16">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-bottom-navigation
      fixed
      grow
    >
      <v-btn
        color="primary"
        text
        to="/"
      >
        <span>Home</span>

        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn
        color="primary"
        text
        to="/challenges"
      >
        <span>Retos</span>

        <v-icon>mdi-trophy</v-icon>
      </v-btn>

      <v-btn
        color="primary"
        text
        to="/ranking"
      >
        <span>Ranking</span>

        <v-icon>mdi-format-list-numbered</v-icon>
      </v-btn>

      <v-btn
        color="primary"
        text
        to="/profile"
      >
        <span>Perfil</span>

        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      fixed: false
    }
  }
}
</script>

<style scoped>
.v-main {
  padding-bottom: 64px;
}
</style>
