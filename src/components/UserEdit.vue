<template>
  <div class="content">
    <div class="title">
      <h2>用戶目錄</h2>
    </div>
    <button class="add-user-button" @click="goToAdd">Add User</button>
    <div class="info-container">
      <table class="user-table">
        <thead>
          <tr>
            <th>姓名</th>
            <th>帳號</th>
            <th>電子郵件</th>
            <th>電話號碼</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.account }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phonenum }}</td>
            <td>
              <div class="buttons">
                <button class="update-button" @click="goToUpdate(user.id)">Update</button>
                <button class="delete-button" @click="deleteUser(user.id)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="home-button" @click="goToHome">Back to home</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

interface User {
  id: number
  name: string
  account: string
  email: string
  phonenum: string
}

export default defineComponent({
  name: 'UserDirectory',
  data() {
    return {
      users: [] as User[]
    }
  },
  setup() {
    const router = useRouter()

    const goToHome = () => {
      router.push('/')
    }

    const goToUpdate = (id: number) => {
      router.push(`/user-update/${id}`)
    }

    const goToAdd = () => {
      router.push('/user-add')
    }

    return { goToHome, goToAdd, goToUpdate }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8080/api/users')
        this.users = response.data
        console.log('Users:', this.users)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    async deleteUser(id: number) {
      const confirmed = window.confirm('確定要刪除這位用戶嗎？')

      if (confirmed) {
        try {
          const response = await axios.delete(`http://localhost:8080/api/users/${id}`)
          console.log('User deleted:', response.data)
          this.fetchUsers()
        } catch (error) {
          console.error('Error deleting user:', error)
        }
      } else {
        console.log('刪除動作已取消')
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
  width: 1200px;
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

.add-user-button {
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 20px;
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.user-table th {
  background-color: #f2f2f2;
  text-align: left;
  font-size: 20px;
}

.user-table td {
  font-size: 18px;
}

.buttons {
  display: flex;
  justify-content: center;
}

.update-button {
  background-color: #05bff7;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
  width: 70px;
  height: 30px;
}

.delete-button {
  background-color: #e53832;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
  width: 70px;
  height: 30px;
}

.home-button {
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 20px;
  padding: 10px 20px;
  background-color: rgba(133, 137, 131, 0.377);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
</style>
