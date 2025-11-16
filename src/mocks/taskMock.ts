import type { AxiosInstance, AxiosResponse } from 'axios'
import tasksSeed from '../data/tasks.json'
import type { Task } from '../types/task'

let tasks: Task[] = tasksSeed.map((task, index) => ({
  id: index + 1,
  text: task.text,
  completed: Boolean(task.completed)
}))

let nextId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1

const resolveResponse = <T>(config: any, data: T, status = 200): AxiosResponse<T> => ({
  data,
  status,
  statusText: status >= 200 && status < 300 ? 'OK' : 'Error',
  headers: {},
  config
})

const parseUrlId = (url: string | undefined) => {
  if (!url) return undefined
  const segments = url.split('/')
  const idSegment = segments[segments.length - 1]
  const id = Number(idSegment)
  return Number.isNaN(id) ? undefined : id
}

export const setupTaskMock = (http: AxiosInstance) => {
  http.interceptors.request.use(async config => {
    const fullUrl = `${config.baseURL ?? ''}${config.url ?? ''}`

    if (!fullUrl.startsWith('/api/tasks')) {
      return config
    }

    const method = (config.method ?? 'get').toLowerCase()

    if (method === 'get') {
      config.adapter = async () => resolveResponse(config, tasks)
    }

    if (method === 'post') {
      config.adapter = async () => {
        const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
        const text = String(body?.text ?? '').trim()

        if (!text) {
          return resolveResponse(config, { message: '任务内容不能为空' } as any, 400)
        }

        const newTask: Task = {
          id: nextId++,
          text,
          completed: Boolean(body?.completed)
        }

        tasks = [...tasks, newTask]
        return resolveResponse(config, newTask, 201)
      }
    }

    if (method === 'delete') {
      config.adapter = async () => {
        const id = parseUrlId(config.url)

        if (id === undefined) {
          return resolveResponse(config, { message: '未提供任务 ID' } as any, 400)
        }

        const index = tasks.findIndex(task => task.id === id)

        if (index === -1) {
          return resolveResponse(config, { message: '任务不存在' } as any, 404)
        }

        const [removed] = tasks.splice(index, 1)
        return resolveResponse(config, removed)
      }
    }

    if (method === 'patch') {
      config.adapter = async () => {
        const id = parseUrlId(config.url)
        const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data

        if (id === undefined) {
          return resolveResponse(config, { message: '未提供任务 ID' } as any, 400)
        }

        const target = tasks.find(task => task.id === id)

        if (!target) {
          return resolveResponse(config, { message: '任务不存在' } as any, 404)
        }

        target.text = body?.text ?? target.text
        target.completed = body?.completed ?? target.completed

        return resolveResponse(config, target)
      }
    }

    return config
  })
}

