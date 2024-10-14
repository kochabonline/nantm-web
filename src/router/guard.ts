import { useAuthStore } from '@/stores/auth'

const Access = async (to: any) => {
  const authStore = useAuthStore()  
  if (to.name !== 'Login' && !authStore.isAuthenticated) {
    return { name: 'Login' }
  }
}

const Fetch = async () => {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated && !authStore.isFetchUserInfo) {
    authStore.getUserInfo()
  }
}

const DocumentTitle = (to: any) => {
  document.title = to.meta.title || 'Vue'
}

export { Access, Fetch, DocumentTitle }
