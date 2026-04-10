<template>
  <div class="schematic-section" id="skills">
    <div class="section-header">
      <span class="section-number">SEC. 2.0</span>
      <span class="section-title">{{ ui.title }}</span>
      <div class="section-rule"></div>
      <span class="section-ref">REF: SKL-01 — SKL-N</span>
    </div>

    <div class="skills-matrix">
      <div v-for="group in skills" :key="group.group" class="skill-group" :class="{ 'skill-group--wide': group.span === 2 }">
        <div class="skill-group-label">{{ group.group }}</div>
        <div class="skill-tags">
          <span v-for="skill in group.items" :key="skill" class="skill-tag">{{ skill }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import skillsEn from '@/data/skills.json'
import skillsZh from '@/data/skills.zh.json'

const { locale } = useLocale()
const skills = computed(() => locale.value === 'zh' ? skillsZh : skillsEn)
const ui = computed(() => locale.value === 'zh'
  ? { title: '零件清单' }
  : { title: 'Component Inventory' }
)
</script>
