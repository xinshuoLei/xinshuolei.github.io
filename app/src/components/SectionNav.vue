<template>
  <div class="snav-wrap" :class="{ 'settings-open': settingsOpen }">
    <nav class="section-nav" :class="{ sweeping }">
      <div class="snav-header">
        <span class="snav-led"></span>
        <span class="snav-sys">NAV.SYS</span>
      </div>

      <!-- spacer mirrors the gear width so items are truly centered -->
      <div class="snav-spacer"></div>

      <!-- nav items — hidden on mobile when settings open -->
      <a
        v-for="(item, i) in items"
        :key="item.id"
        :href="`#${item.id}`"
        class="snav-item"
        :class="{ active: activeSection === item.id }"
      >
        <span class="snav-idx">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="snav-label">{{ item.label }}</span>
      </a>

      <!-- inline lang switcher — only visible on mobile when settings open -->
      <div class="snav-lang-inline">
        <button class="snav-opt" :class="{ active: locale === 'en' }" @click="pick('en')">EN</button>
        <span class="snav-opt-sep">·</span>
        <button class="snav-opt" :class="{ active: locale === 'zh' }" @click="pick('zh')">中文</button>
      </div>

      <div class="snav-footer">
        <span class="snav-pct">{{ String(scrollPct).padStart(3, '0') }}<em>%</em></span>
        <div class="snav-prog">
          <div class="snav-prog-fill" :style="{ width: scrollPct + '%' }"></div>
        </div>
      </div>
    </nav>

    <!-- outside section-nav so clip-path doesn't eat pointer events -->
    <button class="snav-gear" :class="{ open: settingsOpen }" @click="toggleSettings">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    </button>

    <!-- desktop/tablet dropdown panel -->
    <div class="snav-settings" :class="{ open: settingsOpen }">
      <div class="snav-settings-label">{{ locale === 'zh' ? '语言' : 'LANG' }}</div>
      <div class="snav-settings-row">
        <button class="snav-opt" :class="{ active: locale === 'en' }" @click="pick('en')">EN</button>
        <span class="snav-opt-sep">·</span>
        <button class="snav-opt" :class="{ active: locale === 'zh' }" @click="pick('zh')">中文</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { locale, setLocale } = useLocale()
const settingsOpen = ref(false)
const sweeping    = ref(false)
let sweepTimer = null

function triggerSweep() {
  if (sweepTimer) clearTimeout(sweepTimer)
  sweeping.value = false
  // force reflow so removing+re-adding the class restarts the animation
  requestAnimationFrame(() => {
    sweeping.value = true
    sweepTimer = setTimeout(() => { sweeping.value = false }, 500)
  })
}

function toggleSettings() {
  triggerSweep()
  settingsOpen.value = !settingsOpen.value
}

function pick(l) {
  setLocale(l)
}

const items = computed(() => locale.value === 'zh'
  ? [
      { id: 'education',  label: '教育' },
      { id: 'skills',     label: '技能' },
      { id: 'experience', label: '经历' },
      { id: 'projects',   label: '项目' },
    ]
  : [
      { id: 'education',  label: 'Education' },
      { id: 'skills',     label: 'Skills' },
      { id: 'experience', label: 'Experience' },
      { id: 'projects',   label: 'Projects' },
    ]
)

const activeSection = ref('')
const scrollPct     = ref(0)

function getContainer() {
  return document.querySelector('.content-area') || null
}

function onScroll() {
  const c = getContainer()
  const scrollTop    = c ? c.scrollTop   : window.scrollY
  const viewportH    = c ? c.clientHeight : window.innerHeight
  const scrollH      = c ? c.scrollHeight : document.documentElement.scrollHeight
  const threshold    = scrollTop + viewportH / 3
  const containerTop = c ? c.getBoundingClientRect().top : 0

  let found = false
  for (const item of [...items.value].reverse()) {
    const el = document.getElementById(item.id)
    if (el) {
      const elTop = scrollTop + el.getBoundingClientRect().top - containerTop
      if (elTop <= threshold) { activeSection.value = item.id; found = true; break }
    }
  }
  if (!found) activeSection.value = ''

  const total = scrollH - viewportH
  scrollPct.value = total > 0 ? Math.min(100, Math.round((scrollTop / total) * 100)) : 0
}

onMounted(() => {
  const c = getContainer()
  const target = c || window
  target.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  const c = getContainer()
  const target = c || window
  target.removeEventListener('scroll', onScroll)
})
</script>
