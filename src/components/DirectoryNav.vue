<template>
  <div class="navigation">
    <h2>目錄</h2>
    <div v-if="mode === 'mode1'">
      <ul>
        <li v-for="(item, index) in navItems1" :key="index">
          <a :href="'#' + item.link" :class="{ active: activeSection === item.link }">
            {{ index + 1 }}. {{ item.title }}
          </a>
        </li>
      </ul>
    </div>
    <div v-if="mode === 'mode2'">
      <ul>
        <li v-for="(item, index) in navItems2" :key="index">
          <a :href="'#' + item.link" :class="{ active: activeSection === item.link }">
            {{ index + 1 }}. {{ item.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'DirectoryNav',
  props: {
    mode: {
      type: String as PropType<'mode1' | 'mode2'>,
      required: true
    },
    activeSection: {
      type: String,
      required: true
    }
  },
  setup() {
    const navItems1 = [
      { title: '我的資訊', link: 'profile' },
      { title: '背景介紹', link: 'background-field' },
      { title: '社團經歷', link: 'club-field' },
      { title: '工作經歷', link: 'work-experience' },
      { title: '語言證照', link: 'language-certificates' },
      { title: '擅長語言及框架', link: 'expertiseLanguage' },
      { title: '自傳', link: 'autobiography' }
    ]
    const navItems2 = [
      { title: '個人介紹', link: 'profile' },
      { title: '興趣', link: 'interest' },
      { title: '專長', link: 'expertise' },
      { title: '目標', link: 'goal' },
      { title: '留言板', link: 'message-board' },
      { title: '聯絡方式', link: 'contact-me' }
    ]

    return {
      navItems1,
      navItems2
    }
  }
})
</script>

<style scoped>
.navigation {
  width: 250px;
  padding: 20px;
  position: fixed;
  height: auto;
  border-radius: 10px;
  max-height: 100vh;
  overflow-y: auto;
  left: 200px;
  background-color: #f5f5f5;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navigation h2 {
  color: #ff6600;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
}

.navigation ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.navigation li {
  margin-top: 10px;
  margin-bottom: 10px;
}

.navigation a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
}

.navigation a:hover,
.navigation a.active {
  color: #ff6600;
}
</style>
