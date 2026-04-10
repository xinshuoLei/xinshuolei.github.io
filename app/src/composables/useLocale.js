import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useLocale() {
  const route  = useRoute()
  const router = useRouter()

  const locale = computed(() => route.path === '/zh' ? 'zh' : 'en')

  function setLocale(l) {
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en'
    router.push(l === 'zh' ? '/zh' : '/')
  }

  return { locale, setLocale }
}
