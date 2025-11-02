import { ref, readonly } from 'vue'

// 登录状态管理
const isLoggedIn = ref(false)
const username = ref('')

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

// 初始化时加载状态
loadAuthState()

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

// 导出只读的状态和操作方法
export const useAuthStore = () => {
  return {
    // 只读状态
    isLoggedIn: readonly(isLoggedIn),
    username: readonly(username),
    
    // 操作方法
    login,
    logout
  }
}

// 导出原始状态（供路由守卫使用）
export const authState = {
  get isLoggedIn() {
    return isLoggedIn.value
  },
  get username() {
    return username.value
  }
}

