import { TASK_LIST_LOCAL_STORAGE_KEY } from '@/shared/const/task.ts'
import { awaitTimer } from '@/shared/utils/timer.ts'
import { getFromLocalStorage, setToLocalStorage } from '@/shared/utils/local-storage.ts'

import type { ITask } from '@/shared/types/task.ts'

function getDefaultTaskList(): ITask[] {
  return [
    {
      id: 101,
      title: 'Подготовить отчет',
      createdAt: new Date('2024-02-01T10:00:00'),
      updatedAt: new Date('2024-02-01T10:00:00'),
      completedAt: new Date('2024-02-05T15:30:00')
    },
    {
      id: 102,
      title: 'Создать презентацию',
      createdAt: new Date('2024-02-10T09:15:00'),
      updatedAt: new Date('2024-02-10T09:15:00'),
      completedAt: null
    },
    {
      id: 103,
      title: 'Провести митинг',
      createdAt: new Date('2024-02-12T11:00:00'),
      updatedAt: new Date('2024-02-12T11:00:00'),
      completedAt: null
    },
    {
      id: 104,
      title: 'Код ревью',
      createdAt: new Date('2024-02-08T14:20:00'),
      updatedAt: new Date('2024-02-08T14:20:00'),
      completedAt: new Date('2024-02-09T16:45:00')
    }
  ]
}

function formatTask(task: ITask) {
  return {
    ...task,
    createdAt: new Date(task.createdAt),
    completedAt: task.completedAt ? new Date(task.completedAt) : null,
  }
}

export async function getUserTask() {
  await awaitTimer(0.3)

  const savedTasks = getFromLocalStorage<ITask[]>(TASK_LIST_LOCAL_STORAGE_KEY)
  if (!savedTasks) {
    return setToLocalStorage<ITask[]>(
      TASK_LIST_LOCAL_STORAGE_KEY,
      getDefaultTaskList()
    )!
  }

  return savedTasks.map(formatTask)
}
