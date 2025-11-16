import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const isLoggedIn = ref(false)
  const username = ref('')

  // 计算属性
  const isAuthenticated = computed(() => isLoggedIn.value)

  // 从localStorage恢复登录状态
  const loadAuthState = () => {
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      try {
        const auth = JSON.parse(savedAuth)
        isLoggedIn.value = auth.isLoggedIn
        username.value = auth.username
      } catch (e) {
        console.error('Failed to load auth state:', e)
      }
    }
  }

  // 登录方法
  const login = (name: string) => {
    isLoggedIn.value = true
    username.value = name
    
    // 保存到localStorage
    localStorage.setItem('auth', JSON.stringify({
      isLoggedIn: true,
      username: name
    }))
  }

  // 退出登录方法
  const logout = () => {
    isLoggedIn.value = false
    username.value = ''
    
    // 清除localStorage
    localStorage.removeItem('auth')
  }

  // 初始化时加载状态
  loadAuthState()

  return {
    // 状态
    isLoggedIn,
    username,
    // 计算属性
    isAuthenticated,
    // 方法
    login,
    logout
  }
})

