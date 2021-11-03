<template>
  <div>
    <h1 class="my-2">
      Retos
    </h1>
    <div>
      <v-text-field
        v-model="searchTerm"
        outlined
        dense
        clearable
        prepend-inner-icon="mdi-magnify"
        placeholder="Buscar retos"
      />
    </div>
    <div>
      <!-- v-for="challenge in $store.state.challenges.list" -->
      <ChallengeCard
        v-for="challenge in filteredList"
        :id="challenge.id"
        :key="challenge.id"
        class="my-2"
      />

      <EmptyState
        v-if="filteredList.length === 0"
        title="No hay resultados"
        description="Prueba a escribirlo de otra forma"
      />
    </div>
  </div>
</template>

<script>
/** stringNormalize
 * Remove diacritical marks, and replace it with ANSI characters.
 * Originally gotten from:
 * https://es.stackoverflow.com/questions/62031/eliminar-signos-diacr%C3%ADticos-en-javascript-eliminar-tildes-acentos-ortogr%C3%A1ficos
 */
function stringNormalize (text) {
  /* eslint-disable-next-line */
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/** normalizeSearch
 * Remove unneccessary whitespaces, diacritical marks, and transform to uppercase
 */
function normalizeSearch (term) {
  if (!term) {
    return ''
  }

  return stringNormalize(term).trim().toUpperCase()
}

export default {
  name: 'ChallengesPage',
  data: () => ({
    searchTerm: ''
  }),
  async fetch () {
    await this.$store.dispatch('challenges/list')
  },
  computed: {
    searchQuery () {
      return normalizeSearch(this.searchTerm)
    },
    filteredList () {
      if (!this.searchQuery) {
        return this.$store.state.challenges.list
      }

      return this.$store.state.challenges.list.filter((item) => {
        const title = normalizeSearch(item.title)
        const description = normalizeSearch(item.description)

        return title.includes(this.searchQuery) || description.includes(this.searchQuery)
      })
    }
  }
}
</script>
