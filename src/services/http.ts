import axios from 'axios'

const http = axios.create({
  baseURL: '/api',
  timeout: 5_000
})

export default http

