export interface ITask {
  id: string | number
  title: string
  createdAt: Date
  updatedAt: Date
  completedAt: Date | null
}
