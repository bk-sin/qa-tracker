import { useAuthStore } from '@/stores/auth-store'

export const useAuth = () => {
  const {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setLoading,
    login,
    logout,
    signup,
  } = useAuthStore()

  return {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setLoading,
    login,
    logout,
    signup,
  }
}
