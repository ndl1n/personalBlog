<template>
  <div class="content">
    <div class="title">
      <h2>註冊</h2>
    </div>
    <form @submit.prevent="register">
      <div class="info-container">
        <div class="info-item" v-for="(label, key) in labels" :key="key">
          <label :for="key">{{ label }}</label>
          <input
            :type="key === 'password' ? 'password' : 'text'"
            :id="key"
            v-model="user[key]"
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
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios, { AxiosError } from 'axios'

export default defineComponent({
  name: 'RegisterForm',
  data() {
    return {
      user: {
        name: '',
        account: '',
        password: '',
        email: '',
        phonenum: ''
      }
    }
  },
  computed: {
    isFormInvalid() {
      return !this.user.name || !this.user.account || !this.user.email || !this.user.phonenum
    }
  },
  setup() {
    const labels = {
      name: '姓名',
      account: '帳號',
      password: '密碼',
      email: '電子郵件',
      phonenum: '手機號碼'
    }

    const router = useRouter()

    const goToHome = () => {
      router.push('/')
    }

    const goToLogin = () => {
      router.push('/login')
    }

    return {
      labels,
      goToHome,
      goToLogin
    }
  },
  methods: {
    async register() {
      const errorMessage = ref('')
      try {
        // 密碼長度檢查
        if (this.user.password.length < 6) {
          errorMessage.value = '密碼長度需大於 6'
          alert(errorMessage.value)
          return
        }

        // 手機號碼檢查
        const phonePattern = /^09\d{8}$/
        if (!phonePattern.test(this.user.phonenum)) {
          errorMessage.value = '手機號碼須為09開頭，且十位數'
          alert(errorMessage.value)
          return
        }

        // 帳號檢查
        const accountPattern = /^[a-zA-Z0-9]{8}$/
        if (!accountPattern.test(this.user.account)) {
          errorMessage.value = '帳號必須為8位數，且僅由英文和數字組成'
          alert(errorMessage.value)
          return
        }

        const response = await axios.post('http://localhost:8080/api/register', this.user)
        if (response.status === 201) {
          console.log('註冊成功', response.data)

          errorMessage.value = ''

          this.user.name = ''
          this.user.account = ''
          this.user.password = ''
          this.user.email = ''
          this.user.phonenum = ''

          this.goToLogin()
        } else {
          errorMessage.value = '註冊失敗，請稍後再試'
          alert(errorMessage.value)
        }
      } catch (error) {
        const axiosError = error as AxiosError
        if (axiosError.response && axiosError.response.status === 409) {
          errorMessage.value = '帳號已經存在'
        } else {
          errorMessage.value = '註冊失敗，請稍後再試'
        }
        console.error('註冊錯誤', error)
        alert(errorMessage.value)
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
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  font-size: 18px;
}

.label {
  font-weight: bold;
  flex: 1;
}

input[type='text'] {
  width: 80%;
  padding: 8px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type='password'] {
  width: 80%;
  padding: 8px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 100px;
  margin-top: 10px;
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
