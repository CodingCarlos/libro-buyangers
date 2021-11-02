<template>
  <v-app>
    <v-app-bar
      fixed
      app
      color="white"
    >
<!--       <v-btn
        icon
        @click.stop="back()"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn> -->
      <v-toolbar-title>
        Buyangers
      </v-toolbar-title>

      <!-- <v-spacer />

      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-person</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main class="mb-16">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <NavigationBottomBar />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style scoped>
.v-main {
  padding-bottom: 64px;
}
</style>
