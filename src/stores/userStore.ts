import { defineStore } from 'pinia'

interface User {
  account: string
  address: string
  email: string
  id: number
  name: string
  password: string
  phonenum: string
}

interface UserInfo {
  name: string
  account: string
  email: string
  phonenum: string
  address: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as User | null // 儲存當前登入使用者的資料
  }),
  getters: {
    userInfo: (state): UserInfo | null => {
      if (state.user) {
        const { name, account, email, phonenum, address } = state.user
        return { name, account, email, phonenum, address }
      }
      return null
    }
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
      this.user = null // 登出時清除使用者資料
    }
  }
})
