<template>
  <div>
    <a-button v-if="!props.isUpdate && !props.record" type="primary" @click="showModal"
      >新增账户</a-button
    >
    <Modal
      :title="props.isUpdate ? '编辑账户' : '新增账户'"
      :open="open"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout" name="form_in_modal">
        <a-form-item name="username" label="用户名">
          <a-input v-model:value="formState.username" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="password" label="密码">
          <a-input-password v-model:value="formState.password" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="nickname" label="昵称">
          <a-input v-model:value="formState.nickname" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="email" label="邮箱">
          <a-input v-model:value="formState.email" placeholder="请输入" />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import Modal from '@/components/modal/index.vue'
import type { FormInstance } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { UserRequest } from '@/types/user'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  isUpdate: Boolean,
  record: Object
})
const emit = defineEmits(['reset'])

const userStore = useUserStore()

const formRef = ref<FormInstance>()
const formState = reactive<UserRequest>({
  username: '',
  nickname: '',
  password: '',
  email: '',
  role: ''
})
const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
}

const open = ref<boolean>(false)
const showModal = () => {
  open.value = true
}
const handleCancel = () => {
  open.value = false
  emit('reset')
}
const handleOk = () => {
  formRef.value
    ?.validate()
    .then(async () => {
      if (props.isUpdate) {
        await userStore.updateUser(props.record?.id, formState)
        open.value = false
        emit('reset')
      } else {
        // 提交表单数据
        await userStore.addUser(formState)
        // 提交成功后关闭模态框
        open.value = false
        // 清空表单
        formRef.value?.resetFields()
        // 重新获取用户列表
        await userStore.getUsers()
      }
    })
    .catch(() => {})
}

// 如果是更新操作，将record的值赋给formState
watch(
  () => props.record,
  (record) => {
    if (props.isUpdate && record) {
      Object.assign(formState, record)
      open.value = true
    }
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="less"></style>
