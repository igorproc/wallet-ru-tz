import {computed, ref, watch} from 'vue'
import { setToLocalStorage } from '@/shared/utils/local-storage.ts'
import { TASK_LIST_LOCAL_STORAGE_KEY } from '@/shared/const/task.ts'

import type { ITask } from '@/shared/types/task.ts'

export type TTasksStats = { [key in 'total' | 'active' | 'completed']: number }
export type TFilterValues = 'active' | 'completed' | null

export function useTasksService() {
  const taskList = ref<ITask[]>([])
  const activeFilter = ref<TFilterValues>(null)

  const filteredTasks = computed(() => {
    switch (activeFilter.value) {
      case 'active':
        return taskList.value.filter(task => !task.completedAt)
      case 'completed':
        return taskList.value.filter(task => task.completedAt)
      default:
        return taskList.value
    }
  })
  const taskStats = computed(() => {
    const activeTasksLength = taskList
      .value
      .filter(t => !t.completedAt)
      .length
    const completedTasksLength = taskList.value.length - activeTasksLength

    return {
      total: taskList.value.length,
      active: activeTasksLength,
      completed: completedTasksLength,
    }
  })

  const setTaskList = (tasks: ITask[]) => taskList.value = tasks
  const changeFilter = (key: TFilterValues) => activeFilter.value = key

  const addTask = (task: ITask) => {
    taskList.value = [...taskList.value, task]
  }
  const toggleTask = (task: Pick<ITask, 'id'>) => {
    const item = taskList.value.find(item => item.id === task.id)
    if (!item) {
      return
    }

    item.updatedAt = new Date()
    if (item.completedAt) {
      item.completedAt = null
    } else {
      item.completedAt = new Date()
    }
  }
  const deleteTask = (task: Pick<ITask, 'id'>) => {
    taskList.value = taskList
      .value
      .filter(item => item.id !== task.id)
  }

  watch(
    () => taskList.value,
    () => setToLocalStorage(TASK_LIST_LOCAL_STORAGE_KEY, taskList.value),
    { deep: true },
  )

  return {
    // Getters
    activeFilter,
    filteredTasks,
    taskList,
    taskStats,
    // Methods
    setTaskList,
    changeFilter,
    addTask,
    toggleTask,
    deleteTask,
  }
}
