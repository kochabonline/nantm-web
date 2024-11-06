<template>
  <div class="account">
    <div>
      <a-button type="primary" @click="showModal">新增通道</a-button>
      <Modal :open="open" title="新增通道" @ok="handleOk" @cancel="handleCancel">
        <div>
          <a-form
            ref="formRef"
            :model="formState"
            :rules="rules"
            v-bind="layout"
            name="form_in_modal"
          >
            <a-form-item name="name" label="通道名称">
              <a-input v-model:value="formState.name" placeholder="请输入" />
            </a-form-item>
            <a-form-item name="provider" label="提供商">
              <a-segmented v-model:value="providerValue" :options="provider" />
            </a-form-item>
            <a-form
              v-if="providerValue === '邮箱'"
              ref="emailFormRef"
              :model="emailFormState"
              :rules="emailRules"
              v-bind="innerlayout"
            >
              <a-form-item name="username" label="账户">
                <a-input v-model:value="emailFormState.username" placeholder="请输入" />
              </a-form-item>
              <a-form-item name="password" label="密码">
                <a-input v-model:value="emailFormState.password" placeholder="请输入" />
              </a-form-item>
              <a-form-item name="host" label="主机">
                <a-input v-model:value="emailFormState.host" placeholder="请输入" />
              </a-form-item>
              <a-form-item name="port" label="端口">
                <a-input-number v-model:value="emailFormState.port" :controls="false" />
              </a-form-item>
            </a-form>
            <a-form
              v-if="providerValue === '短信'"
              ref="smsFormRef"
              :model="smsFormState"
              :rules="smsRules"
              v-bind="innerlayout"
            >
              <a-form-item name="access_key" label="access key">
                <a-input v-model:value="smsFormState.access_key" placeholder="请输入" />
              </a-form-item>
              <a-form-item name="secret" label="secret">
                <a-input v-model:value="smsFormState.secret" placeholder="请输入" />
              </a-form-item>
              <a-form-item name="sign_name" label="签名">
                <a-input v-model:value="smsFormState.sign_name" placeholder="请输入" />
              </a-form-item>
              <a-form-item name="template_code" label="模板">
                <a-input v-model:value="smsFormState.template_code" placeholder="请输入" />
              </a-form-item>
            </a-form>
            <a-form
              v-if="providerValue === '钉钉'"
              ref="dingtalkFormRef"
              :model="dingtalkFormState"
              :rules="dingtalkRules"
              v-bind="innerlayout"
            >
              <a-form-item name="webhook" label="webhook">
                <a-input v-model:value="dingtalkFormState.webhook" placeholder="请输入" />
              </a-form-item>
              <a-form-item name="secret" label="secret">
                <a-input v-model:value="dingtalkFormState.secret" placeholder="请输入" />
              </a-form-item>
            </a-form>
            <a-form
              v-if="providerValue === '飞书'"
              ref="feishuFormRef"
              :model="feishuFormState"
              :rules="feishuRules"
              v-bind="innerlayout"
            >
              <a-form-item name="webhook" label="webhook">
                <a-input v-model:value="feishuFormState.webhook" placeholder="请输入" />
              </a-form-item>
              <a-form-item name="secret" label="secret">
                <a-input v-model:value="feishuFormState.secret" placeholder="请输入" />
              </a-form-item>
            </a-form>
            <a-form
              v-if="providerValue === 'Telegram'"
              ref="telegramFormRef"
              :model="telegramFormState"
              :rules="telegramRules"
              v-bind="innerlayout"
            >
              <a-form-item name="token" label="token">
                <a-input v-model:value="telegramFormState.token" placeholder="请输入" />
              </a-form-item>
              <a-form-item name="chat_id" label="chat id">
                <a-input-number v-model:value="telegramFormState.chat_id" :controls="false" />
              </a-form-item>
            </a-form>
            <a-form-item name="limiter" label="限速器">
              <a-segmented v-model:value="limiterValue" :options="limiter" />
            </a-form-item>
            <a-form
              v-if="limiterValue === '令牌桶'"
              ref="tokenBucketLimiterFormRef"
              :model="tokenBucketLimiterFormState"
              :rules="tokenBucketLimiterRules"
              v-bind="innerlayout"
            >
              <a-form-item name="capacity" label="容量大小">
                <a-input-number
                  v-model:value="tokenBucketLimiterFormState.capacity"
                  :controls="false"
                />
              </a-form-item>
              <a-form-item name="rate" label="速率大小">
                <a-input-number
                  v-model:value="tokenBucketLimiterFormState.rate"
                  :controls="false"
                />
              </a-form-item>
            </a-form>
            <a-form
              v-if="limiterValue === '滑动窗口'"
              ref="slidingWindowLimiterFormRef"
              :model="slidingWindowLimiterFormState"
              :rules="slidingWindowLimiterRules"
              v-bind="innerlayout"
            >
              <a-form-item name="window" label="窗口大小">
                <a-input-number
                  v-model:value="slidingWindowLimiterFormState.window"
                  :controls="false"
                />
              </a-form-item>
              <a-form-item name="limit" label="窗口限制">
                <a-input-number
                  v-model:value="slidingWindowLimiterFormState.limit"
                  :controls="false"
                />
              </a-form-item>
            </a-form>
            <a-form-item name="description" label="描述">
              <a-textarea
                v-model:value="formState.description"
                placeholder="请输入"
                :autoSize="{ minRows: 2, maxRows: 6 }"
              />
            </a-form-item>
          </a-form>
        </div>
      </Modal>
    </div>
    <div>
      <Table
        :columns="columns"
        :data-source="data"
        :clipboard="{ keys: ['token'] }"
        :action="{ onDelete: Delete }"
      ></Table>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Channel'
})
import { onBeforeMount, ref, reactive, computed } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import Modal from '@/components/modal/index.vue'
import Table from '@/components/table/index.vue'
import { useMessageStore } from '@/stores/message'

