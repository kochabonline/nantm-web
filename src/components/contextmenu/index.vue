<template>
  <div class="context-menu" v-if="props.visible" :style="props.style" ref="menu">
    <ul v-for="(action, index) in props.items" :key="index">
      <li @click="action.onClick">{{ action.text }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import type { Props } from './type'

const props = defineProps<Partial<Props>>()
const menu = ref<HTMLElement | null>(null)

const emit = defineEmits(['update:visible'])

const handleClickOutside = (event: MouseEvent) => {
  if (menu.value && !menu.value.contains(event.target as Node)) {
    emit('update:visible', false)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="less">
.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.context-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.context-menu li {
  padding: 8px 12px;
  cursor: pointer;
}

.context-menu li:hover {
  background-color: #f5f5f5;
}
</style>
