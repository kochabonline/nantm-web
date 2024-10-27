import type { Meta } from './common'

/**
 * api 数据结构
 */
interface api {
  name: string
  path: string
  method: string
  description: string
  group: string
}

interface Api extends api, Meta {
  key: string
}

interface Apis {
  total: number
  items: Api[]
}

interface CreateApiRequest extends api {}

export type { Api, Apis, CreateApiRequest }
