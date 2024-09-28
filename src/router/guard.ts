import { useAuthStore } from '@/stores/auth'

const Access = async (to: any) => {
  const authStore = useAuthStore()
  if (to.name !== 'Login' && !authStore.isAuthenticated) {
    return { name: 'Login' }
  }
}

const DocumentTitle = (to: any) => {
  document.title = to.meta.title || 'Vue'
}

export { Access, DocumentTitle }
