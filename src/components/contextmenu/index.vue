<template>
  <div class="context-menu" v-if="props.visible" :style="props.style" ref="menu">
    <ul>
      <li v-for="(action, index) in props.items" :key="index" @click="action.onClick">
        {{ action.text }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import type { Props } from './type'

const props = defineProps<Partial<Props>>()
const menu = ref<HTMLElement | null>(null)

const emit = defineEmits(['update:visible'])

const handleGlobalEvent = (event: Event) => {
  if (props.visible) {
    if (event instanceof MouseEvent && menu.value && !menu.value.contains(event.target as Node)) {
      emit('update:visible', false)
    } else if (event instanceof KeyboardEvent && event.key === 'Escape') {
      emit('update:visible', false)
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleGlobalEvent)
  document.addEventListener('keydown', handleGlobalEvent)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleGlobalEvent)
  document.removeEventListener('keydown', handleGlobalEvent)
})
</script>

<style scoped lang="less">
.context-menu {
  position: absolute;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border-radius: 8px;
}

.context-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.context-menu li {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 8px;
}

.context-menu li:hover {
  background-color: #f5f5f5;
}
</style>
