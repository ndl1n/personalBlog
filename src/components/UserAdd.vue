<template>
  <div class="content">
    <div class="title">
      <h2>新增</h2>
    </div>
    <form @submit.prevent="addUser">
      <div class="info-container">
        <div class="info-item" v-for="(label, key) in labels" :key="key">
          <label :for="key">{{ label }}</label>
          <input type="text" :id="key" v-model="user[key]" :placeholder="label" />
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
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  name: 'AddForm',
  data() {
    return {
      user: {
        name: '',
        account: '',
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
      email: '電子郵件',
      phonenum: '手機號碼'
    }

    const router = useRouter()

    const goToUserDirectory = () => {
      router.push('/user-directory')
    }

    return {
      labels,
      goToUserDirectory
    }
  },
  methods: {
    async addUser() {
      try {
        const response = await axios.post('http://localhost:8080/api/users', this.user)
        console.log('User added:', response.data)
        // 清空表單
        this.user.name = ''
        this.user.account = ''
        this.user.email = ''
        this.user.phonenum = ''
        this.goToUserDirectory()
      } catch (error) {
        console.error('Error adding user:', error)
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
