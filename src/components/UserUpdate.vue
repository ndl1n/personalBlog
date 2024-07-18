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
      <button class="update-button" @click="updateUser">確定</button>
      <button class="cancel-button" @click="goToUserDirectory">取消</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useNavigation } from '@/composables/useNavigation'
import { validatePhoneNumber, validateAccount } from '@/utils/validators'
import { setErrorMessage } from '@/utils/errorHandler'

interface User {
  id: number
  name: string
  account: string
  email: string
  phonenum: string
}

export default defineComponent({
  name: 'UpdateForm',
  setup() {
    const user = ref<User>({} as User)
    const errorMessage = ref('')
    const { goToUserDirectory } = useNavigation()
    const route = useRoute()

    const labels = {
      name: '姓名',
      account: '帳號',
      email: '電子郵件',
      phonenum: '手機號碼'
    }

    const fetchSingleUser = async () => {
      const id = route.params.id
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${id}`)
        user.value = response.data
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    const validateUser = () => {
      const phoneError = validatePhoneNumber(user.value.phonenum)
      const accountError = validateAccount(user.value.account)

      if (phoneError) {
        errorMessage.value = phoneError
        return false
      }

      if (accountError) {
        errorMessage.value = accountError
        return false
      }

      errorMessage.value = ''
      return true
    }

    const updateUser = async () => {
      if (!validateUser()) {
        setErrorMessage(errorMessage.value)
        return
      }

      try {
        const response = await axios.put(
          `http://localhost:8080/api/users/${user.value.id}`,
          user.value
        )
        console.log('User updated:', response.data)
        goToUserDirectory()
      } catch (error) {
        console.error('Error updating user:', error)
      }
    }

    onMounted(fetchSingleUser)

    return {
      user,
      labels,
      goToUserDirectory,
      updateUser
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

.update-button,
.cancel-button {
  width: 200px;
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-button {
  background-color: orange;
  color: white;
}

.update-button:hover {
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
