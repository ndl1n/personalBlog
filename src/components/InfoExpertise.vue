<template>
  <div class="info-expertise">
    <div
      class="expertise-category"
      v-for="(technologies, category) in expertiseLanguagesAndFrameworks"
      :key="category"
    >
      <h3 class="category-title">{{ category }}</h3>
      <div class="tags">
        <span class="tag" v-for="(tech, index) in technologies" :key="index">{{ tech }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'InfoExpertise',
  setup() {
    const expertiseLanguagesAndFrameworks = reactive({
      Backend: ['Java', 'Python', 'Golang', 'Node.js'],
      'Ai&ML': ['PyTorch', 'TensorFlow'],
      Frontend: ['HTML', 'CSS', 'JavaScript', 'Vue'],
      Database: ['MySQL', 'PostgreSQL', 'SQLite'],
      Others: ['Git', 'JWT', 'REST API']
    })

    return {
      expertiseLanguagesAndFrameworks
    }
  }
})
</script>

<style scoped>
.expertise-category {
  display: grid;
  grid-template-columns: 150px 1fr;
  align-items: center;
  margin-bottom: 15px;
}

.category-title {
  padding-left: 2px;
  margin: 0;
  font-size: 20px;
  text-align: center;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.tag {
  display: grid;
  grid-template-columns: 100px 1fr;
  text-align: center;
  background-color: #0747f7;
  color: white;
  padding: 4px 8px;
  margin: 5px;
  border-radius: 3px;
  font-size: 18px;
}
</style>
