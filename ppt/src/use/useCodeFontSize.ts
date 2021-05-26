import { ref, onMounted } from 'vue'

export default function useCodeSize() {
  const fontSize = ref<string>('20px')

  onMounted(() => {
    document.addEventListener('keyup', e => {
      const { key, shiftKey } = e
      if (shiftKey) {
        if (key === '+') {
          fontSize.value = `${+fontSize.value.slice(0, -2) + 1}px`
        } else if (key === '_') {
          fontSize.value = `${+fontSize.value.slice(0, -2) - 1}px`
        } else if (key === ')') {
          fontSize.value = '20px'
        }
      }
    })
  })

  return fontSize
}