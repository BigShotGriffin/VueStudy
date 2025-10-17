<template>
  <div class="add-task">
    <input 
      v-model="newTask"  
      placeholder="请输入新任务..." 
      @keyup.enter="handleAddTask"
    />
    <button @click="handleAddTask">添加</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newTask = ref('')

const emit = defineEmits<{
  'add-task': [text: string];
}>()

const handleAddTask = () => {
  if (newTask.value.trim()) {  
    emit('add-task', newTask.value.trim())
    newTask.value = '' // 清空输入框
  }
}
</script>

<style scoped>
.add-task {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.add-task input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.add-task input:focus {
  outline: none;
  border-color: #4CAF50;
}

.add-task button {
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.add-task button:hover {
  background-color: #45a049;
}
</style>
