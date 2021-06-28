<template>
  <div class="container" :ref="pptRoot">
    <div class="slides">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useInitReveal from '../use/useInitReveal'
import useCodeSize from '../use/useCodeFontSize'
import { reveal } from '../reveal.config'

const pptRoot = useInitReveal(reveal)
const fontSize = useCodeSize()
</script>

<style>
.reveal pre code {
  font-size: v-bind(fontSize);
}
</style>

<style scoped>
.container {
  height: 100vh;
}
</style>