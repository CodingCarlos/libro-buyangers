<template>
  <div>
    <v-img
      v-if="img"
      :src="img"
    />
    <v-avatar v-else color="primary lighten-4">
      A
    </v-avatar>
  </div>
</template>

<script>
export default {
  name: 'ChallengeIcon',
  props: {
    img: {
      type: String,
      default: ''
    }
  }
}
</script>
