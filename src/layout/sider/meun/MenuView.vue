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

const findFirstChildKey = (menus: Menu[], key: string): string | null => {
  for (const menu of menus) {
    if (menu.key === key && menu.children && menu.children.length > 0) {
      return menu.children[0].key
    }
    if (menu.children) {
      const found = findFirstChildKey(menu.children, key)
      if (found) {
        return found
      }
    }
  }
  return null
}

const setDefaultKeys = () => {
  if (props.menus.length > 0) {
    const { key } = props.menus[0]
    const childKey = findFirstChildKey(props.menus, key) || key
    state.selectedKeys = [childKey]
    state.openKeys = [key]
    router.push({ name: childKey })
  }
}

// 首次渲染时设置默认选中项
onMounted(() => {
  setDefaultKeys()
})
// TODO: 组件重新渲染时还原之前的选中项(暂时先设置成默认选中项)
// watch(() => props.menus, setDefaultKeys)
</script>

<style scoped lang="less"></style>
