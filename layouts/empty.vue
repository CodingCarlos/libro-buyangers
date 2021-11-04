<template>
  <v-app>
    <v-app-bar
      fixed
      app
      color="white"
    >
      <v-toolbar-title>
        Buyangers
      </v-toolbar-title>
    </v-app-bar>

    <v-main class="mb-16">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout'
}
</script>
