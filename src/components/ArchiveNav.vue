<template>
  <div class="archive">
    <h2>文章&檔案</h2>
    <div v-if="mode === 'mode1'">
      <ul>
        <li v-for="(item, index) in archiveItems1" :key="index">
          <a :href="'#' + item.link" :class="{ active: activeSection === item.link }">
            {{ index + 1 }}. {{ item.title }}
          </a>
        </li>
      </ul>
    </div>
    <div v-if="mode === 'mode2'">
      <ul>
        <li v-for="(item, index) in archiveItems2" :key="index">
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
  name: 'ArchiveNav',
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
    const archiveItems1 = [
      { title: '生活', link: 'my-life' },
      { title: '經歷', link: 'my-experience' }
    ]
    const archiveItems2 = [
      { title: '回憶', link: 'my-memory' },
      { title: '其他', link: 'my-others' }
    ]

    return {
      archiveItems1,
      archiveItems2
    }
  }
})
</script>

<style scoped>
.archive {
  width: 250px;
  padding: 20px;
  position: fixed;
  height: auto;
  border-radius: 10px;
  max-height: 100vh;
  overflow-y: auto;
  left: 200px;
  top: 450px;
  background-color: #f5f5f5; /*white*/
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.archive h2 {
  color: #ff6600;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
}

.archive ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.archive li {
  margin-top: 10px;
  margin-bottom: 10px;
}

.archive a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
}

.archive a:hover,
.archive a.active {
  color: #ff6600;
}
</style>
