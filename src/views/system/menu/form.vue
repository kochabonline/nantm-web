<template>
  <div>
    <a-button v-if="!props.isUpdate && !props.record" type="primary" @click="showModal"
      >新增菜单</a-button
    >
    <Modal
      :title="props.isUpdate ? '编辑菜单' : '新增菜单'"
      :open="open"
      @ok="handleOk"
      @cancel="handleCancel"
    >
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
import { computed, reactive, ref, watch } from 'vue'
import { message, type FormInstance } from 'ant-design-vue'
import { debounce } from 'lodash'
import Modal from '@/components/modal/index.vue'
import { useApiStore } from '@/stores/api'
import type { ApiRequest } from '@/types/api'
import type { PaginationRequest } from '@/types/request'

const props = defineProps({
  isUpdate: Boolean,
  record: Object
})
const emit = defineEmits(['reset'])

const apiStore = useApiStore()

const formRef = ref<FormInstance>()
const formState = reactive<ApiRequest>({
  name: '',
  path: '',
  method: '',
  description: '',
  group: ''
})
const rules = {
  parent_id: [{ required: true, message: '请选择父级菜单', trigger: 'change' }]
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
  emit('reset')
}
const handleOk = debounce(() => {
  formRef.value
    ?.validate()
    .then(async () => {
      if (props.isUpdate) {
        const isDifferent = (Object.keys(formState) as (keyof ApiRequest)[]).some(
          (key) => formState[key] !== props.record?.[key]
        )
        if (isDifferent) {
          await apiStore.updateApi(props.record?.id, formState)
          // 关闭模态框
          open.value = false
          emit('reset')
          // 刷新列表
          await refresh()
        } else {
          message.info('数据未发生变化')
        }
      } else {
        // 提交表单
        await apiStore.addApi(formState)
        // 关闭模态框
        open.value = false
        // 清空表单
        formRef.value?.resetFields()
        // 刷新列表
        await refresh()
      }
    })
    .catch(() => {})
}, 150)

const refresh = async () => {
  const req: PaginationRequest = {
    page: 0,
    size: 0,
    keyword: ''
  }
  await apiStore.getApis(req)
}

/** 如果是编辑模式, 初始化表单 */
watch(
  () => props.record,
  (record) => {
    if (props.isUpdate && record) {
      Object.assign(formState, record)
      open.value = true
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="less"></style>
