<template>
  <div class="sidebar-buttons">
    <button class="circle-button">
      <div @click="goToLogin">
        <font-awesome-icon v-if="mode === 'mode1'" icon="sign-in-alt" class="login-button" />
      </div>
      <div @click="goToUserDirectory">
        <font-awesome-icon v-if="mode === 'mode2'" icon="cog" class="setting-button" />
      </div>
    </button>
    <button class="circle-button">
      <div @click="goToRegister">
        <font-awesome-icon v-if="mode === 'mode1'" icon="user-plus" class="register-button" />
      </div>
      <div @click="goToProfile">
        <font-awesome-icon v-if="mode === 'mode2'" icon="user-secret" class="user-button" />
      </div>
    </button>
    <button class="circle-button" @click="toggleMode">
      <div>
        <font-awesome-icon v-if="mode === 'mode1'" icon="keyboard" class="mode-button" />
      </div>
      <div>
        <font-awesome-icon
          v-if="mode === 'mode2'"
          icon="arrow-right-from-bracket"
          class="mode-button"
        />
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useNavigation } from '@/composables/useNavigation'

export default defineComponent({
  name: 'SideBar',
  components: {
    FontAwesomeIcon
  },
  props: {
    mode: {
      type: String,
      required: true
    }
  },
  setup() {
    const { goToHome, goToProfile, goToLogin, goToRegister, goToUserDirectory } = useNavigation()

    return {
      goToHome,
      goToProfile,
      goToLogin,
      goToRegister,
      goToUserDirectory
    }
  },
  methods: {
    toggleMode() {
      this.$emit('toggleMode')
    }
  }
})
</script>

<style scoped>
.sidebar-buttons {
  position: fixed;
  right: 65px;
  top: 30%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.circle-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
}

.circle-button:hover {
  background-color: #e0e0e0;
}

.login-button,
.setting-button,
.user-button,
.mode-button,
.register-button {
  font-size: 20px;
}
</style>
