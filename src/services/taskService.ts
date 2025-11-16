import http from './http'
import type { Task } from '../types/task'

export const fetchTasks = async () => {
  const response = await http.get<Task[]>('/tasks')
  return response.data
}

export const createTask = async (text: string) => {
  const response = await http.post<Task>('/tasks', { text })
  return response.data
}

export const removeTask = async (id: number) => {
  const response = await http.delete<Task>(`/tasks/${id}`)
  return response.data
}

export const updateTask = async (task: Pick<Task, 'id'> & Partial<Omit<Task, 'id'>>) => {
  const response = await http.patch<Task>(`/tasks/${task.id}`, task)
  return response.data
}

