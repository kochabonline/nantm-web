<template>
  <a-menu
    v-model:openKeys="forwarded.openKeys"
    v-model:selectedKeys="forwarded.selectedKeys"
    mode="inline"
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

interface Props extends MenuProps {
  menus: Menu[]
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
  openKeys: () => ['Dashboard'],
  selectedKeys: () => ['Dashboard']
})
const forwarded = useForwardProps(props)

const handleClick = (e: { key: string }) => {
  router.push({ name: e.key })
}
</script>

<style scoped lang="less"></style>
