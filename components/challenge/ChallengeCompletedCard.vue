<template>
  <!-- <v-card @click="1==1"> -->
  <v-card :to="`/challenges/${challenge}`">
    <v-list-item
      :to="`/profile/${user}`"
      class="py-1"
    >
      <v-list-item-avatar>
        <v-img
          :src="userData.pic"
        />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          {{ userData.name }}
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-icon>
        7 Jun
      </v-list-item-icon>
    </v-list-item>
    <v-divider />

    <v-card-text>
      <v-list-item>
        <v-list-item-avatar>
          <v-avatar color="primary lighten-3">
            R
          </v-avatar>
          <!-- <v-img :src="challenge.icon"></v-img> -->
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ challengeData.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ challengeData.description }}
          </v-list-item-subtitle>

          <!--
          <div class="mt-2">
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

    <v-card-actions class="px-6 pb-4">
      "{{ comment }}"
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ChallengeCompletedCard',
  props: {
    challenge: {
      type: String,
      default: '',
      required: true
    },
    user: {
      type: String,
      default: '',
      required: true
    },
    comment: {
      type: String,
      default: ''
    }
  },
  computed: {
    challengeData () {
      return this.$store.getters['challenges/getById'](this.challenge) || {}
    },
    userData () {
      return this.$store.getters['ranking/getById'](this.user) || {}
    }
  }
}
</script>
