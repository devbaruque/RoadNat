import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../services/supabase'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { user } } = await auth.getCurrentUser()
      setUser(user)
      
      if (user) {
        await loadUserProfile(user.id)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await loadUserProfile(session.user.id)
      } else {
        setUserProfile(null)
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (userId) => {
    try {
      const { data, error } = await db.getUserProfile(userId)
      if (error) throw error
      setUserProfile(data)
    } catch (error) {
      console.error('Error loading user profile:', error)
      toast.error('Erro ao carregar perfil do usuário')
    }
  }

  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true)
      const { data, error } = await auth.signUp(email, password, userData)
      
      if (error) throw error
      
      toast.success('Conta criada com sucesso! Verifique seu email.')
      return { data, error: null }
    } catch (error) {
      console.error('Error signing up:', error)
      toast.error(error.message || 'Erro ao criar conta')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const { data, error } = await auth.signIn(email, password)
      
      if (error) throw error
      
      toast.success('Login realizado com sucesso!')
      return { data, error: null }
    } catch (error) {
      console.error('Error signing in:', error)
      toast.error(error.message || 'Erro ao fazer login')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await auth.signOut()
      
      if (error) throw error
      
      toast.success('Logout realizado com sucesso!')
      return { error: null }
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error(error.message || 'Erro ao fazer logout')
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error('Usuário não autenticado')
      
      const { data, error } = await db.updateUserProfile(user.id, updates)
      
      if (error) throw error
      
      setUserProfile(data)
      toast.success('Perfil atualizado com sucesso!')
      return { data, error: null }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error(error.message || 'Erro ao atualizar perfil')
      return { data: null, error }
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    loadUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 