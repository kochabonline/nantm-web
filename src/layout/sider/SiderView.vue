<template>
  <a-layout-sider class="layout-sider" v-model:collapsed="collapsed" theme="light" collapsible>
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

<style scoped lang="less">
.layout-sider {
  border-right: 1px solid #dcdcdc; /* 添加右边框线 */
}

:deep(.ant-layout-sider-trigger) {
  border-right: 1px solid #dcdcdc; /* 添加右边框线 */
}
</style>
