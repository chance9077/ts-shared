<template>
  <div class="container" :ref="pptRoot">
    <div class="slides">
      <section v-bind="md('doc.md')"></section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useInitReveal from './use/useInitReveal'
import useCodeSize from './use/useCodeFontSize'

const pptRoot = useInitReveal({
  progress: false,
  hash: true,
  embedded: true,
  preloadIframes: true,
  slideNumber: 'c/t',
  width: 1200,
  height: 900
})

const codeSize = useCodeSize()

function md(path: string): object {
  return {
    'data-transition': 'concave',
    'data-markdown':           path,
    'data-separator':          '^<!-- next -->',
    'data-separator-vertical': '^<!-- more -->'
  }
}
</script>

<style>
.reveal pre code {
  font-size: v-bind(codeSize);
}
</style>

<style scoped>
.container {
  height: 100vh;
}
</style>