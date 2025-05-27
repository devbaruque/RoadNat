// Dados das conquistas e badges do sistema de gamificação

export const achievementTypes = {
  COMPLETION: 'completion',
  STREAK: 'streak',
  XP: 'xp',
  CATEGORY: 'category',
  SPEED: 'speed',
  DEDICATION: 'dedication'
}

export const achievements = [
  // Conquistas de Conclusão
  {
    id: 'first-topic',
    name: 'Primeiro Passo',
    description: 'Complete seu primeiro tópico',
    icon: '🎯',
    type: achievementTypes.COMPLETION,
    requirement: { type: 'topics_completed', value: 1 },
    xp_reward: 50,
    rarity: 'common'
  },
  {
    id: 'five-topics',
    name: 'Aprendiz',
    description: 'Complete 5 tópicos',
    icon: '📚',
    type: achievementTypes.COMPLETION,
    requirement: { type: 'topics_completed', value: 5 },
    xp_reward: 100,
    rarity: 'common'
  },
  {
    id: 'ten-topics',
    name: 'Estudioso',
    description: 'Complete 10 tópicos',
    icon: '🎓',
    type: achievementTypes.COMPLETION,
    requirement: { type: 'topics_completed', value: 10 },
    xp_reward: 200,
    rarity: 'uncommon'
  },
  {
    id: 'twenty-topics',
    name: 'Expert',
    description: 'Complete 20 tópicos',
    icon: '🏆',
    type: achievementTypes.COMPLETION,
    requirement: { type: 'topics_completed', value: 20 },
    xp_reward: 500,
    rarity: 'rare'
  },

  // Conquistas de Streak
  {
    id: 'streak-3',
    name: 'Consistente',
    description: 'Mantenha uma sequência de 3 dias',
    icon: '🔥',
    type: achievementTypes.STREAK,
    requirement: { type: 'streak_days', value: 3 },
    xp_reward: 75,
    rarity: 'common'
  },
  {
    id: 'streak-7',
    name: 'Dedicado',
    description: 'Mantenha uma sequência de 7 dias',
    icon: '⚡',
    type: achievementTypes.STREAK,
    requirement: { type: 'streak_days', value: 7 },
    xp_reward: 150,
    rarity: 'uncommon'
  },
  {
    id: 'streak-30',
    name: 'Imparável',
    description: 'Mantenha uma sequência de 30 dias',
    icon: '💎',
    type: achievementTypes.STREAK,
    requirement: { type: 'streak_days', value: 30 },
    xp_reward: 1000,
    rarity: 'legendary'
  },

  // Conquistas de XP
  {
    id: 'xp-500',
    name: 'Iniciante',
    description: 'Acumule 500 XP',
    icon: '⭐',
    type: achievementTypes.XP,
    requirement: { type: 'total_xp', value: 500 },
    xp_reward: 100,
    rarity: 'common'
  },
  {
    id: 'xp-2000',
    name: 'Experiente',
    description: 'Acumule 2000 XP',
    icon: '🌟',
    type: achievementTypes.XP,
    requirement: { type: 'total_xp', value: 2000 },
    xp_reward: 300,
    rarity: 'uncommon'
  },
  {
    id: 'xp-5000',
    name: 'Mestre',
    description: 'Acumule 5000 XP',
    icon: '✨',
    type: achievementTypes.XP,
    requirement: { type: 'total_xp', value: 5000 },
    xp_reward: 500,
    rarity: 'rare'
  },

  // Conquistas de Categoria
  {
    id: 'category-prerequisites',
    name: 'Fundamentos Sólidos',
    description: 'Complete toda a categoria Pré-requisitos',
    icon: '🏗️',
    type: achievementTypes.CATEGORY,
    requirement: { type: 'category_completed', value: 'prerequisites' },
    xp_reward: 300,
    rarity: 'uncommon'
  },
  {
    id: 'category-environment',
    name: 'Ambiente Preparado',
    description: 'Complete toda a categoria Ambiente e Ferramentas',
    icon: '⚙️',
    type: achievementTypes.CATEGORY,
    requirement: { type: 'category_completed', value: 'environment' },
    xp_reward: 250,
    rarity: 'uncommon'
  },
  {
    id: 'category-core',
    name: 'React Native Core',
    description: 'Complete toda a categoria React Native Core',
    icon: '⚛️',
    type: achievementTypes.CATEGORY,
    requirement: { type: 'category_completed', value: 'core' },
    xp_reward: 400,
    rarity: 'rare'
  },

  // Conquistas Especiais
  {
    id: 'speed-learner',
    name: 'Aprendiz Veloz',
    description: 'Complete 3 tópicos em um dia',
    icon: '🚀',
    type: achievementTypes.SPEED,
    requirement: { type: 'topics_per_day', value: 3 },
    xp_reward: 200,
    rarity: 'uncommon'
  },
  {
    id: 'night-owl',
    name: 'Coruja Noturna',
    description: 'Complete um tópico após 22h',
    icon: '🦉',
    type: achievementTypes.DEDICATION,
    requirement: { type: 'late_night_completion', value: 1 },
    xp_reward: 100,
    rarity: 'common'
  },
  {
    id: 'early-bird',
    name: 'Madrugador',
    description: 'Complete um tópico antes das 7h',
    icon: '🐦',
    type: achievementTypes.DEDICATION,
    requirement: { type: 'early_morning_completion', value: 1 },
    xp_reward: 100,
    rarity: 'common'
  }
]

