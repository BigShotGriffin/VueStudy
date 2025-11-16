<template>
  <!-- 任务列表 -->
  <div class="task-list">
    <div v-if="loading" class="task-state">正在加载任务...</div>
    <div v-else-if="!tasks.length" class="task-state">暂无任务，快去添加吧！</div>
    <template v-else>
      <div
        v-for="task in tasks"
        :key="task.id"
        class="task-item"
        :class="{ completed: task.completed }"
      >
        <input
          type="checkbox"
          :checked="task.completed"
          class="task-checkbox"
          @change="toggleTask(task)"
        />
        <span class="task-text">{{ task.text }}</span>
        <button @click="deleteTask(task.id)" class="delete-btn">删除</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../types/task'

interface Props {
  tasks: Task[]
  loading?: boolean
}

interface Emits {
  (e: 'delete', id: number): void
  (e: 'toggle', task: Task): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const deleteTask = (id: number) => {
  emit('delete', id)
}

const toggleTask = (task: Task) => {
  emit('toggle', task)
}
</script>

<style scoped>
.task-list {
  margin-bottom: 30px;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #ddd;
  transition: all 0.3s;
}

.task-item.completed {
  background-color: #e8f5e8;
  border-left-color: #4CAF50;
}

.task-item.completed .task-text {
  text-decoration: line-through;
  color: #666;
}

.task-checkbox {
  margin-right: 15px;
  transform: scale(1.2);
}

.task-text {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.delete-btn {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #da190b;
}

.task-state {
  padding: 20px;
  text-align: center;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>
