<template>
  <div>
    <a-button type="primary" @click="showModal">新增接口</a-button>
    <Modal title="新增接口" :open="open" @ok="handleOk" @cancel="handleCancel">
      <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout" name="form_in_modal">
        <a-form-item name="name" label="名称">
          <a-input v-model:value="formState.name" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="path" label="路径">
          <a-input v-model:value="formState.path" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="method" label="请求方法">
          <a-select
            v-model:value="formState.method"
            show-search
            style="width: 100%"
            :options="filteredOptions.map((item) => ({ value: item }))"
            :showArrow="false"
          ></a-select>
        </a-form-item>
        <a-form-item name="group" label="组">
          <a-input v-model:value="formState.group" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="description" label="描述">
          <a-input v-model:value="formState.description" placeholder="请输入" />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import Modal from '@/components/modal/index.vue'
import { useApiStore } from '@/stores/api'
import type { CreateApiRequest } from '@/types/api'
import type { PaginationRequest } from '@/types/request'

const apiStore = useApiStore()

const formRef = ref<FormInstance>()
const formState = reactive<CreateApiRequest>({
  name: '',
  path: '',
  method: '',
  description: '',
  group: ''
})
const rules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  path: [{ required: true, message: '请输入路径', trigger: 'blur' }],
  method: [{ required: true, message: '请选择请求方法', trigger: 'change' }],
  group: [{ message: '请输入组', trigger: 'blur' }],
  description: [{ message: '请输入描述', trigger: 'blur' }]
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const OPTIONS = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
const selectedItems = ref<string[]>([])
const filteredOptions = computed(() => OPTIONS.filter((o) => !selectedItems.value.includes(o)))

const open = ref(false)
const showModal = () => {
  open.value = true
}
const handleCancel = () => {
  open.value = false
}
const handleOk = () => {
  formRef.value
    ?.validate()
    .then(async () => {
      // 提交表单
      await apiStore.addApi(formState)
      // 关闭模态框
      open.value = false
      // 清空表单
      formRef.value?.resetFields()
      // 刷新列表
      const req: PaginationRequest = {
        page: 0,
        size: 0,
        keyword: ''
      }
      await apiStore.getApis(req)
    })
    .catch(() => {})
}
</script>

<style scoped lang="less"></style>
