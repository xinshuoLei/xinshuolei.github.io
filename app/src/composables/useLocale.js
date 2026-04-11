import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useLocale() {
  const route  = useRoute()
  const router = useRouter()

  const locale = computed(() => route.path === '/zh' ? 'zh' : 'en')

  function setLocale(l) {
    const target = l === 'zh' ? '/zh' : '/'
    if (route.path === target) return
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en'
    router.push(target)
  }

  return { locale, setLocale }
}
