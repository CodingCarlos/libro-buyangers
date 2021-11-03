<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        rounded
        x-large
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        Completar
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        Completar Reto
      </v-card-title>

      <v-card-text>
        <p>
          Vas a marcar como completado el siguiente reto:
        </p>

        <ChallengeCard
          :id="challenge"
          class="my-4"
        />

        <v-text-field
          v-model="comment"
          multiple
          auto-grow
          outlined
          placeholder="Puedes incluir un comentario público"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="dialog = false"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="primary"
          @click="complete()"
        >
          Completar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ChallengeCompleteModal',
  props: {
    challenge: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    dialog: false,
    comment: ''
  }),
  methods: {
    async complete () {
      await this.$store.dispatch('complete/challenge', {
        id: this.challenge,
        comment: this.comment
      })

      this.dialog = false
    }
  }
}
</script>
