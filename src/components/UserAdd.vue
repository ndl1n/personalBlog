<template>
  <div class="content">
    <div class="title">
      <h2>新增</h2>
    </div>
    <div class="info-container">
      <div class="info-item" v-for="(label, key) in labels" :key="key">
        <label :for="key">{{ label }}</label>
        <input type="text" :id="key" v-model="registerInfo[key]" :placeholder="label" />
      </div>
    </div>
    <div class="buttons">
      <button class="register-button" @click="register">確定</button>
      <button class="cancel-button" @click="goToHome">取消</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AddForm',
  setup() {
    const registerInfo = reactive({
      name: '',
      account: '',
      email: '',
      phone: ''
    })

    const labels = {
      name: '姓名',
      account: '帳號',
      email: '電子郵件',
      phone: '手機號碼'
    }

    const router = useRouter()

    const goToHome = () => {
      router.push('/')
    }

    const register = () => {
      // 註冊功能的邏輯
      console.log('註冊資料', registerInfo)
    }

    return {
      registerInfo,
      labels,
      goToHome,
      register
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
