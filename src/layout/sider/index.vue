<template>
  <a-layout-sider class="layout-sider" v-model:collapsed="collapsed" theme="light" collapsible>
    <Logo />
    <Menu :menus="routeStore.getMenus" />
  </a-layout-sider>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/stores/route'
import Logo from './logo/index.vue'
import Menu from './meun/index.vue'
import { onMounted, ref } from 'vue'

const collapsed = ref<boolean>(false)
const routeStore = useRouteStore()
onMounted(() => {
  routeStore.setMenus()
})
</script>

<style scoped lang="less">
.layout-sider {
  border-right: 1px solid #dcdcdc; /* 添加右边框线 */
}

:deep(.ant-layout-sider-trigger) {
  border-right: 1px solid #dcdcdc; /* 添加右边框线 */
}
</style>
