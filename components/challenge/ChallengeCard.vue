<template>
  <!-- <v-card @click="1==1"> -->
  <v-card :to="`/challenges/${id}`">
    <v-card-text>
      <v-list-item>
        <v-list-item-avatar>
          <v-avatar color="primary lighten-3">R</v-avatar>
          <!-- <v-img :src="challenge.icon"></v-img> -->
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="challenge.title"></v-list-item-title>
          <v-list-item-subtitle v-html="challenge.description"></v-list-item-subtitle>

<!--           <div class="mt-2">
            <v-chip
              color="primary"
              small
            >
              Category
            </v-chip>

            <span class="mx-2">
              300
              <v-icon>mdi-medal-outline</v-icon>
            </span>
          </div> -->
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ChallengeCard',
  props: {
    id: {
      type: String,
      default: '',
      required: true
    }
  },
  computed: {
    challenge () {
      return this.$store.getters['challenges/getById'](this.id)
    }
  }
}
</script>
