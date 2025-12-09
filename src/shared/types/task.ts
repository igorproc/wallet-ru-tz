export interface ITask {
  id: string | number
  title: string
  createdAt: number
  updatedAt: number
  completedAt: number | null
}
