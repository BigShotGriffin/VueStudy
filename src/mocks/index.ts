import http from '../services/http'
import { setupTaskMock } from './taskMock'
import { setupExamMock } from './examMock'

let isMockEnabled = false

export const setupMockServer = () => {
  if (isMockEnabled) return
  setupTaskMock(http)
  setupExamMock(http)
  isMockEnabled = true
}

