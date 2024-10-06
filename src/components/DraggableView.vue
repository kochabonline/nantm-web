<template>
  <a-modal ref="modalRef" :wrap-style="{ overflow: 'hidden' }" cancelText="取消" okText="确定">
    <template #default>
      <slot />
    </template>
    <template #title>
      <div ref="modalTitleRef" class="modal-title" :inert="isDragging">{{ props.title }}</div>
      <a-divider />
    </template>
    <template #modalRender="{ originVNode }">
      <div :style="transformStyle">
        <component :is="originVNode" />
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, type CSSProperties, watch, watchEffect } from 'vue'
import { useDraggable } from '@vueuse/core'

const props = defineProps<{
  title?: string
}>()

const modalTitleRef = ref<HTMLElement | null>(null)
const { x, y, isDragging } = useDraggable(modalTitleRef)

const startX = ref<number>(0)
const startY = ref<number>(0)
const startedDrag = ref(false)
const transformX = ref(0)
const transformY = ref(0)
const preTransformX = ref(0)
const preTransformY = ref(0)
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 })

const calculateDragRect = () => {
  const bodyRect = document.body.getBoundingClientRect()
  const titleRect = modalTitleRef.value?.getBoundingClientRect()
  if (titleRect) {
    dragRect.value.right = bodyRect.width - titleRect.width
    dragRect.value.bottom = bodyRect.height - titleRect.height
  }
}

watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value
    startY.value = y.value
    calculateDragRect()
    preTransformX.value = transformX.value
    preTransformY.value = transformY.value
  }
  startedDrag.value = true
})

watch(isDragging, () => {
  if (!isDragging.value) {
    startedDrag.value = false
  }
})

watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
      preTransformX.value +
      Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
      startX.value
    transformY.value =
      preTransformY.value +
      Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
      startY.value
  }
})

const transformStyle = computed<CSSProperties>(() => ({
  transform: `translate(${transformX.value}px, ${transformY.value}px)`
}))
</script>

<style scoped lang="less">
.modal-title {
  width: 100%;
  cursor: move;
}
</style>
