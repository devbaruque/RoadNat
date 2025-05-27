import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const auth = {
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: () => {
    return supabase.auth.getUser()
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helpers
export const db = {
  // Users
  getUserProfile: async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  updateUserProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },

  // Progress
  getUserProgress: async (userId) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        *,
        roadmap_topics (
          id,
          title,
          description,
          category_id,
          difficulty_level,
          xp_reward
        )
      `)
      .eq('user_id', userId)
    return { data, error }
  },

  updateProgress: async (userId, topicId, progressData) => {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        topic_id: topicId,
        ...progressData
      })
      .select()
    return { data, error }
  },

  // Topics
  getTopics: async () => {
    const { data, error } = await supabase
      .from('roadmap_topics')
      .select(`
        *,
        categories (
          id,
          name,
          color,
          icon
        )
      `)
      .order('order_index')
    return { data, error }
  },

  getTopicById: async (topicId) => {
    const { data, error } = await supabase
      .from('roadmap_topics')
      .select(`
        *,
        categories (
          id,
          name,
          color,
          icon
        )
      `)
      .eq('id', topicId)
      .single()
    return { data, error }
  },

  // Game Sessions
  saveGameSession: async (sessionData) => {
    const { data, error } = await supabase
      .from('game_sessions')
      .insert(sessionData)
      .select()
    return { data, error }
  },

  // Achievements
  getUserAchievements: async (userId) => {
    const { data, error } = await supabase
      .from('user_achievements')
      .select(`
        *,
        achievements (
          id,
          name,
          description,
          icon,
          xp_reward
        )
      `)
      .eq('user_id', userId)
    return { data, error }
  }
} 