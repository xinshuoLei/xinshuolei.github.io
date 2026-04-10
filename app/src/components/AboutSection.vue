<template>
  <div class="schematic-section" id="about">
    <div class="section-header">
      <span class="section-number">SEC. 5.0</span>
      <span class="section-title">System Specification</span>
      <div class="section-rule"></div>
      <span class="section-ref">REF: SPEC-MAIN</span>
    </div>

    <div class="spec-table">
      <div v-for="row in about.spec" :key="row.param" class="spec-row">
        <div class="spec-param">{{ row.param }}</div>
        <div class="spec-value" :class="{ accent: row.accent }">{{ row.value }}</div>
      </div>
    </div>

    <div class="note">
      <div class="note-label">DESIGN NOTES</div>
      <span v-for="(note, i) in about.notes" :key="i">
        {{ i + 1 }}. {{ note }}<br>
      </span>
    </div>
  </div>
</template>

<script setup>
import about from '@/data/about.json'
</script>
