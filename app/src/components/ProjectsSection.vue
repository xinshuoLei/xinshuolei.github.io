<template>
  <div class="schematic-section" id="projects">
    <div class="section-header">
      <span class="section-number">SEC. 4.0</span>
      <span class="section-title">{{ ui.title }}</span>
      <div class="section-rule"></div>
      <span class="section-ref">REF: PRJ-A — PRJ-C</span>
    </div>

    <div class="component-grid proj-grid">
      <div v-for="project in projects" :key="project.id" class="component">
        <div class="comp-designation">{{ project.id }} · {{ project.tag }}</div>

        <div class="comp-header">
          <div>
            <div class="comp-title">
              <span>{{ project.name }}</span>
              <a v-for="link in project.links" :key="link.url" :href="link.url" class="comp-inline-link" target="_blank" rel="noopener" title="GitHub Repo">
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
            <div class="comp-dim">{{ project.date }}</div>
          </div>
        </div>

        <div v-if="project.screenshot" class="comp-screenshot">
          <img :src="getScreenshot(project.screenshot)" :alt="project.name" />
        </div>

        <div class="comp-desc">
          <p v-for="(para, i) in project.description" :key="i" v-html="highlight(para, project.highlights)"></p>
        </div>

        <div class="comp-stack">
          <span v-for="skill in project.skills" :key="skill" class="stack-tag">{{ skill }}</span>
        </div>

        <div v-if="project.tags.length" class="comp-tags">
          <span v-for="tag in project.tags" :key="tag" class="tolerance">{{ tag }}</span>
        </div>
      </div>
    </div>

    <div class="note">
      <div class="note-label">{{ ui.notesLabel }}</div>
      1. {{ ui.additionalProjects }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import projectsEn from '@/data/projects.json'
import projectsZh from '@/data/projects.zh.json'

const { locale } = useLocale()
const projects = computed(() => locale.value === 'zh' ? projectsZh : projectsEn)
const ui = computed(() => locale.value === 'zh'
  ? { title: '施工日志', notesLabel: '注记', additionalProjects: '更多施工记录见 GITHUB.COM/XINSHUOLEI。' }
  : { title: 'Build Log', notesLabel: 'NOTES', additionalProjects: 'ADDITIONAL ENTRIES AVAILABLE AT GITHUB.COM/XINSHUOLEI.' }
)

const screenshots = import.meta.glob('@/assets/*', { eager: true, import: 'default' })

function getScreenshot(filename) {
  return screenshots[`/src/assets/${filename}`]
}

function highlight(text, terms) {
  if (!terms?.length) return text
  const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')
  return text.replace(regex, '<mark class="tech-mark">$1</mark>')
}
</script>
