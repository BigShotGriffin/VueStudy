<template>
  <!-- 任务列表 -->
  <div class="task-list">
    <div 
      v-for="(task, index) in tasks" 
      :key="getTaskIndex(task)" 
      class="task-item"
      :class="{ completed: task.completed }"
    >
      <input 
        type="checkbox" 
        v-model="task.completed"
        class="task-checkbox"
      />
      <span class="task-text">{{ task.text }}</span>
      <button @click="deleteTask(getTaskIndex(task))" class="delete-btn">删除</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Task {
  text: string;
  completed: boolean;
}

interface Props {
  tasks: Task[];
}

interface Emits {
  (e: 'delete', index: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const deleteTask = (index: number) => {
  emit('delete', index);
};

const getTaskIndex = (targetTask: Task) => {
  return props.tasks.findIndex(task => task === targetTask);
};
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
</style>
