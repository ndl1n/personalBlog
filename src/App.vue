<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import HeaderNav from './components/HeaderNav.vue'
// import ResumeComponent from './components/ResumeComponent.vue'

export default defineComponent({
  name: 'App',
  components: {
    // HeaderNav,
    // ResumeComponent
  }
})
</script>

<style>
body {
  background-color: #e4e8eb;
}

#app {
  display: flex;
}
</style>
