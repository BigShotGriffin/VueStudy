<template>
  <div class="app">
    <!-- 导航栏 -->
    <nav class="nav" v-if="authStore.isLoggedIn">
      <div class="nav-left">
        <router-link to="/todo" class="nav-link">待办清单</router-link>
        <router-link to="/timer" class="nav-link">计时器</router-link>
        <router-link to="/exams" class="nav-link">考试成绩</router-link>
      </div>
      <div class="nav-right">
        <span class="username">欢迎，{{ authStore.username }}</span>
        <button @click="handleLogout" class="logout-btn">退出登录</button>
      </div>
    </nav>

    <!-- 路由视图 -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.nav-left {
  display: flex;
  gap: 10px;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  padding: 10px 30px;
  text-decoration: none;
  color: #666;
  font-size: 16px;
  border-radius: 6px;
  transition: all 0.3s;
}

.nav-link:hover {
  background-color: #f0f0f0;
}

.nav-link.router-link-active {
  color: #4CAF50;
  background-color: #e8f5e9;
  font-weight: 600;
}

.username {
  color: #666;
  font-size: 14px;
}

.logout-btn {
  padding: 8px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #da190b;
}
</style>
