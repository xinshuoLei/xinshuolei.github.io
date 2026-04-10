<template>
  <div class="changelog">
    <span class="changelog-label">CHANGELOG</span>
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
import about from '@/data/about.json'
</script>
