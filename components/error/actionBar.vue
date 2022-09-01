<template>
  <div class="flex flex-col space-y-4 items-center">
    <div v-text="$t('errorpage.suggestions.primary')" />
    <div ref="primary" class="flex flex-col lg:flex-row space-y-4 md:space-y-0 md:space-x-2">
      <!-- Recommended row  -->
    </div>
    <div v-text="$t('errorpage.suggestions.secondary')" />
    <div ref="secondary" class="mt-4 flex flex-col lg:flex-row space-y-4 md:space-x-2 md:space-y-0">
      <!-- Secondary row -->
    </div>
    <div ref="items" class="hidden">
      <!-- Hide items by default -->
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },

  watch: {
    items (newValue) {
      try {
        // Clear child nodes
        [this.$refs.primary, this.$refs.secondary].forEach((row) => {
          while (row.hasChildNodes()) {
            row.removeChild(row.firstChild)
          }
        })

        // Add nodes back in
        newValue.forEach((node) => {
          if (['recommended', 'primary'].includes(node.dataset.row)) {
            this.$refs.primary.appendChild(node)
          } else if (node.dataset.row === 'secondary') {
            this.$refs.secondary.appendChild(node)
          }
        })
      } catch (e) {
        // console.error(e)
      }
    }
  },

  mounted () {
    const sortOrder = {
      recommended: 0,
      primary: 1,
      secondary: 2
    }

    // collect all nodes with a `data-row` attribute
    this.items = []
    this.$refs.items.querySelectorAll('[data-row]').forEach((node) => {
      this.items.push(node)
    })

    // sort items: recommended > primary > secondary
    this.items.sort((nodeA, nodeB) => Math.sign(sortOrder[nodeA.dataset.row] - sortOrder[nodeB.dataset.row]))
  }
}
</script>
