<template>
  <div class="content">
    <div class="title">
      <h2>登入</h2>
    </div>
    <form @submit.prevent="login">
      <div class="info-container">
        <div class="info-item" v-for="(label, key) in labels" :key="key">
          <label :for="key">{{ label }}</label>
          <input
            :type="key === 'password' ? 'password' : 'text'"
            :id="key"
            v-model="loginInfo[key]"
            :placeholder="label"
          />
        </div>
      </div>
      <div class="buttons">
        <button class="register-button" type="submit" :disabled="isFormInvalid">確定</button>
        <button class="cancel-button" @click="goToHome">取消</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios, { AxiosError } from 'axios'

export default defineComponent({
  name: 'LoginForm',
  computed: {
    isFormInvalid() {
      return !this.loginInfo.account || !this.loginInfo.password
    }
  },
  setup() {
    const loginInfo = reactive({
      account: '',
      password: ''
    })

    const labels = {
      account: '帳號',
      password: '密碼'
    }

    const router = useRouter()

    const goToHome = () => {
      router.push('/')
    }

    return {
      loginInfo,
      labels,
      goToHome
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/api/login', this.loginInfo)

        // 登入成功後的處理
        console.log('登入成功', response.data)

        // alert('登入成功')
        this.goToHome()
      } catch (error) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          // 依據後端回傳的status顯示錯誤訊息
          if (axiosError.response.status === 404) {
            alert('帳號不存在')
          } else if (axiosError.response.status === 401) {
            alert('密碼錯誤')
          } else {
            alert('登入失敗，請稍後再試')
          }
        } else {
          alert('登入失敗，請稍後再試')
        }
        console.error('登入錯誤', error)
      }
    }
  }
})
</script>

<style scoped>
.content {
  padding: 30px 50px 50px 20px;
  /* top: 15%; */
  min-height: 70vh;
  text-align: left;
  width: 1000px;
  background-color: white;
  border-radius: 20px;
}

.title {
  padding-left: 18px;
  font-weight: bold;
  font-size: 20px;
}

.info-container {
  padding: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding-top: 15px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  /* border-bottom: 1px solid #eee; */
  font-size: 25px;
}

.label {
  font-weight: bold;
  flex: 1;
}

input[type='text'] {
  width: 80%;
  padding: 8px;
  font-size: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type='password'] {
  width: 80%;
  padding: 8px;
  font-size: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 100px;
  margin-top: 10%;
}

.register-button,
.cancel-button {
  width: 200px;
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button {
  background-color: orange;
  color: white;
}

.register-button:hover {
  background-color: darkorange;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
}

.cancel-button:hover {
  background-color: #999;
}
</style>
