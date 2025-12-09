<template>
  <div class="app-layout app-layout--default">
    <layout-base-header />

    <v-main>
      <slot />
    </v-main>
  </div>
</template>

<script setup lang="ts">
import LayoutBaseHeader from '@/components/layout/base/header/index.vue'
</script>
