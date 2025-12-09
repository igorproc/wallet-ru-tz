<template>
  <v-list-item>
    <template v-slot:prepend>
      <v-checkbox
        :model-value="completed"
        @update:model-value="emit('task:toggle', task)"
        density="comfortable"
      />
    </template>

    <v-list-item-title
      :class="{ 'text-decoration-line-through text-grey': isCompleted }"
      class="font-weight-medium"
    >
      {{ task.title }}
    </v-list-item-title>

    <v-list-item-subtitle>
      <span>
        Создано: {{ formatDate(task.createdAt) }}
      </span>

      <span>
        | Обновлено: {{ formatDate(task.updatedAt) }}
      </span>

      <span v-if="task.completedAt">
        | Завершено: {{ formatDate(task.completedAt) }}
      </span>
    </v-list-item-subtitle>

    <template v-slot:append>
      <TaskListItemDelete
        :id="task.id"
        @delete="emit('task:delete', task)"
      />
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { formatDate } from '@/shared/utils/formatter.ts'
import TaskListItemDelete from '@/components/entity/task/list/item/delete.vue'

import type { ITask } from '@/shared/types/task.ts'

interface Props {
  task: ITask
}

interface Emits {
  (name: 'task:toggle', taskId: Pick<ITask, 'id'>): void
  (name: 'task:delete', taskId: Pick<ITask, 'id'>): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isCompleted = ref(Boolean(props.task.completedAt))
const completed = computed({
  get: () => Boolean(props.task.completedAt),
  set: (value: boolean) => Boolean(isCompleted.value = value),
})
</script>

<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}
</style>
