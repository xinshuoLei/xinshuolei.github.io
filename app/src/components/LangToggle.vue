<template>
  <div class="lang-toggle">
    <button
      class="lang-btn"
      :class="{ active: locale === 'en' }"
      @click="setLocale('en')"
    >EN</button>
    <span class="lang-sep">/</span>
    <button
      class="lang-btn"
      :class="{ active: locale === 'zh' }"
      @click="setLocale('zh')"
    >中文</button>
  </div>
</template>

<script setup>
import { useLocale } from '@/composables/useLocale'
const { locale, setLocale } = useLocale()
</script>

<style scoped>
.lang-toggle {
  position: fixed;
  top: 14px;
  right: 18px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--color-dim, #555);
  user-select: none;
}

.lang-btn {
  background: none;
  border: none;
  padding: 2px 4px;
  cursor: pointer;
  font: inherit;
  color: inherit;
  letter-spacing: inherit;
  transition: color 0.15s;
}

.lang-btn:hover {
  color: var(--color-text, #ccc);
}

.lang-btn.active {
  color: var(--color-accent, #5bc8f5);
}

.lang-sep {
  opacity: 0.4;
}
</style>
