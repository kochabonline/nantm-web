<template>
  <a-menu
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
    :mode="forwarded.mode"
    :theme="forwarded.theme"
    :inline-collapsed="forwarded.collapsed"
    :items="forwarded.menus"
    @click="handleClick"
  >
  </a-menu>
</template>

<script setup lang="ts">
import { useForwardProps } from 'radix-vue'
import type { MenuProps, Menu } from './types'
import router from '@/router'
import { onMounted, reactive, watch } from 'vue'
import { type MenuMode, type MenuTheme } from 'ant-design-vue'

interface Props extends MenuProps {
  menus: Menu[]
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
  mode: 'inline' as MenuMode,
  theme: 'light' as MenuTheme
})
const forwarded = useForwardProps(props)

const state = reactive({
  selectedKeys: [''],
  openKeys: ['']
})

const handleClick = (e: { key: string }) => {
  const parentKey = findParentKey(forwarded.value.menus, e.key) || e.key
  state.selectedKeys = [e.key]
  state.openKeys = [parentKey]
  router.push({ name: e.key })
}

const findParentKey = (
  menus: Menu[],
  key: string,
  parentKey: string | null = null
): string | null => {
  for (const menu of menus) {
    if (menu.key === key) {
      return parentKey
    }
    if (menu.children) {
      const found = findParentKey(menu.children, key, menu.key)
      if (found) {
        return found
      }
    }
  }
  return null
}

const setKeys = () => {
  const currentKey = router.currentRoute.value.name?.toString() || ''
  const currentParentKey = findParentKey(props.menus, currentKey) || currentKey

  state.selectedKeys = [currentKey]
  state.openKeys = [currentParentKey]
}

// 首次渲染时设置选中项
onMounted(() => {
  setKeys()
})

// 渲染后才能获取到 menus
watch(
  () => props.menus,
  () => {
    setKeys()
  },
  { deep: true }
)

// 监听路由变化
watch(
  () => router.currentRoute.value.fullPath,
  () => {
    setKeys()
  }
)
</script>

<style scoped lang="less"></style>
