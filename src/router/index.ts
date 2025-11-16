import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../Pages/TodoList.vue'
import Timer from '../Pages/Timer.vue'
import Login from '../Pages/Login.vue'
import ExamRecords from '../Pages/ExamRecords.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/todo'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/todo',
      name: 'TodoList',
      component: TodoList,
      meta: { requiresAuth: true }
    },
    {
      path: '/timer',
      name: 'Timer',
      component: Timer,
      meta: { requiresAuth: true }
    },
    {
      path: '/exams',
      name: 'ExamRecords',
      component: ExamRecords,
      meta: { requiresAuth: true }
    }
  ]
})

// 导航守卫：检查登录状态
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  // 如果需要登录且未登录，则跳转到登录页
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // 保存要访问的路径，登录后可以跳转回去
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router

