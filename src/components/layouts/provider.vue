<template>
  <component
    :is="currentProvider"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

type TLayoutName = 'default'

interface Props {
  name?: TLayoutName
}

const props = withDefaults(
  defineProps<Props>(),
  { name: 'default' },
)

const layoutMap: Record<TLayoutName, ReturnType<typeof defineAsyncComponent>> = {
  default: defineAsyncComponent(
    () => import('@/components/layouts/default.vue')
  ),
}

const currentProvider = computed(() => layoutMap[props.name])
</script>
