<template>
  <div>
    <v-img
      v-if="img"
      :src="img"
    />
    <v-avatar color="primary lighten-4" v-else>
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
