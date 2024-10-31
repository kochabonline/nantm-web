<template>
  <a-layout-header style="background: #fff; padding: 0; height: 49.2px">
    <div class="layout-header">
      <menu-unfold-outlined v-if="props.collapsed" class="trigger" @click="onClick" />
      <menu-fold-outlined v-else class="trigger" @click="onClick" />
      <div class="header">
        <Breadcrumb />
        <Toolbar />
      </div>
    </div>
  </a-layout-header>
  <div style="height: 30px">
    <Tabs />
  </div>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import Breadcrumb from './breadcrumb/index.vue'
import Toolbar from './toolbar/index.vue'
import Tabs from './tabs/index.vue'

const props = defineProps({
  collapsed: Boolean
})
const emit = defineEmits(['onCollapsed'])

const onClick = () => {
  emit('onCollapsed')
}
</script>

<style scoped lang="less">
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.layout-header {
  display: flex;
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center; /* 垂直居中 */
    height: 100%;
    width: 100%;
    margin-right: 24px;
  }
}
:deep(.ant-tabs-nav) {
  height: 30px;
}
</style>
