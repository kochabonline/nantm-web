<template>
  <a-dropdown :trigger="['click']">
    <a-avatar
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIGWg2HXqvp2BYhqD9JSoWRUc9pdKpKGbQ3w&s"
    />
    <template #overlay>
      <a-menu @click="onClick">
        <div class="menu-item-center">
          <div style="display: flex; justify-content: space-between; align-items: center">
            <a-avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIGWg2HXqvp2BYhqD9JSoWRUc9pdKpKGbQ3w&s"
              size="large"
            />
            <div style="display: flex; flex-direction: column; margin-left: 10px">
              <div>
                <h4>{{ userStore.userInfo.username }}</h4>
              </div>
              <div style="font-size: 0.8em; color: #999">{{ userStore.userInfo.email }}</div>
            </div>
          </div>
        </div>
        <a-menu-divider />
        <a-menu-item key="Logout" :icon="iconComponent('icon-exit')"> 退出登录 </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <!-- 快捷键: Alt + Q 退出登录 -->
  <ShortcutView
    :alt-key="true"
    shortcutKey="q"
    :callback="authStore.logout"
    content="是否确认退出?"
  ></ShortcutView>
</template>

<script setup lang="ts">
import router from '@/router'

import type { MenuProps } from 'ant-design-vue'
import { iconComponent } from '@/utils/icon'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import ShortcutView from './ShortcutView.vue'

const authStore = useAuthStore()
const userStore = useUserStore()

const onClick: MenuProps['onClick'] = async ({ key }) => {
  if (key === 'Logout') {
    await authStore.logout()
  } else {
    router.push({ name: `${key}` })
  }
}
</script>

<style scoped lang="less">
.menu-item-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
