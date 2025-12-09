<template>
  <v-card>
    <v-card-text>
      <p
        v-for="task in stats"
        :key="task.prefix"
      >
        {{ formatStatsValue(task) }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ITask } from '@/shared/types/task'

interface FormattedTaskItem {
  prefix: string
  postfix?: string
  value: number | string
}

interface Props {
  tasks: ITask[]
}

const { tasks } = defineProps<Props>()

const stats = computed(() => {
  const activeTasks = tasks.filter(t => !t.completedAt)
  const completedTasksLength = tasks.length - activeTasks.length

  return {
    total: { prefix: 'Всего задач', value: tasks.length },
    active: { prefix: 'Активных', value: activeTasks.length },
    completed: { prefix: 'Завершенных', value: completedTasksLength },
    percent: {
      prefix: 'Процент завершения',
      postfix: '%',
      value: (completedTasksLength / tasks.length * 100).toFixed(1),
    },
  }
})

const formatStatsValue = (payload: FormattedTaskItem) => {
  let formattedString = `${payload.prefix}: ${payload.value}`
  if (payload?.postfix) {
    formattedString += `${payload.postfix}`
  }

  return formattedString
}
</script>
