import type { AxiosInstance, AxiosResponse } from 'axios'
import examsSeed from '../data/exams.json'
import type { ExamRecord } from '../types/exam'

let exams: ExamRecord[] = examsSeed.map((exam, index) => ({
  id: index + 1,
  subject: exam.subject,
  score: Number(exam.score),
  date: exam.date,
  remark: exam.remark
}))

let nextId = exams.length > 0 ? Math.max(...exams.map(exam => exam.id)) + 1 : 1

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

const validateExamPayload = (payload: any) => {
  const subject = String(payload?.subject ?? '').trim()
  const score = Number(payload?.score)
  const date = String(payload?.date ?? '').trim()

  if (!subject) {
    return '科目不能为空'
  }

  if (Number.isNaN(score)) {
    return '成绩必须是数字'
  }

  if (score < 0 || score > 100) {
    return '成绩范围需在 0-100 之间'
  }

  if (!date) {
    return '考试日期不能为空'
  }

  return null
}

export const setupExamMock = (http: AxiosInstance) => {
  http.interceptors.request.use(async config => {
    const fullUrl = `${config.baseURL ?? ''}${config.url ?? ''}`

    if (!fullUrl.startsWith('/api/exams')) {
      return config
    }

    const method = (config.method ?? 'get').toLowerCase()

    if (method === 'get') {
      config.adapter = async () => resolveResponse(config, exams)
    }

    if (method === 'post') {
      config.adapter = async () => {
        const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
        const errorMessage = validateExamPayload(body)
        if (errorMessage) {
          return resolveResponse(config, { message: errorMessage } as any, 400)
        }

        const newExam: ExamRecord = {
          id: nextId++,
          subject: body.subject.trim(),
          score: Number(body.score),
          date: body.date.trim(),
          remark: body.remark?.trim()
        }

        exams = [...exams, newExam]
        return resolveResponse(config, newExam, 201)
      }
    }

    if (method === 'delete') {
      config.adapter = async () => {
        const id = parseUrlId(config.url)
        if (id === undefined) {
          return resolveResponse(config, { message: '未提供成绩记录 ID' } as any, 400)
        }

        const index = exams.findIndex(exam => exam.id === id)
        if (index === -1) {
          return resolveResponse(config, { message: '成绩记录不存在' } as any, 404)
        }

        const [removed] = exams.splice(index, 1)
        return resolveResponse(config, removed)
      }
    }

    if (method === 'patch') {
      config.adapter = async () => {
        const id = parseUrlId(config.url)
        const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
        if (id === undefined) {
          return resolveResponse(config, { message: '未提供成绩记录 ID' } as any, 400)
        }

        const target = exams.find(exam => exam.id === id)
        if (!target) {
          return resolveResponse(config, { message: '成绩记录不存在' } as any, 404)
        }

        const merged = {
          ...target,
          ...body
        }
        const errorMessage = validateExamPayload(merged)
        if (errorMessage) {
          return resolveResponse(config, { message: errorMessage } as any, 400)
        }

        target.subject = merged.subject.trim()
        target.score = Number(merged.score)
        target.date = merged.date.trim()
        target.remark = merged.remark?.trim()

        return resolveResponse(config, target)
      }
    }

    return config
  })
}

