<template>
  <a-layout-sider v-model:collapsed="collapsed" theme="light" collapsible>
    <Logo />
    <Menu :menus="routeStore.getMenuRouter" />
  </a-layout-sider>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/stores/route'
import Logo from './logo/LogoView.vue'
import Menu from './meun/MenuView.vue'
import { onMounted, ref } from 'vue'

const collapsed = ref<boolean>(false)
const routeStore = useRouteStore()
onMounted(() => {
  routeStore.setMenuRouter()
})
</script>

<style scoped lang="less"></style>
