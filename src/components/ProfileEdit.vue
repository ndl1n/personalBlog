<template>
  <div class="content">
    <div class="title">
      <h2>會員資訊</h2>
    </div>
    <div class="info-container">
      <div class="info-item" v-for="(value, key) in memberInfo" :key="key">
        <span class="label">{{ labels[key] }}</span>
        <span class="value">{{ value }}</span>
        <span class="edit" @click="editField(key)">編輯</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface MemberInfo {
  name: string
  account: string
  password: string
  email: string
  phone: string
  birthday: string
  address: string
}

interface Labels {
  [key: string]: string
}

export default defineComponent({
  data() {
    return {
      memberInfo: {
        name: '林子安',
        account: 'andy6137',
        password: '未設定',
        email: 'a0938391667@gmail.com',
        phone: '0938391667',
        birthday: '2003-03-29',
        address: '桃園市桃園區實山街185-1號'
      } as MemberInfo,
      labels: {
        name: '姓名',
        account: '帳號',
        password: '密碼',
        email: '電子郵件',
        phone: '手機號碼',
        birthday: '生日',
        address: '通訊地址'
      } as Labels
    }
  },
  methods: {
    editField(field: keyof MemberInfo): void {
      // 實現編輯功能的邏輯
      console.log(`Editing ${field}`)
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

.value {
  flex: 2;
}

.edit {
  color: blue;
  cursor: pointer;
}
</style>
