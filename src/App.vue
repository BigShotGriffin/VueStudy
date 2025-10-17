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
      @delete="deleteTask"
    />
    
    <!-- 统计信息 -->
    <div class="stats">
      <p>总任务: {{ tasks.length }} | 已完成: {{ completedTasks }} | 待完成: {{ pendingTasks }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TaskList from './components/TaskList.vue';
import Filter from './components/Filter.vue';
import AddTask from './components/AddTask.vue';

interface Task {  //定义任务的结构体
  text: string;  //任务名
  completed: boolean;  //任务是否完成
}

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

const addTask = (text: string) => {
  tasks.value.push({  //把新任务添加到tasks表格最后
    text: text,  //新任务名
    completed: false  //新任务默认未完成
  })
}

const deleteTask = (index: number) => {
  tasks.value.splice(index, 1)
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
