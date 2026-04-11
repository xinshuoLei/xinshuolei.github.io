<template>
  <div class="fold-marks">
    <div class="fold-h" style="top: 33.33%"></div>
    <div class="fold-h" style="top: 66.66%"></div>
    <div class="fold-v" style="left: 33.33%"></div>
    <div class="fold-v" style="left: 66.66%"></div>
  </div>

  <div class="crosshair-h" ref="chH"></div>
  <div class="crosshair-v" ref="chV"></div>
  <div class="coord-display" ref="coord">X: 0000  Y: 0000</div>

  <SectionNav />

  <div class="content-area">
    <Transition name="locale-fade" mode="out-in">
      <div :key="locale" class="page">
        <TitleBlock />
        <EducationSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <RevisionBlock />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'
import TitleBlock        from '@/components/TitleBlock.vue'
import SectionNav        from '@/components/SectionNav.vue'
import EducationSection  from '@/components/EducationSection.vue'
import SkillsSection     from '@/components/SkillsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ProjectsSection   from '@/components/ProjectsSection.vue'
import RevisionBlock     from '@/components/RevisionBlock.vue'

const { locale } = useLocale()

const chH   = ref(null)
const chV   = ref(null)
const coord = ref(null)

function onMouseMove(e) {
  chH.value.style.top  = e.clientY + 'px'
  chV.value.style.left = e.clientX + 'px'
  const x = String(Math.round(e.clientX)).padStart(4, '0')
  const y = String(Math.round(e.clientY + window.scrollY)).padStart(4, '0')
  coord.value.textContent = `X: ${x}  Y: ${y}`
}

onMounted(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  document.addEventListener('mousemove', onMouseMove)
})
onUnmounted(() => document.removeEventListener('mousemove', onMouseMove))
</script>

<style scoped>
.locale-fade-leave-active {
  transition: opacity 0.25s ease-in, transform 0.25s ease-in;
}
.locale-fade-enter-active {
  transition: opacity 0.35s ease-out, transform 0.35s ease-out;
}
.locale-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.locale-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
</style>
