<template>
  <v-btn
    @click="emit('filter:select', props.filter.value)"
    variant="tonal"
    :class="{ 'bg-primary': isActive }"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
import type { IFilter } from '@/shared/types/filter.ts'

interface Props {
  filter: IFilter
  isActive: boolean
}

interface Emits {
  (name: 'filter:select', payload: IFilter['value']): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
