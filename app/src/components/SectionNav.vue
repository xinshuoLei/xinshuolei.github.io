<template>
  <div class="snav-wrap">
    <nav class="section-nav">
      <div class="snav-header">
        <span class="snav-led"></span>
        <span class="snav-sys">NAV.SYS</span>
      </div>

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

      <div class="snav-footer">
        <span class="snav-pct">{{ String(scrollPct).padStart(3, '0') }}<em>%</em></span>
        <div class="snav-prog">
          <div class="snav-prog-fill" :style="{ width: scrollPct + '%' }"></div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { locale } = useLocale()

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
  const scrollTop  = c ? c.scrollTop  : window.scrollY
  const viewportH  = c ? c.clientHeight : window.innerHeight
  const scrollH    = c ? c.scrollHeight : document.documentElement.scrollHeight
  const threshold  = scrollTop + viewportH / 3
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
