<template>
  <h1 class="text-h4 mb-4">Мои задачи</h1>

  <div class="filter-section mb-4">
    <v-btn
      @click="emit('filter:select', null)"
      :class="{ 'bg-primary': !activeFilter }"
      variant="tonal"
      class="mr-2"
    >
      Все ({{ taskStats.total }})
    </v-btn>

    <v-btn
      @click="emit('filter:select', 'active')"
      :class="{ 'bg-primary': activeFilter === 'active' }"
      variant="tonal"
      class="mr-2"
    >
      Активные ({{ taskStats.active }})
    </v-btn>

    <v-btn
      @click="emit('filter:select', 'completed')"
      :class="{ 'bg-primary': activeFilter === 'completed' }"
      variant="tonal"
      class="mr-2"
    >
      Завершенные ({{ taskStats.completed }})
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import type { TFilterValues, TTasksStats } from '@/composables/useTasksService.ts'

interface Props {
  taskStats: TTasksStats
  activeFilter: TFilterValues
}

interface Emits {
  (name: 'filter:select', payload: TFilterValues): void
}

const {
  taskStats,
  activeFilter,
} = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<style scoped>
.filter-section {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 960px) {
  .filter-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-section button {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>
