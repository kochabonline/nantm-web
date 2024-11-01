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
      v-for="pane in tabsStore.getTabs"
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
  e.preventDefault()

  style.value = {
    top: `${e.clientY}px`,
    left: `${e.clientX}px`
  }
  visible.value = true
}

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    const { name, meta } = router.currentRoute.value
    const tab = {
      name: name?.toString() || '',
      title: (meta.title as string) || '',
      keepalive: meta.keepalive !== undefined ? (meta.keepalive as boolean) : false,
      closable: meta.closable !== undefined ? (meta.closable as boolean) : true
    }
    tabsStore.addTab(tab)
  },
  { immediate: true }
)
</script>

<style scoped lang="less"></style>
