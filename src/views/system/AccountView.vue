<template>
  <div class="account">
    <div>
      <a-button type="primary" @click="showModal">新增账户</a-button>
      <DraggableModal ref="modalRef" v-model:open="open" title="新增账户" @ok="handleOk">
        <a-form
          ref="formRef"
          :model="formState"
          :rules="rules"
          v-bind="layout"
          name="form_in_modal"
        >
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
      </DraggableModal>
    </div>
    <div>
      <Table :columns="columns" :data="userStore.data" :onDelete="Delete" copyKey="token"></Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onBeforeMount, ref, reactive } from 'vue'
import DraggableModal from '@/components/draggable/DraggableView.vue'
import type { FormInstance } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { CreateUserRequest } from '@/types/user'
import Table from '@/components/table/TableView.vue'

const userStore = useUserStore()
const columns = [
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '昵称', dataIndex: 'nickname', key: 'nickname' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '角色', dataIndex: 'role', key: 'role' },
  { title: '操作', key: 'action' }
]

const formRef = ref<FormInstance>()
const formState = reactive<CreateUserRequest>({
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
const open = ref<boolean>(false)
const showModal = () => {
  open.value = true
}
const handleOk = () => {
  formRef.value
    ?.validate()
    .then(async () => {
      // 提交表单数据
      await userStore.addUser(formState)
      // 提交成功后关闭模态框
      open.value = false
      // 清空表单
      formRef.value?.resetFields()
      // 重新获取用户列表
      userStore.getUserList()
    })
    .catch(() => {})
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
}

const Delete = async (record: any) => {
  const { id } = record
  await userStore.deleteUser(id)
  // 删除后重新获取用户列表
  await userStore.getUserList()
}

onBeforeMount(async () => {
  await userStore.getUserList()
})
</script>

<style scoped lang="less">
.account {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
