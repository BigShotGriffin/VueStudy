<template>
  <div class="todo-app">
    <h2>待办清单</h2>
    
    <!-- 添加新任务 -->
    <div class="add-task">
      <input 
        v-model="newTask"  
        placeholder="请输入新任务..." 
        @keyup.enter="addTask"
      />
      <button @click="addTask">添加</button>
    </div>
    
    <!-- 筛选按钮 -->
    <div class="filter-buttons">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        @click="currentFilter = filter.value"
        :class="{ active: currentFilter === filter.value }"
        class="filter-btn"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- 任务列表 -->
    <div class="task-list">
      <div 
        v-for="(task, index) in filteredTasks" 
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
    
    <!-- 统计信息 -->
    <div class="stats">
      <p>总任务: {{ tasks.length }} | 已完成: {{ completedTasks }} | 待完成: {{ pendingTasks }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Task {  //定义任务的结构体
  text: string;  //任务名
  completed: boolean;  //任务是否完成
}

const newTask = ref('')  //输入框的内容
const currentFilter = ref('all')  //筛选完成情况，默认显示所有任务
const tasks = ref<Task[]>([  //初始任务列表
  { text: '学习 Vue 3', completed: false },
  { text: '完成项目作业', completed: true }
])

const filters = [
  { label: '全部', value: 'all' },
  { label: '未完成', value: 'pending' },
  { label: '已完成', value: 'completed' }
]

const addTask = () => {
  if (newTask.value.trim()) {  
    tasks.value.push({  //把新任务添加到tasks表格最后
      text: newTask.value.trim(),  //新任务名，用trim去掉空格
      completed: false  //新任务默认未完成
    })
    newTask.value = '' //清空输入框
  }
}

const deleteTask = (index: number) => {
  tasks.value.splice(index, 1)
}

const getTaskIndex = (targetTask: Task) => {
  return tasks.value.findIndex(task => task === targetTask)
}

const filteredTasks = computed(() => {    //filteredTasks是筛选后的任务列表，根据currentFilter的值，过滤任务列表
  switch (currentFilter.value) {  //根据当前筛选条件，过滤任务列表
    case 'completed':
      return tasks.value.filter(task => task.completed)  //返回已完成任务
    case 'pending':
      return tasks.value.filter(task => !task.completed)  //返回未完成任务
    default:
      return tasks.value  //返回所有任务
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

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.filter-btn {
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: #666;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.filter-btn:hover {
  background-color: #e0e0e0;
}

.filter-btn.active {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

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
