<template>
  <svg :class="className" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  // 图标名称
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: 'icon'
  }
})

const iconName = computed(() => `#${props.icon}`)
const className = computed(() => `${props.className}`)
</script>

<style scoped lang="less">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
