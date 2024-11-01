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
        <a-form-item name="name" label="菜单名称">
          <a-input v-model:value="formState.name" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="parent" label="父级菜单">
          <a-tree-select
            v-model:value="formState.parent"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择"
            allow-clear
            :tree-data="routeStore.getTreeMenus"
            tree-node-filter-prop="label"
          ></a-tree-select>
        </a-form-item>
        <a-form-item name="path" label="路由地址">
          <a-input v-model:value="formState.path" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="component" label="组件">
          <a-input v-model:value="formState.component" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="title" label="标题">
          <a-input v-model:value="formState.title" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="icon" label="图标">
          <a-input v-model:value="formState.icon" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="hidden" label="是否隐藏">
          <a-select
            ref="select"
            v-model:value="hidden"
            show-search
            style="width: 100%"
            :options="selectOptions"
            :showArrow="false"
            @change="
              (e: string) => {
                formState.hidden = e === 'true'
              }
            "
          />
        </a-form-item>
        <a-form-item name="keepAlive" label="是否缓存">
          <a-select
            ref="select"
            v-model:value="keepAlive"
            show-search
            style="width: 100%"
            :options="selectOptions"
            :showArrow="false"
            @change="
              (e: string) => {
                formState.keepAlive = e === 'true'
              }
            "
          />
        </a-form-item>
        <a-form-item name="order" label="排序">
          <a-input-number v-model:value="formState.order" :controls="false" />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { message, type FormInstance, type SelectProps } from 'ant-design-vue'
import { debounce } from 'lodash'
import Modal from '@/components/modal/index.vue'
import type { PaginationRequest } from '@/types/request'
import type { MenuRequest } from '@/types/menu'
import { useMenuStore } from '@/stores/menu'
import { useRouteStore } from '@/stores/route'

const props = defineProps({
  isUpdate: Boolean,
  record: Object
})
const emit = defineEmits(['reset'])

const routeStore = useRouteStore()
const menuStore = useMenuStore()

const formRef = ref<FormInstance>()
const formState = reactive<MenuRequest>({
  parent: '',
  name: '',
  path: '',
  component: '',
  redirect: '',
  icon: '',
  hidden: false,
  keepAlive: false,
  title: '',
  order: ''
})
const rules = {
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  path: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  icon: [{ required: true, message: '请输入图标', trigger: 'blur' }],
  order: [{ type: 'number', message: '排序只能是数字', trigger: 'blur' }]
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const selectOptions = ref<SelectProps['options']>([
  { label: '是', value: 'true' },
  { label: '否', value: 'false' }
])
const hidden = ref('否')
const keepAlive = ref('否')

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
      console.log(formState)
    })
    .catch(() => {})
}, 150)

const refresh = async () => {
  const req: PaginationRequest = {
    page: 0,
    size: 0,
    keyword: ''
  }
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
