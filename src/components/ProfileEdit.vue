<template>
  <div class="content">
    <div class="title">
      <h2>會員資訊</h2>
    </div>
    <div class="info-container">
      <div class="info-item" v-for="(value, key) in memberInfo" :key="key">
        <span class="label">{{ labels[key] }}</span>
        <span class="value">{{ value }}</span>
        <!-- <span class="edit" @click="editField(key)">編輯</span> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '../stores/userStore'

interface Labels {
  [key: string]: string
}

export default defineComponent({
  setup() {
    const userStore = useUserStore()

    const labels: Labels = {
      name: '姓名',
      account: '帳號',
      email: '電子郵件',
      phonenum: '手機號碼',
      address: '地址'
    }

    console.log('userInfo:', userStore.userInfo)

    return {
      memberInfo: userStore.userInfo,
      labels
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
  padding: 25px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  font-size: 20px;
}

.label {
  font-weight: bold;
  flex: 1;
}

.value {
  flex: 2;
}

.edit {
  color: blue;
  cursor: pointer;
}
</style>
