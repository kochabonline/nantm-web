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

interface TreeApi extends Api {
  children: TreeApi[]
}

interface ApiRequest extends api {}

export type { Api, Apis, TreeApi, ApiRequest }
