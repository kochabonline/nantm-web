<template>
  <a-layout-sider
    class="layout-sider"
    v-model:collapsed="localCollapsed"
    :trigger="null"
    theme="light"
    collapsible
  >
    <Logo />
    <Menu :menus="routeStore.getMenus" />
  </a-layout-sider>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/stores/route'
import Logo from './logo/index.vue'
import Menu from './meun/index.vue'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  collapsed: Boolean
})

const localCollapsed = ref<boolean>(false)
watch(
  () => props.collapsed,
  (value) => {
    localCollapsed.value = value
  }
)
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
