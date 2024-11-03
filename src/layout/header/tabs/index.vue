<template>
  <a-tabs
    :activeKey="tabsStore.getActiveKey"
    hide-add
    type="editable-card"
    size="small"
    style="background-color: #fff"
    @edit="onEdit"
    @tabClick="onTableClick"
    @contextmenu.prevent="onContextmenu"
  >
    <a-tab-pane
      v-for="pane in tabsStore.tabs"
      :key="pane.name"
      :tab="pane.title"
      :closable="pane.closable"
    />
  </a-tabs>
  <ContextMenu :visible="visible" :style="style" :items="items" @update:visible="updateVisible" />
</template>

<script setup lang="ts">
import { useTabsStore } from '@/stores/tabs'
import { ref, watch } from 'vue'
import router from '@/router'
import ContextMenu from '@/components/contextmenu/index.vue'

const tabsStore = useTabsStore()

const onEdit = (targetKey: string) => {
  tabsStore.removeTab(targetKey)
}
const onTableClick = (name: string) => {
  router.push({ name: name })
}

const visible = ref(false)
const style = ref({ top: '0px', left: '0px' })
const items = [
  {
    key: 'closeAll',
    text: '关闭全部标签页',
    onClick: () => {
      tabsStore.closeAllTabs()
      visible.value = false
    }
  }
]
const updateVisible = (val: boolean) => {
  visible.value = val
}
const onContextmenu = (e: MouseEvent) => {
  // 阻止默认右键菜单
  e.preventDefault()
  // 阻止事件冒泡
  e.stopPropagation()

  style.value = {
    top: `${e.clientY}px`,
    left: `${e.clientX}px`
  }
  visible.value = true
}

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    if (router.currentRoute.value.meta.hidden) return

    const { name, meta } = router.currentRoute.value
    const tab = {
      name: name?.toString() || '',
      title: meta.title !== undefined ? (meta.title as string) : '',
      closable: meta.closable !== undefined ? (meta.closable as boolean) : true,
      keepAlive: meta.keepAlive !== undefined ? (meta.keepAlive as boolean) : false
    }
    tabsStore.addTab(tab)
  },
  { immediate: true }
)
</script>

<style scoped lang="less"></style>