const messageStore = useMessageStore()

const providerMap: Record<string, string> = {
  邮箱: 'email',
  短信: 'sms',
  钉钉: 'dingtalk',
  飞书: 'feishu',
  Telegram: 'telegram'
}
const limiterMap: Record<string, string> = {
  无限制: '',
  令牌桶: 'token_bucket',
  滑动窗口: 'sliding_window'
}
const provider = reactive(['邮箱', '短信', '钉钉', '飞书', 'Telegram'])
const limiter = reactive(['无限制', '令牌桶', '滑动窗口'])
const providerValue = ref(provider[0])
const limiterValue = ref(limiter[0])

const data = computed(() => messageStore.channels.items || [])
const columns = [
  { title: '通道名称', dataIndex: 'name', key: 'name', ellipsis: true },
  { title: '提供商', dataIndex: 'provider', key: 'provider' },
  { title: '限速器', dataIndex: 'limiter', key: 'limiter' },
  { title: '密钥', dataIndex: 'token', key: 'token' },
  { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true, maxWidth: 24 },
  { title: '操作', key: 'action' }
]

const formRef = ref<FormInstance>()
const formState = reactive({
  name: '',
  provider: '',
  channelProvider: '',
  limiter: '',
  channelLimiter: '',
  description: ''
})
const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入通道名称' }]
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
}

interface emailProvider {
  username: string
  password: string
  host: string
  port: number
}
const emailFormRef = ref<FormInstance>()
const emailFormState = reactive<emailProvider>({
  username: '',
  password: '',
  host: '',
  port: 25
})
const emailRules: Record<string, Rule[]> = {
  username: [{ required: true, message: '请输入邮件服务账号' }],
  password: [{ required: true, message: '请输入邮件服务密码' }],
  host: [{ required: true, message: '请输入邮件服务主机' }]
}

interface smsProvider {
  access_key: string
  secret: string
  sign_name: string
  template_code: string
}
const smsFormRef = ref<FormInstance>()
const smsFormState = reactive<smsProvider>({
  access_key: '',
  secret: '',
  sign_name: '',
  template_code: ''
})
const smsRules: Record<string, Rule[]> = {
  access_key: [{ required: true, message: '请输入短信access key' }],
  secret: [{ required: true, message: '请输入短信secret' }]
}

interface feishuProvider {
  webhook: string
  secret: string
}
const feishuFormRef = ref<FormInstance>()
const feishuFormState = reactive<feishuProvider>({
  webhook: '',
  secret: ''
})
const feishuRules: Record<string, Rule[]> = {
  webhook: [{ required: true, message: '请输入飞书机器人Webhook' }]
}

interface telegramProvider {
  token: string
  chat_id: string
}
const telegramFormRef = ref<FormInstance>()
const telegramFormState = reactive<telegramProvider>({
  token: '',
  chat_id: ''
})
const telegramRules: Record<string, Rule[]> = {
  token: [{ required: true, message: '请输入Telegram Bot Token' }],
  chat_id: [{ required: true, message: '请输入Telegram Chat ID' }]
}

interface dingtalkProvider {
  webhook: string
  secret: string
}
const dingtalkFormRef = ref<FormInstance>()
const dingtalkFormState = reactive<dingtalkProvider>({
  webhook: '',
  secret: ''
})
const dingtalkRules: Record<string, Rule[]> = {
  webhook: [{ required: true, message: '请输入钉钉机器人Webhook' }]
}

