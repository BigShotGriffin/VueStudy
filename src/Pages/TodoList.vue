<template>
  <div class="todo-app">
    <h2>待办清单</h2>
    
    <!-- 添加新任务组件 -->
    <AddTask @add-task="addTask" />
    
    <!-- Tab标签页组件 -->
    <Filter 
      :current-filter="currentFilter"
      :filters="filters"
      @filter-change="currentFilter = $event"
    />

    <!-- 任务列表组件 -->
    <TaskList 
      :tasks="filteredTasks" 
      :loading="isLoading"
      @delete="deleteTask"
      @toggle="toggleTaskStatus"
    />
    
    <!-- 统计信息 -->
    <div class="stats">
      <p>总任务: {{ tasks.length }} | 已完成: {{ completedTasks }} | 待完成: {{ pendingTasks }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TaskList from '../components/TaskList.vue'
import Filter from '../components/Filter.vue'
import AddTask from '../components/AddTask.vue'
import { fetchTasks, createTask, removeTask, updateTask } from '../services/taskService'
import type { Task } from '../types/task'

const isLoading = ref(false)
const currentFilter = ref('all')
const tasks = ref<Task[]>([])

const filters = [
  { label: '全部', value: 'all' },
  { label: '未完成', value: 'pending' },
  { label: '已完成', value: 'completed' }
]

const loadTasks = async () => {
  isLoading.value = true
  try {
    tasks.value = await fetchTasks()
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadTasks()
})

const addTask = async (text: string) => {
  const newTask = await createTask(text)
  tasks.value.push(newTask)
}

const deleteTask = async (id: number) => {
  await removeTask(id)
  tasks.value = tasks.value.filter(task => task.id !== id)
}

const toggleTaskStatus = async (task: Task) => {
  const updatedTask = await updateTask({ id: task.id, completed: !task.completed })
  tasks.value = tasks.value.map(item => (item.id === task.id ? updatedTask : item))
}

const filteredTasks = computed(() => {
  switch (currentFilter.value) {
    case 'completed':
      return tasks.value.filter(task => task.completed)
    case 'pending':
      return tasks.value.filter(task => !task.completed)
    default:
      return tasks.value
  }
})

const completedTasks = computed(() =>
  tasks.value.filter(task => task.completed).length
)

const pendingTasks = computed(() =>
  tasks.value.filter(task => !task.completed).length
)
</script>


<style scoped>
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.stats {
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  color: #666;
  font-size: 14px;
}

.stats p {
  margin: 0;
}
</style>

