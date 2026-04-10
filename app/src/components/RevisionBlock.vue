<template>
  <div class="changelog">
    <span class="changelog-label">{{ ui.label }}</span>
    <div class="changelog-entries">
      <div v-for="row in about.revisions" :key="row.rev" class="changelog-entry">
        <span class="cl-rev">REV {{ row.rev }}</span>
        <span class="cl-dot">·</span>
        <span class="cl-date">{{ row.date }}</span>
        <span class="cl-dot">·</span>
        <span class="cl-author">{{ row.author }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import aboutEn from '@/data/about.json'
import aboutZh from '@/data/about.zh.json'

const { locale } = useLocale()
const about = computed(() => locale.value === 'zh' ? aboutZh : aboutEn)
const ui = computed(() => locale.value === 'zh'
  ? { label: '修订记录' }
  : { label: 'CHANGELOG' }
)
</script>