interface tokenBucketLimiter {
  capacity: string
  rate: string
}
const tokenBucketLimiterFormRef = ref<FormInstance>()
const tokenBucketLimiterFormState = reactive<tokenBucketLimiter>({
  capacity: '',
  rate: ''
})
const tokenBucketLimiterRules: Record<string, Rule[]> = {
  capacity: [{ required: true, message: '请输入容量' }, { validator: validateGTZero }],
  rate: [{ required: true, message: '请输入速率' }, { validator: validateGTZero }]
}

interface slidingWindowLimiter {
  window: string
  limit: string
}
const slidingWindowLimiterFormRef = ref<FormInstance>()
const slidingWindowLimiterFormState = reactive<slidingWindowLimiter>({
  window: '',
  limit: ''
})
const slidingWindowLimiterRules: Record<string, Rule[]> = {
  window: [{ required: true, message: '请输入窗口大小' }, { validator: validateGTZero }],
  limit: [{ required: true, message: '请输入限制大小' }, { validator: validateGTZero }]
}

function validateGTZero(rule: any, value: number) {
  return new Promise<void>((resolve, reject) => {
    if (value > 0) {
      resolve()
    } else {
      reject('值必须大于0')
    }
  })
}

const innerlayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}
const open = ref<boolean>(false)
const showModal = () => {
  open.value = true
}
const handleCancel = () => {
  open.value = false
}
const handleOk = () => {
  const validateForms = async () => {
    try {
      const validator = []
      // 主表单
      validator.push(formRef.value?.validate())
      // 子表单
      switch (providerValue.value) {
        case '邮箱':
          validator.push(emailFormRef.value?.validate())
          formState.channelProvider = JSON.stringify(emailFormState)
          break
        case '短信':
          validator.push(smsFormRef.value?.validate())
          formState.channelProvider = JSON.stringify(smsFormState)
          break
        case '钉钉':
          validator.push(dingtalkFormRef.value?.validate())
          formState.channelProvider = JSON.stringify(dingtalkFormState)
          break
        case '飞书':
          validator.push(feishuFormRef.value?.validate())
          formState.channelProvider = JSON.stringify(feishuFormState)
          break
        case 'Telegram':
          validator.push(telegramFormRef.value?.validate())
          formState.channelProvider = JSON.stringify(telegramFormState)
          break
        default:
          break
      }
      switch (limiterValue.value) {
        case '令牌桶':
          validator.push(tokenBucketLimiterFormRef.value?.validate())
          formState.channelLimiter = JSON.stringify(tokenBucketLimiterFormState)
          break
        case '滑动窗口':
          validator.push(slidingWindowLimiterFormRef.value?.validate())
          formState.channelLimiter = JSON.stringify(slidingWindowLimiterFormState)
          break
        default:
          break
      }
      // 验证表单
      await Promise.all(validator)

      // 组装数据
      const data = {
        name: formState.name,
        provider: providerMap[providerValue.value],
        channel_provider: formState.channelProvider,
        limiter: limiterMap[limiterValue.value],
        channel_limiter: formState.channelLimiter,
        description: formState.description
      }

      // 提交表单数据
      await messageStore.addChannel(data)

      // 提交成功后关闭模态框
      open.value = false
      // 提交成功后重新获取通道列表
      await messageStore.getChannels()

      // 清空表单
      formRef.value?.resetFields()
      resetSubForms()
    } catch (error) {
      /* do nothing */
    }
  }

  const resetSubForms = () => {
    switch (providerValue.value) {
      case '邮箱':
        emailFormRef.value?.resetFields()
        break
      case '短信':
        smsFormRef.value?.resetFields()
        break
      case '钉钉':
        dingtalkFormRef.value?.resetFields()
        break
      case '飞书':
        feishuFormRef.value?.resetFields()
        break
      case 'Telegram':
        telegramFormRef.value?.resetFields()
        break
      default:
        break
    }
    switch (limiterValue.value) {
      case '令牌桶':
        tokenBucketLimiterFormRef.value?.resetFields()
        break
      case '滑动窗口':
        slidingWindowLimiterFormRef.value?.resetFields()
        break
      default:
        break
    }
  }

  validateForms()
}

const Delete = async (record: any) => {
  const { token } = record
  await messageStore.deleteChannel({ token })
  // 删除后重新获取通道列表
  await messageStore.getChannels()
}

onBeforeMount(async () => {
  await messageStore.getChannels()
})
</script>

<style scoped lang="less">
.account {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
