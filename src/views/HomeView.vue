<template>
  <div class="app-container">
    <div class="navigation-container">
      <DirectoryNav :mode="mode" :activeSection="activeSection" />
    </div>
    <div class="archive-container">
      <ArchiveNav :mode="mode" :activeSection="activeSection" />
    </div>
    <div class="content">
      <section id="info-field" class="content-section">
        <InfoHeader />
      </section>
      <section id="background-field" class="content-section">
        <h2>背景介紹</h2>
        <div class="item-start"></div>
        <ul>
          <li v-for="(field, index) in backgroundFields" :key="index">
            {{ field }}
          </li>
        </ul>
      </section>
      <section id="club-field" class="content-section">
        <h2>社團經歷</h2>
        <div class="item-start"></div>
        <ul>
          <li v-for="(field, index) in clubs" :key="index">
            {{ field }}
          </li>
        </ul>
      </section>
      <section id="work-experience" class="content-section">
        <h2>工作經驗</h2>
        <div class="item-start"></div>
        <ol>
          <li>{{ workExperience }}</li>
        </ol>
      </section>
      <section id="language-certificates" class="content-section">
        <h2>語言證照</h2>
        <div class="item-start"></div>
        <ul>
          <li v-for="(field, category) in languageCertificates" :key="category">
            {{ field }}
          </li>
        </ul>
      </section>
      <section id="expertiseLanguage" class="content-section">
        <h2>擅長語言及框架</h2>
        <div class="item-start"></div>
        <div class="expertise-section">
          <InfoExpertise />
        </div>
      </section>
      <section id="autobiography" class="content-section">
        <h2>自傳</h2>
        <div>
          <div class="item-start"></div>
          <div class="autobio-title">【個人特質】</div>
          <ol>
            <li>
              重視榮譽感和成就感
              <ul>
                <li>嚮往和團隊的人一起達成目標、完成專案</li>
              </ul>
            </li>
            <li>
              領導力和執行力足夠
              <ul>
                <li>在學期間能圓融地處理團隊中的事務，並有效率地完成報告、專案</li>
              </ul>
            </li>
            <li>
              樂於接受挑戰
              <ul>
                <li>熱愛思考，會想克服困難的問題，追求成長</li>
              </ul>
            </li>
            <li>
              喜歡和他人合作
              <ul>
                <li>享受和大家一起討論、協調，到完成整個任務的過程</li>
              </ul>
            </li>
          </ol>

          <div class="item-start"></div>
          <div class="autobio-title">【在學經歷】</div>
          <div class="item-start-double"></div>
          <p>
            在學期間我將成績維持在系排前10%，對程式設計和管理方面相當感興趣，故修習多門相關課程，希望除了具備商學院應有的基本能力，也期許成為一個全方位的人才。為此，我選擇了日文作為我的第二外語。自大一開始修習程式設計，再到大二修習資料結構和資料庫管理時，透過對課程的理解，也漸漸加深了自己對後端開發的嚮往。
          </p>
          <div class="item-start-double"></div>
          <p>
            除了學業之外，我也積極參與許多社團活動。我參加了數理資訊社，以了解更多程式設計相關的技能，透過工作坊探索程式設計以及其他未知領域。同時，我也參加指南服務團，希望能夠透過自身所學，幫助偏鄉的小孩，實現社會責任。目前，我也加入了Google
            學生開發者社群社團，期許進一步增加自己在後端實作的能力，還有積累更多的團隊合作和溝通經驗，以及對開發一個專案有更深入的了解和掌握。
          </p>
          <div class="item-start-double"></div>
          <p>
            在課程期間亦執行過許多小組任務或專案，我傾向於成為領導者，抑或是協調者，帶領和推動大家去完成整個專案。不僅期許在過程中訓練處事上的應對進退，更希望完備自己在執行專案中所應具備的能力，並希望透過自身去影響團隊中的成員。若團隊出現問題，導致進度延宕，亦會為他人設身處地，思考圓融地解決問題的最佳方式。
          </p>
        </div>
      </section>
    </div>
    <div>
      <Sidebar :mode="mode" @toggleMode="toggleMode" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'
import DirectoryNav from '../components/DirectoryNav.vue'
import ArchiveNav from '../components/ArchiveNav.vue'
import Sidebar from '../components/SideBar.vue'
import InfoHeader from '../components/InfoHeader.vue'
import InfoExpertise from '../components/InfoExpertise.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    DirectoryNav,
    ArchiveNav,
    Sidebar,
    InfoHeader,
    InfoExpertise
  },
  setup() {
    const activeSection = ref('professional-field')
    const backgroundFields = [
      '主修: 政治大學資訊管理學系',
      '雙主修: 統計學系',
      '輔系: 應用數學系、日本語文學系',
      '學程: 金融科技學程'
    ]
    const clubs = ['Google 學生開發者社群 (GDSC) ', '數理資訊社', '指南服務團']
    const workExperience = '玉山銀行 資訊處數位資訊發展中心'
    const languageCertificates = ['TOEIC 900分', 'JLPT N3']

    const onScroll = () => {
      const sections = document.querySelectorAll('.content-section')
      let currentSection = ''

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        if (window.scrollY >= sectionTop - 50) {
          currentSection = section.id
        }
      })

      activeSection.value = currentSection
    }

    const currentMode = ref<'mode1' | 'mode2'>('mode1')
    const toggleMode = () => {
      currentMode.value = currentMode.value === 'mode1' ? 'mode2' : 'mode1'
    }

    onMounted(() => {
      window.addEventListener('scroll', onScroll)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onScroll)
    })

    return {
      activeSection,
      backgroundFields,
      clubs,
      workExperience,
      languageCertificates,
      mode: currentMode,
      toggleMode,
      onScroll
    }
  }
})
</script>

<style scoped>
#app {
  background-color: #ddd;
  min-height: 100vh;
  color: #fff;
}

.app-container {
  display: flex;
  font-family: Arial, sans-serif;
}

.navigation-container {
  padding-top: 3%;
}

.archive-container {
  top: 500px;
}

.content {
  margin-left: 220px;
  padding: 50px 50px 50px 20px;
  min-height: 100vh;
  text-align: left;
  width: 1000px;
  background-color: #f5f5f5; /*white*/
}

.content-section {
  font-size: 20px;
  margin-bottom: 40px;
  text-align: left;
}

.content-section h1 {
  color: #333;
  padding-bottom: 5px;
  font-size: 28px;
}

.content-section h2 {
  color: #333;
  border-bottom: 2px solid #e3e3e3;
  padding-left: 2px;
  padding-bottom: 5px;
  font-size: 24px;
  font-weight: bold;
}

.content-section h3 {
  color: #333;
  padding-bottom: 5px;
  font-size: 22px;
  font-weight: 400;
}

.item-start {
  padding-top: 10px;
}

.item-start-double {
  padding-top: 20px;
}

ol {
  padding-left: 25px;
}

ul {
  padding-left: 25px;
}

li {
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 20px;
}

.autobio-title {
  font-weight: bold;
}
</style>
