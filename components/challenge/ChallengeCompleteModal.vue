<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
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
         multiple
         auto-grow
         outlined
         placeholder="Puedes incluir un comentario público"
        />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="dialog = false"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="primary"
          @click="dialog = false"
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
    dialog: false
  })
}
</script>
