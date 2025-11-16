<template>
  <div class="exam-page">
    <h2>考试成绩记录</h2>

    <section class="form-section">
      <h3>新增成绩</h3>
      <form class="exam-form" @submit.prevent="handleSubmit">
        <div class="form-row">
          <label for="subject">科目</label>
          <input
            id="subject"
            v-model.trim="form.subject"
            placeholder="如：数学"
            required
          />
        </div>

        <div class="form-row">
          <label for="score">成绩</label>
          <input
            id="score"
            v-model.number="form.score"
            type="number"
            min="0"
            max="100"
            step="1"
            placeholder="0-100"
            required
          />
        </div>

        <div class="form-row">
          <label for="date">考试日期</label>
          <input
            id="date"
            v-model="form.date"
            type="date"
            required
          />
        </div>

        <div class="form-row">
          <label for="remark">备注</label>
          <textarea
            id="remark"
            v-model.trim="form.remark"
            placeholder="可选"
            rows="2"
          />
        </div>

        <button class="submit-btn" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? '提交中...' : '添加记录' }}
        </button>
      </form>
    </section>

    <section class="stats" v-if="records.length">
      <div>记录总数：{{ records.length }}</div>
      <div>平均成绩：{{ averageScore }}</div>
      <div>最高成绩：{{ highestScore?.score ?? '-' }}（{{ highestScore?.subject ?? '—' }}）</div>
    </section>

    <section class="records">
      <h3>成绩列表</h3>
      <div v-if="isLoading" class="state">正在加载成绩...</div>
      <div v-else-if="!records.length" class="state">暂无考试记录</div>
      <table v-else class="record-table">
        <thead>
          <tr>
            <th>科目</th>
            <th>成绩</th>
            <th>考试日期</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record.id">
            <td>{{ record.subject }}</td>
            <td>{{ record.score }}</td>
            <td>{{ formatDate(record.date) }}</td>
            <td>{{ record.remark || '—' }}</td>
            <td>
              <button class="delete-btn" @click="handleDelete(record.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  fetchExamRecords,
  createExamRecord,
  removeExamRecord
} from '../services/examService'
import type { ExamRecord } from '../types/exam'

const isLoading = ref(false)
const isSubmitting = ref(false)
const records = ref<ExamRecord[]>([])

const form = ref({
  subject: '',
  score: 0,
  date: '',
  remark: ''
})

const resetForm = () => {
  form.value = {
    subject: '',
    score: 0,
    date: '',
    remark: ''
  }
}

const averageScore = computed(() => {
  if (!records.value.length) return '-'
  const total = records.value.reduce((sum, record) => sum + record.score, 0)
  return (total / records.value.length).toFixed(1)
})

const highestScore = computed(() => {
  if (!records.value.length) return null
  return records.value.reduce((max, record) => (record.score > max.score ? record : max), records.value[0])
})

const loadRecords = async () => {
  isLoading.value = true
  try {
    records.value = await fetchExamRecords()
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  try {
    const payload = {
      subject: form.value.subject,
      score: form.value.score,
      date: form.value.date,
      remark: form.value.remark || undefined
    }
    const record = await createExamRecord(payload)
    records.value.push(record)
    resetForm()
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = async (id: number) => {
  await removeExamRecord(id)
  records.value = records.value.filter(record => record.id !== id)
}

const formatDate = (value: string) => {
  if (!value) return '—'
  return new Date(value).toLocaleDateString()
}

onMounted(() => {
  loadRecords()
})
</script>

<style scoped>
.exam-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #2f3b52;
}

h3 {
  margin-bottom: 20px;
  color: #4caf50;
}

.form-section {
  margin-bottom: 40px;
}

.exam-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.form-row {
  display: flex;
  flex-direction: column;
}

.form-row label {
  margin-bottom: 8px;
  font-weight: 600;
  color: #3f4a5a;
}

.form-row input,
.form-row textarea {
  padding: 10px 14px;
  border: 1px solid #d7e0ea;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-row input:focus,
.form-row textarea:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.15);
}

.submit-btn {
  grid-column: 1 / -1;
  padding: 12px 24px;
  background: linear-gradient(135deg, #4caf50, #66bb6a);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
}

.stats {
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: #f6fbf6;
  border: 1px solid #e0f2e9;
  border-radius: 10px;
  margin-bottom: 30px;
  color: #3c5546;
  font-weight: 500;
}

.records h3 {
  margin-bottom: 16px;
}

.record-table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 10px;
}

.record-table thead {
  background-color: #f1f5f9;
}

.record-table th,
.record-table td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #e5ebf1;
  font-size: 14px;
  color: #3b4758;
}

.record-table tbody tr:hover {
  background-color: #f9fbfc;
}

.delete-btn {
  padding: 6px 12px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.delete-btn:hover {
  background-color: #d32f2f;
  transform: translateY(-1px);
}

.state {
  padding: 30px;
  text-align: center;
  color: #708096;
  background-color: #f8fafc;
  border-radius: 10px;
}

@media (max-width: 600px) {
  .stats {
    flex-direction: column;
    gap: 10px;
  }
}
</style>

