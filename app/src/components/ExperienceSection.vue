<template>
  <div class="schematic-section" id="experience">
    <div class="section-header">
      <span class="section-number">SEC. 3.0</span>
      <span class="section-title">Work Experience</span>
      <div class="section-rule"></div>
      <span class="section-ref">REF: EXP-A — EXP-C</span>
    </div>

    <div class="component-grid" style="grid-template-columns: 1fr">
      <div v-for="exp in experience" :key="exp.id" class="component">
        <div class="comp-designation">
          {{ exp.id }}<template v-if="exp.tag"> · {{ exp.tag }}</template>
        </div>

        <div class="comp-logo" :class="{ 'comp-logo--padded': exp.logoPadded }">
          <template v-if="exp.logo">
            <img :src="base + 'logos/' + exp.logo" :alt="exp.org" @error="onLogoError" />
            <div class="comp-logo-placeholder" style="display:none">{{ exp.id }}</div>
          </template>
          <div v-else class="comp-logo-placeholder">{{ exp.id }}</div>
        </div>

        <!-- Company header — same structure for all entries -->
        <div class="comp-header" style="display: block">
          <div class="comp-title">
            {{ exp.org }}
            <a v-for="link in exp.links" :key="link.url" :href="link.url" class="comp-inline-link" target="_blank" rel="noopener" :title="link.display">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
          <div v-if="exp.location" class="comp-dim">{{ exp.location }}</div>
        </div>

        <!-- Multiple roles -->
        <template v-if="exp.roles">
          <div v-for="(role, i) in exp.roles" :key="role.title" class="comp-role" :class="{ 'comp-role--first': i === 0 }">
            <div class="comp-role-header">
              <span class="comp-role-title">{{ role.title }}</span>
              <span class="comp-dim">{{ role.date }}</span>
            </div>
            <ul class="comp-body">
              <li v-for="(bullet, j) in role.bullets" :key="j" v-html="renderBullet(bullet)"></li>
            </ul>
            <div v-if="role.stack.length" class="comp-stack">
              <span v-for="tech in role.stack" :key="tech" class="stack-tag">{{ tech }}</span>
            </div>
          </div>
        </template>

        <!-- Single role -->
        <template v-else>
          <div class="comp-role comp-role--first">
            <div class="comp-role-header">
              <span class="comp-role-title">{{ exp.title }}</span>
              <span class="comp-dim">{{ exp.date }}</span>
            </div>
            <ul class="comp-body">
              <li v-for="(bullet, i) in exp.bullets" :key="i" v-html="renderBullet(bullet)"></li>
            </ul>
            <div v-if="exp.stack && exp.stack.length" class="comp-stack">
              <span v-for="tech in exp.stack" :key="tech" class="stack-tag">{{ tech }}</span>
            </div>
          </div>
        </template>

        <div v-if="exp.tags && exp.tags.length" class="comp-tags">
          <span v-for="tag in exp.tags" :key="tag" class="tolerance">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import experience from '@/data/experience.json'

const base = import.meta.env.BASE_URL

function onLogoError(e) {
  e.target.style.display = 'none'
  const ph = e.target.nextElementSibling
  if (ph) ph.style.display = 'flex'
}

function renderBullet(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<span class="skill-hl">$1</span>')
}
</script>
