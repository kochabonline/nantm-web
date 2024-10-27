<template>
  <div>
    <a-button type="primary" @click="showModal">新增角色</a-button>
    <Modal title="新增角色" :open="open" @ok="handleOk" @cancel="handleCancel">
      <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout" name="form_in_modal">
        <a-form-item name="name" label="角色名">
          <a-input v-model:value="formState.name" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="description" label="描述">
          <a-textarea v-model:value="formState.description" placeholder="请输入" />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Modal from '@/components/modal/index.vue'
import { useRoleStore } from '@/stores/role'
import type { CreateRoleRequest } from '@/types/role'
import type { PaginationRequest } from '@/types/request'
import type { FormInstance } from 'ant-design-vue'
import { reactive, ref } from 'vue'

const roleStore = useRoleStore()

const formRef = ref<FormInstance>()
const formState = reactive<CreateRoleRequest>({
  name: '',
  description: ''
})
const rules = {
  name: [{ required: true, message: '请输入角色名' }]
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
}

const open = ref(false)
const showModal = () => {
  open.value = true
}
const handleOk = () => {
  formRef.value
    ?.validate()
    .then(async () => {
      // 提交表单数据
      await roleStore.addRole(formState)
      open.value = false
      // 清空表单
      formRef.value?.resetFields()
      // 刷新表格
      await roleStore.getRoles({} as PaginationRequest)
    })
    .catch(() => {})
}
const handleCancel = () => {
  open.value = false
}
</script>

<style scoped lang="less"></style>
