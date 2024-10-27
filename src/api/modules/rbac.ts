import type { Policy } from '@/types/rbac'
import { request } from '../request'

const AddPolicy = (data: Policy) => request.post<Response>('/api/v1/rbac/policy', data)

export { AddPolicy }
