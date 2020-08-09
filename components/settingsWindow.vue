<template>
  <v-dialog v-model="input" width="600">
    <v-card>
      <v-card-title>Settings</v-card-title>
      <v-card-text>Coming soon...</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="success" depressed @click="input = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    input: {
      get () {
        return this.value
      },
      set (newValue) {
        // this.value = newValue
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
