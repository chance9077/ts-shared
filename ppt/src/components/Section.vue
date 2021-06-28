<template>
  <div class="slides">
    <section v-bind="options"></section>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue"
import { md } from '../reveal.config'

const props = defineProps({
  md: { type: String, required: true },
  bgColor: String
})
const options = {
  ...md(props.md),
  "data-background-color": props.bgColor
}
</script>