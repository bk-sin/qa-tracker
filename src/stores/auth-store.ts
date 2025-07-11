import { create } from 'zustand'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signup: (email: string, password: string, name?: string) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  
  setUser: (user) => 
    set({ 
      user, 
      isAuthenticated: !!user,
      isLoading: false 
    }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      // TODO: Implement login logic with Supabase Auth
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      // if (error) throw error
      // set({ user: data.user, isAuthenticated: true, isLoading: false })
      console.log('Login:', email, password)
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },
  
  logout: async () => {
    set({ isLoading: true })
    try {
      // TODO: Implement logout logic with Supabase Auth
      // await supabase.auth.signOut()
      set({ user: null, isAuthenticated: false, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },
  
  signup: async (email: string, password: string, name?: string) => {
    set({ isLoading: true })
    try {
      // TODO: Implement signup logic with Supabase Auth
      // const { data, error } = await supabase.auth.signUp({ email, password })
      // if (error) throw error
      console.log('Signup:', email, password, name)
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },
}))
