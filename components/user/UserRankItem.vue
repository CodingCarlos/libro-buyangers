<template>
  <div :class="{ 'primary lighten-4 rounded': selected}">
    <v-list-item
      class="py-1"
      @click="1==1"
    >
      <v-list-item-avatar>
        <v-img :src="user.pic" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          {{ user.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ user.challenges_count }} retos
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-icon>
        #{{ user.rank }}
      </v-list-item-icon>
    </v-list-item>
    <v-divider inset />
  </div>
</template>

<script>
export default {
  name: 'UserRankItem',
  props: {
    id: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    user () {
      return this.$store.getters['ranking/getById'](this.id)
    }
  }
}
</script>