export const badges = [
  {
    id: 'beginner',
    name: 'Iniciante',
    description: 'Primeiros passos no React Native',
    icon: '🌱',
    color: '#22c55e',
    requirement: { type: 'level', value: 1 }
  },
  {
    id: 'intermediate',
    name: 'Intermediário',
    description: 'Conhecimento sólido em React Native',
    icon: '🌿',
    color: '#3b82f6',
    requirement: { type: 'level', value: 5 }
  },
  {
    id: 'advanced',
    name: 'Avançado',
    description: 'Domínio avançado em React Native',
    icon: '🌳',
    color: '#8b5cf6',
    requirement: { type: 'level', value: 10 }
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Mestre em React Native',
    icon: '🏆',
    color: '#f59e0b',
    requirement: { type: 'level', value: 20 }
  }
]

export const rarityColors = {
  common: '#6b7280',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  epic: '#8b5cf6',
  legendary: '#f59e0b'
}

export const rarityLabels = {
  common: 'Comum',
  uncommon: 'Incomum',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Lendário'
}

// Função para verificar se uma conquista foi desbloqueada
export const checkAchievement = (achievement, userStats, completedTopics, categoryProgress) => {
  const { requirement } = achievement
  
  switch (requirement.type) {
    case 'topics_completed':
      return completedTopics.length >= requirement.value
    
    case 'streak_days':
      return userStats.currentStreak >= requirement.value
    
    case 'total_xp':
      return userStats.totalXP >= requirement.value
    
    case 'category_completed':
      return categoryProgress[requirement.value] === 100
    
    case 'topics_per_day':
      // Implementar lógica de tópicos por dia
      return false // Placeholder
    
    case 'late_night_completion':
    case 'early_morning_completion':
      // Implementar lógica de horário
      return false // Placeholder
    
    default:
      return false
  }
}

// Função para obter conquistas disponíveis para o usuário
export const getAvailableAchievements = (userStats, completedTopics, categoryProgress, earnedAchievements = []) => {
  return achievements.filter(achievement => {
    const isEarned = earnedAchievements.includes(achievement.id)
    const isUnlocked = checkAchievement(achievement, userStats, completedTopics, categoryProgress)
    
    return !isEarned && isUnlocked
  })
}

// Função para calcular XP necessário para próximo nível
export const getXPForNextLevel = (currentLevel) => {
  return currentLevel * 500 // 500 XP por nível
}

// Função para calcular nível baseado no XP
export const calculateLevel = (totalXP) => {
  return Math.floor(totalXP / 500) + 1
}

// Função para calcular progresso no nível atual
export const getLevelProgress = (totalXP) => {
  const currentLevel = calculateLevel(totalXP)
  const xpForCurrentLevel = (currentLevel - 1) * 500
  const xpForNextLevel = currentLevel * 500
  const currentLevelXP = totalXP - xpForCurrentLevel
  const xpNeededForNext = xpForNextLevel - xpForCurrentLevel
  
  return {
    currentLevelXP,
    xpNeededForNext,
    progressPercentage: Math.round((currentLevelXP / xpNeededForNext) * 100)
  }
} 