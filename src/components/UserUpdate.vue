<template>
  <div class="content">
    <div class="title">
      <h2>更新</h2>
    </div>
    <div class="info-container">
      <div class="info-item" v-for="(label, key) in labels" :key="key">
        <label :for="key">{{ label }}</label>
        <input type="text" :id="key" v-model="user[key]" :placeholder="label" />
      </div>
    </div>
    <div class="buttons">
      <button class="register-button" @click="updateUser">確定</button>
      <button class="cancel-button" @click="goToUserDirectory">取消</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

interface User {
  id: number
  name: string
  account: string
  email: string
  phonenum: string
}

export default defineComponent({
  name: 'UpdateForm',
  data() {
    return {
      user: {} as User
    }
  },
  setup() {
    const labels = {
      name: '姓名',
      account: '帳號',
      email: '電子郵件',
      phonenum: '手機號碼'
    }

    const router = useRouter()
    const route = useRoute()

    const goToUserDirectory = () => {
      router.push('/user-directory')
    }

    return {
      labels,
      goToUserDirectory,
      route
    }
  },
  created() {
    this.fetchSingleUser()
  },
  methods: {
    async fetchSingleUser() {
      const id = this.$route.params.id
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${id}`)
        this.user = response.data
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    },
    async updateUser() {
      try {
        const errorMessage = ref('')
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

        const response = await axios.put(
          `http://localhost:8080/api/users/${this.user.id}`,
          this.user
        )
        console.log('User updated:', response.data)
        // 更新後跳轉
        this.goToUserDirectory()
      } catch (error) {
        console.error('Error updating user:', error)
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
