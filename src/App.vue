<template>
  <v-app>
    <layouts-provider>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="8">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <TaskListHeader
                    :active-filter="activeFilter"
                    :task-stats="taskStats"
                    @filter:select="changeFilter"
                  />

                  <TaskCreateFrom
                    @task:create="formatTaskAndAdd"
                  />

                  <v-list
                    v-if="filteredTasks.length"
                    lines="two"
                    class="elevation-1 rounded"
                  >
                    <TaskListItem
                      v-for="task in filteredTasks"
                      :key="task.id"
                      :task="task"
                      @task:toggle="toggleTask"
                      @task:delete="deleteTask"
                    />
                  </v-list>

                  <TaskListStats
                    :tasks="taskList"
                    class="mt-6"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </layouts-provider>
  </v-app>
</template>

<script setup lang="ts">
// Node Deps
import { onMounted } from 'vue'
// Api
import { getUserTask } from '@/api/userTask.ts'
// Composables
import { useTasksService } from '@/composables/useTasksService.ts'
// Utils
import { generateId } from '@/shared/utils/generate.ts'
// Types & Interfaces
import type { ITask } from '@/shared/types/task.ts'
// Components
import layoutsProvider from '@/components/layouts/provider.vue'
import TaskListHeader from '@/components/entity/task/list/header.vue'
import TaskCreateFrom from '@/components/entity/task/create/form.vue'
import TaskListItem from '@/components/entity/task/list/item.vue'
import TaskListStats from '@/components/entity/task/list/stats.vue'

interface DeletionTimer {
  timerId: number
  timeLeft: number
}

const {
  activeFilter,
  filteredTasks,
  taskList,
  taskStats,
  addTask,
  toggleTask,
  deleteTask,
  setTaskList,
  changeFilter,
} = useTasksService()

const formatTaskAndAdd = (task: string) => {
  if (!task.trim()) {
    return
  }

  const newTask: ITask = {
    id: generateId(),
    title: task,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    completedAt: null
  }

  addTask(newTask)
}

onMounted(async () => {
  const tasks = await getUserTask()
  setTaskList(tasks || [])
})
</script>

