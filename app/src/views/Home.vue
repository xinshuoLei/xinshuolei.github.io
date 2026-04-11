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

  <!-- overlay: only appears AFTER content has left -->
  <Transition name="overlay">
    <div v-if="transitioning" class="locale-overlay" aria-hidden="true">
      <svg class="locale-icon" viewBox="0 0 64 64" fill="none" stroke="#5bc8f5" stroke-linecap="square">
        <!-- corner registration marks: 4 L-brackets drawn sequentially -->
        <path class="icon-corner c1" d="M 4,16 L 4,4 L 16,4"   stroke-width="0.9"/>
        <path class="icon-corner c2" d="M 48,4 L 60,4 L 60,16" stroke-width="0.9"/>
        <path class="icon-corner c3" d="M 4,48 L 4,60 L 16,60" stroke-width="0.9"/>
        <path class="icon-corner c4" d="M 60,48 L 60,60 L 48,60" stroke-width="0.9"/>
        <!-- centre dimension tick: small + mark -->
        <line class="icon-tick" x1="28" y1="32" x2="36" y2="32" stroke-width="0.7" stroke-linecap="round"/>
        <line class="icon-tick" x1="32" y1="28" x2="32" y2="36" stroke-width="0.7" stroke-linecap="round"/>
      </svg>
    </div>
  </Transition>

  <div class="content-area">
    <Transition name="locale-fade" mode="out-in" @after-leave="onAfterLeave">
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

const transitioning = ref(false)
let transitionTimer = null

// called by the Transition hook — fires only after the old content has fully left
function onAfterLeave() {
  if (transitionTimer) clearTimeout(transitionTimer)
  transitioning.value = true
  // overlay visible for 1100ms, then fades out over 0.35s
  // enter delay (1.45s below) = 1100 + 350 so content starts only after overlay is fully gone
  transitionTimer = setTimeout(() => { transitioning.value = false }, 1100)
}

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
/* ── page content: leave fast, enter delayed to let overlay finish ── */
.locale-fade-leave-active {
  transition: opacity 0.25s ease-in, transform 0.25s ease-in;
}
.locale-fade-enter-active {
  /* 1.45s = overlay timer (1100ms) + overlay fade-out (350ms) — content starts only after overlay is fully gone */
  transition: opacity 0.5s ease-out 1.45s, transform 0.5s ease-out 1.45s;
}
.locale-fade-leave-to   { opacity: 0; transform: translateY(-8px); }
.locale-fade-enter-from { opacity: 0; transform: translateY(8px); }

/* ── overlay: transparent, just centers the crosshair ── */
.locale-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* overlay itself fades in instantly, fades out slowly */
.overlay-enter-active { transition: opacity 0.15s ease; }
.overlay-leave-active { transition: opacity 0.35s ease; }
.overlay-enter-from,
.overlay-leave-to     { opacity: 0; }

/* ── blueprint registration marks ── */
.locale-icon { width: 80px; height: 80px; }

/* each corner bracket: path length ~24 (12 + 12) */
.icon-corner {
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  animation: draw-path 0.22s ease-out forwards;
}
.c1 { animation-delay: 0.0s; }
.c2 { animation-delay: 0.08s; }
.c3 { animation-delay: 0.08s; }
.c4 { animation-delay: 0.16s; }

/* centre + tick: drawn after corners settle */
.icon-tick {
  stroke-dasharray: 8;
  stroke-dashoffset: 8;
  animation: draw-path 0.18s ease-out 0.32s forwards;
}

@keyframes draw-path { to { stroke-dashoffset: 0; } }
</style>
