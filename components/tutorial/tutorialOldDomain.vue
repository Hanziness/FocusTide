<script setup lang="ts">
import { IconExclamationCircle } from '@tabler/icons-vue'
import { ButtonImportance, ButtonTheme } from '../base/types/button'
import Button from '~~/components/base/uiButton.vue'
import PopupSheet from '@/components/base/popupSheet.vue'

const emit = defineEmits<{(type: 'close'): void}>()
const router = useRouter()
const closePopup = () => {
  router.replace(router.currentRoute.value.path)
  emit('close')
}
</script>

<template>
  <popup-sheet class="fixed w-full max-w-2xl md:p-4" open>
    <div class="flex flex-col px-6 pt-6 pb-6 transition bg-surface-light dark:bg-surface-dark md:backdrop-blur-xl md:backdrop-brightness-200 md:backdrop-contrast-50 md:bg-opacity-80 md:dark:bg-opacity-80 shadow-lg md:pb-3 rounded-t-2xl md:rounded-2xl max-h-[90vh] dark:ring-1 dark:ring-surface-ondark ring-opacity-20 dark:ring-opacity-20 md:ring-inset gap-4">
      <IconExclamationCircle class="text-primary mx-auto -mb-2" :size="48" />
      <h1 class="text-2xl font-bold text-center" v-text="$t('tutorials.olddomain.heading')" />
      <p class="block text-center" v-text="$t('tutorials.olddomain.warning')" />
      <p class="block text-center font-bold mb-2" v-text="$t('tutorials.olddomain.action')" />
      <Button :theme="ButtonTheme.Primary" :importance="ButtonImportance.Filled" @click="closePopup">
        {{ $t('tutorials.olddomain.button') }}
      </Button>
    </div>
  </popup-sheet>
</template>
