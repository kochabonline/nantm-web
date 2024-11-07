<template>
  <div>
    <a-button type="primary" @click="showModal">新增角色</a-button>
    <Modal title="新增角色" :open="open" @ok="handleOk" @cancel="handleCancel">
      <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout" name="form_in_modal">
        <a-form-item name="name" label="角色名称">
          <a-input v-model:value="formState.name" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="description" label="描述">
          <a-textarea v-model:value="formState.description" placeholder="请输入" />
        </a-form-item>
        菜单权限：
        <!-- <a-tree
          v-model:checkedKeys="menuCheckedKeys"
          checkable
          :tree-data="menuStore.treeMenu"
          :field-names="fieldNames"
          @check="onCheck"
        ></a-tree> -->
        <Tree
          :checkedKeys="menuCheckedKeys"
          :treeData="menuStore.treeMenu"
          :fieldNames="fieldNames"
        />
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
import { reactive, ref, watch } from 'vue'
import { useMenuStore } from '@/stores/menu'
import Tree from '@/components/tree/index.vue'

const roleStore = useRoleStore()
const menuStore = useMenuStore()

const menuCheckedKeys = ref<string[]>([])
const fieldNames = {
  key: 'id'
}

watch(menuCheckedKeys, () => {
  console.log('menuCheckedKeys', menuCheckedKeys.value)
})
const onCheck = (checkedKeys: string[], info: any) => {
  const { halfCheckedKeys } = info
  console.log('checkedKeys', checkedKeys)
  console.log('halfCheckedKeys', halfCheckedKeys)
}

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
      // await roleStore.addRole(formState)
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
