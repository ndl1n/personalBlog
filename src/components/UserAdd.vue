<template>
  <div class="content">
    <div class="title">
      <h2>新增</h2>
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
        <button class="cancel-button" @click="goToUserDirectory">取消</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios, { AxiosError } from 'axios'
import { useNavigation } from '@/composables/useNavigation'

export default defineComponent({
  name: 'AddForm',
  data() {
    return {
      user: {
        name: '',
        account: '',
        password: '',
        email: '',
        phonenum: '',
        address: ''
      }
    }
  },
  computed: {
    isFormInvalid() {
      return (
        !this.user.name ||
        !this.user.account ||
        !this.user.email ||
        !this.user.phonenum ||
        !this.user.address
      )
    }
  },
  setup() {
    const labels = {
      name: '姓名',
      account: '帳號',
      password: '密碼',
      email: '電子郵件',
      phonenum: '手機號碼',
      address: '地址'
    }

    const { goToUserDirectory, goToLogin } = useNavigation()
    const errorMessage = ref('')

    const resetUser = () => {
      return {
        name: '',
        account: '',
        password: '',
        email: '',
        phonenum: '',
        address: ''
      }
    }

    return {
      labels,
      goToUserDirectory,
      goToLogin,
      errorMessage,
      resetUser
    }
  },
  methods: {
    async register() {
      try {
        // 密碼長度檢查
        if (this.user.password.length < 8) {
          this.setErrorMessage('密碼長度需大於 8')
          return
        }

        // 手機號碼檢查
        const phonePattern = /^09\d{8}$/
        if (!phonePattern.test(this.user.phonenum)) {
          this.setErrorMessage('手機號碼須為09開頭，且十位數')
          return
        }

        // 帳號檢查
        const accountPattern = /^[a-zA-Z0-9]{8}$/
        if (!accountPattern.test(this.user.account)) {
          this.setErrorMessage('帳號必須為8位數，且僅由英文和數字組成')
          return
        }

        const response = await axios.post('http://localhost:8080/api/register', this.user)
        if (response.status === 201) {
          console.log('註冊成功', response.data)

          this.errorMessage = ''
          this.user = this.resetUser()

          this.goToLogin()
        } else {
          this.setErrorMessage('註冊失敗，請稍後再試')
        }
      } catch (error) {
        const axiosError = error as AxiosError
        if (axiosError.response && axiosError.response.status === 409) {
          this.setErrorMessage('帳號已經存在')
        } else {
          this.setErrorMessage('註冊失敗，請稍後再試')
        }
        console.error('註冊錯誤', error)
      }
    },
    setErrorMessage(message: string) {
      this.errorMessage = message
      alert(this.errorMessage)
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
