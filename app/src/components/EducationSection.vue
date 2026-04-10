<template>
  <div class="schematic-section" id="education">
    <div class="section-header">
      <span class="section-number">SEC. 1.0</span>
      <span class="section-title">{{ ui.title }}</span>
      <div class="section-rule"></div>
      <span class="section-ref">REF: EDU-01/02/03</span>
    </div>

    <div class="component-grid" style="grid-template-columns: 1fr">
      <div v-for="edu in education" :key="edu.id" class="component">
        <div class="comp-designation">{{ edu.id }} · {{ edu.tag }}</div>

        <!-- Row 1: degree | GPA + logo -->
        <div class="comp-header">
          <div class="comp-title">{{ edu.degree }}</div>
          <div style="display: flex; align-items: center; gap: 16px; flex-shrink: 0">
            <div class="comp-spec" style="color: #5bc8f5">GPA {{ edu.gpa }}</div>
            <div class="comp-logo comp-logo--sm comp-logo--inline">
              <template v-if="edu.logo">
                <img :src="base + 'logos/' + edu.logo" :alt="edu.school" @error="onLogoError" />
                <div class="comp-logo-placeholder" style="display:none">{{ edu.id }}</div>
              </template>
              <div v-else class="comp-logo-placeholder">{{ edu.id }}</div>
            </div>
          </div>
        </div>

        <!-- Row 2: school | date -->
        <div class="comp-edu-row">
          <div class="comp-subtitle">{{ edu.school }}</div>
          <div class="comp-dim">{{ edu.date }}</div>
        </div>

        <div v-if="edu.subtitle" class="comp-advisor">{{ edu.subtitle }}</div>

        <div v-if="edu.honors" class="comp-honors">{{ edu.honors }}</div>

        <div v-if="edu.specializations && edu.specializations.length" class="comp-subtitle" style="margin-bottom: 6px">
          {{ ui.specializations }}{{ edu.specializations.join(' · ') }}
        </div>

        <ul v-if="edu.courses && edu.courses.length" class="comp-body comp-body--courses">
          <li v-for="course in edu.courses" :key="course">{{ course }}</li>
        </ul>

        <div class="comp-tags">
          <span v-for="tag in edu.tags" :key="tag" class="tolerance">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import educationEn from '@/data/education.json'
import educationZh from '@/data/education.zh.json'

const { locale } = useLocale()
const education = computed(() => locale.value === 'zh' ? educationZh : educationEn)
const ui = computed(() => locale.value === 'zh'
  ? { title: '校准记录', specializations: '方向：' }
  : { title: 'Calibration History', specializations: 'Specializations: ' }
)

const base = import.meta.env.BASE_URL

function onLogoError(e) {
  e.target.style.display = 'none'
  const ph = e.target.nextElementSibling
  if (ph) ph.style.display = 'flex'
}
</script>
