<template>
  <div>
    <h1>Ranking</h1>
    <p>
      Es muy dificil completar el Gran Libro Buyanger. Sin embargo,
      la única forma de hacerlo es avanzar. ¿Cómo vamos?
    </p>

    <UserRankItem
      v-for="user in $store.state.ranking.list"
      :key="user.id"
      :id="user.id"
      :selected="user.id === $store.state.auth.id"
    />
  </div>
</template>

<script>
export default {
  name: 'RankingPage',
  async fetch () {
    await this.$store.dispatch('ranking/list')
  }
}
</script>
