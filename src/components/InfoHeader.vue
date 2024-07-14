<template>
  <div class="info-header">
    <div class="profile-image">
      <img :src="profileImage" alt="Profile Picture" width="200" height="240" />
    </div>
    <h1 class="chineseName">{{ cname }}</h1>
    <div class="links">
      <a :href="igLink" class="instagram" target="_blank" rel="noopener noreferrer">
        <font-awesome-icon :icon="['fab', 'instagram']" class="instagram-icon" />
      </a>
      <a :href="fbLink" class="facebook" target="_blank" rel="noopener noreferrer">
        <font-awesome-icon :icon="['fab', 'facebook']" class="facebook-icon" />
      </a>
      <a :href="githubLink" class="github" target="_blank" rel="noopener noreferrer">
        <font-awesome-icon :icon="['fab', 'github']" class="github-icon" />
      </a>
      <a
        href="mailto:a0938391667@gmail.com"
        class="email"
        target="_blank"
        rel="noopener noreferrer"
      >
        <font-awesome-icon :icon="['fas', 'envelope']" class="email-icon" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InfoHeader',
  setup() {
    const profileImage = '/個人照片.jpg'
    const cname = '林子安'
    const email = 'a0938391667@gmail.com'
    const igLink = 'https://www.instagram.com/andy_lin0329?igsh=cWlqa3N2OWR0NnVt&utm_source=qr'
    const fbLink = 'https://www.facebook.com/profile.php?id=100005571426122'
    const githubLink = 'https://github.com/ndl1n'

    return {
      profileImage,
      cname,
      email,
      igLink,
      fbLink,
      githubLink
    }
  }
})
</script>

<style scoped>
.profile-image {
  text-align: center;
}

.profile-image img {
  display: block;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}

.chineseName {
  text-align: center;
  padding-top: 10px;
}

.links {
  display: flex;
  justify-content: center;
}

.links a {
  margin: 0 10px;
  color: #000;
}

.links a.instagram:hover {
  color: #e1306c;
  transform: scale(1.2);
}

.links a.facebook:hover {
  color: #1877f2;
  transform: scale(1.2);
}

.links a.github:hover {
  color: #333333;
  transform: scale(1.2);
}

.links a.email:hover {
  color: #ff6600;
  transform: scale(1.2);
}

.links a font-awesome-icon {
  font-size: 24px;
}

.instagram-icon,
.facebook-icon,
.github-icon,
.email-icon {
  font-size: 24px;
}
</style>
