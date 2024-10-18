<template>
  <div>
    <a-button type="primary" @click="showModal">新增权限</a-button>
    <Draggable v-model:open="open" title="新增权限" @ok="handleOk">
      <a-form ref="formRef" name="dynamic_form" :model="dynamicValidateForm">
        <a-space
          v-for="(policy, index) in dynamicValidateForm.policies"
          :key="policy.id"
          style="display: flex; margin-bottom: 8px"
          align="baseline"
        >
          <a-form-item
            :name="['policies', index, 'role']"
            label="角色"
            :rules="{
              required: true,
              message: 'Missing role'
            }"
          >
            <a-input v-model:value="policy.role" placeholder="请输入" />
          </a-form-item>
          <a-form-item
            :name="['policies', index, 'path']"
            label="路径"
            :rules="{
              required: true,
              message: 'Missing path'
            }"
          >
            <a-input v-model:value="policy.path" placeholder="请输入" />
          </a-form-item>
          <a-form-item
            :name="['policies', index, 'method']"
            label="方法"
            :rules="{
              required: true,
              message: 'Missing method'
            }"
          >
            <a-input v-model:value="policy.method" placeholder="请输入" />
          </a-form-item>
          <MinusCircleOutlined @click="remove(policy)" />
        </a-space>
        <a-form-item :wrapperCol="{ span: 4 }">
          <a-button type="dashed" block @click="add">
            <PlusOutlined />
            添加
          </a-button>
        </a-form-item>
      </a-form>
    </Draggable>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'
import Draggable from '@/components/draggable/index.vue'

interface Policy {
  role: string
  path: string
  method: string
  id: number
}

const open = ref(false)
const showModal = () => {
  open.value = true
}

const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{ policies: Policy[] }>({ policies: [] })

const add = () => {
  dynamicValidateForm.policies.push({
    role: '',
    path: '',
    method: '',
    id: Date.now()
  })
}
const remove = (item: Policy) => {
  const index = dynamicValidateForm.policies.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.policies.splice(index, 1)
  }
}
const handleOk = () => {
  formRef.value
    ?.validate()
    .then(() => {
      console.log('dynamicValidateForm:', dynamicValidateForm)
      // 提交表单
    })
    .catch(() => {
      /** empty */
    })
}
</script>

<style scoped lang="less"></style>
