<script setup lang="ts">
import { type Ref } from 'vue'

const state = reactive({
  items: [] as HTMLElement[]
})

const sortOrder = {
  recommended: 0,
  primary: 1,
  secondary: 2
}

const primary: Ref<HTMLElement | null> = ref(null)
const secondary: Ref<HTMLElement | null> = ref(null)
const items: Ref<HTMLElement | null> = ref(null)

watch(() => state.items, (newValue) => {
  try {
    // Clear child nodes
    if (primary.value == null || secondary.value == null) {
      return
    }

    [primary.value as HTMLElement, secondary.value as HTMLElement].forEach((row) => {
      while (row.hasChildNodes()) {
        if (row.firstChild) { row.removeChild(row.firstChild) }
      }
    })

    // Add nodes back in
    newValue.forEach((node: HTMLElement) => {
      if (['recommended', 'primary'].includes(node.dataset.row || '')) {
        (primary.value as HTMLElement).appendChild(node)
      } else if (node.dataset.row === 'secondary') {
        (secondary.value as HTMLElement).appendChild(node)
      }
    })
  } catch (e) {
    // console.error(e)
  }
})

onMounted(() => {
  // collect all nodes with a `data-row` attribute
  state.items = []
  if (items != null) {
    (items.value as HTMLElement).querySelectorAll('[data-row]').forEach((node) => {
      state.items.push(node as HTMLElement)
    })
  }

  // sort items: recommended > primary > secondary
  state.items.sort((nodeA, nodeB) => Math.sign(sortOrder[(nodeA.dataset.row || 'secondary') as keyof typeof sortOrder] - sortOrder[(nodeB.dataset.row || 'secondary') as keyof typeof sortOrder]))
})
</script>

<template>
  <div class="flex flex-col items-center space-y-4">
    <div v-text="$t('errorpage.suggestions.primary')" />
    <div ref="primary" class="flex flex-col space-y-4 lg:flex-row md:space-y-0 md:space-x-2">
      <!-- Recommended row  -->
    </div>
    <div v-text="$t('errorpage.suggestions.secondary')" />
    <div ref="secondary" class="flex flex-col mt-4 space-y-4 lg:flex-row md:space-x-2 md:space-y-0">
      <!-- Secondary row -->
    </div>
    <div ref="items" class="hidden">
      <!-- Hide items by default -->
      <slot />
    </div>
  </div>
</template>
