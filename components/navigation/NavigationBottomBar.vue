<template>
  <v-bottom-navigation
    fixed
    grow
  >
    <!-- <v-btn
      color="primary"
      text
      to="/"
    >
      <span>Home</span>

      <v-icon>mdi-home</v-icon>
    </v-btn> -->

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
</template>
