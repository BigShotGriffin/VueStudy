import http from './http'
import type { ExamRecord } from '../types/exam'

export const fetchExamRecords = async () => {
  const response = await http.get<ExamRecord[]>('/exams')
  return response.data
}

export const createExamRecord = async (payload: Omit<ExamRecord, 'id'>) => {
  const response = await http.post<ExamRecord>('/exams', payload)
  return response.data
}

export const removeExamRecord = async (id: number) => {
  const response = await http.delete<ExamRecord>(`/exams/${id}`)
  return response.data
}

export const updateExamRecord = async (payload: ExamRecord) => {
  const response = await http.patch<ExamRecord>(`/exams/${payload.id}`, payload)
  return response.data
}

