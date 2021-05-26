import Reveal from 'reveal.js'
import 'reveal.js/dist/reset.css'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'
import '../assets/custom.css'
import '../assets/atom-one-dark.css'
import Markdown from 'reveal.js/plugin/markdown/markdown.js'
import Highlight from 'reveal.js/plugin/highlight/highlight.js'
import Zoom from 'reveal.js/plugin/zoom/zoom.js'
import { onMounted } from 'vue'

export default function(options: {} = {}) {
  let el: HTMLElement
  const root = (target: HTMLElement) => el = target

  onMounted(() => {
    if (!el) return
  
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal')
    }
    const deck = new Reveal(el, {
      ...options,
      plugins: [ Markdown, Highlight, Zoom ]
    })
    deck.initialize()
  })

  return root
}