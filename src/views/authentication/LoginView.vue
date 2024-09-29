<template>
  <div class="login">
    <a-card style="width: 300px">
      <h1 style="text-align: center">登录</h1>
      <a-form
        :model="formState"
        name="login"
        class="login-form"
        :rules="rules"
        :loading="authStore.loading"
        @finish="onFinish"
      >
        <a-form-item name="username">
          <a-input v-model:value="formState.username" size="large" placeholder="用户名" />
        </a-form-item>

        <a-form-item name="password">
          <a-input-password v-model:value="formState.password" size="large" placeholder="密码" />
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember"> 记住我 </a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href=""> 忘记密码? </a>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button"> 登录 </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import type { Rule } from 'ant-design-vue/es/form'
import { reactive } from 'vue'

interface FormState {
  username: string
  password: string
  remember: boolean
}
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
})

const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
}

const authStore = useAuthStore()

const onFinish = (values: FormState) => {
  authStore.login(values)
}
</script>

<style scoped lang="less">
.login {
  display: flex;
  width: 350px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login-form-forgot {
  float: right;
}

.login-form-button {
  width: 100%;
}
</style>
