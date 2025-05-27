// Dados e configurações do sistema de desafios diários

export const challengeTypes = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  SPECIAL: 'special',
  STREAK: 'streak'
}

export const challengeCategories = {
  GAMES: 'games',
  TOPICS: 'topics',
  XP: 'xp',
  STREAK: 'streak',
  SOCIAL: 'social'
}

export const challengeDifficulty = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
}

// Templates de desafios diários
export const dailyChallengeTemplates = [
  // Desafios de Jogos
  {
    id: 'daily_games_1',
    type: challengeTypes.DAILY,
    category: challengeCategories.GAMES,
    difficulty: challengeDifficulty.EASY,
    title: 'Jogador Dedicado',
    description: 'Complete {target} jogos hoje',
    icon: '🎮',
    target: 3,
    progress: 0,
    xpReward: 100,
    energyReward: 1,
    requirements: {
      gamesCompleted: 3
    }
  },
  {
    id: 'daily_games_2',
    type: challengeTypes.DAILY,
    category: challengeCategories.GAMES,
    difficulty: challengeDifficulty.MEDIUM,
    title: 'Mestre dos Quizzes',
    description: 'Acerte {target} perguntas de quiz consecutivas',
    icon: '🧠',
    target: 5,
    progress: 0,
    xpReward: 150,
    energyReward: 1,
    requirements: {
      quizStreak: 5
    }
  },
  {
    id: 'daily_games_3',
    type: challengeTypes.DAILY,
    category: challengeCategories.GAMES,
    difficulty: challengeDifficulty.HARD,
    title: 'Programador Perfeito',
    description: 'Complete {target} desafios de código sem usar dicas',
    icon: '💻',
    target: 2,
    progress: 0,
    xpReward: 200,
    energyReward: 2,
    requirements: {
      codeCompletedNoHints: 2
    }
  },

  // Desafios de Tópicos
  {
    id: 'daily_topics_1',
    type: challengeTypes.DAILY,
    category: challengeCategories.TOPICS,
    difficulty: challengeDifficulty.EASY,
    title: 'Explorador Curioso',
    description: 'Estude {target} tópicos diferentes hoje',
    icon: '📚',
    target: 2,
    progress: 0,
    xpReward: 120,
    energyReward: 1,
    requirements: {
      topicsStudied: 2
    }
  },
  {
    id: 'daily_topics_2',
    type: challengeTypes.DAILY,
    category: challengeCategories.TOPICS,
    difficulty: challengeDifficulty.MEDIUM,
    title: 'Completista',
    description: 'Finalize {target} tópico completamente',
    icon: '✅',
    target: 1,
    progress: 0,
    xpReward: 180,
    energyReward: 1,
    requirements: {
      topicsCompleted: 1
    }
  },

  // Desafios de XP
  {
    id: 'daily_xp_1',
    type: challengeTypes.DAILY,
    category: challengeCategories.XP,
    difficulty: challengeDifficulty.EASY,
    title: 'Coletor de XP',
    description: 'Ganhe {target} XP hoje',
    icon: '⭐',
    target: 200,
    progress: 0,
    xpReward: 50,
    energyReward: 1,
    requirements: {
      xpGained: 200
    }
  },
  {
    id: 'daily_xp_2',
    type: challengeTypes.DAILY,
    category: challengeCategories.XP,
    difficulty: challengeDifficulty.MEDIUM,
    title: 'Acumulador',
    description: 'Ganhe {target} XP hoje',
    icon: '💎',
    target: 500,
    progress: 0,
    xpReward: 100,
    energyReward: 2,
    requirements: {
      xpGained: 500
    }
  },

  // Desafios de Streak
  {
    id: 'daily_streak_1',
    type: challengeTypes.DAILY,
    category: challengeCategories.STREAK,
    difficulty: challengeDifficulty.EASY,
    title: 'Consistência',
    description: 'Mantenha sua sequência de {target} dias',
    icon: '🔥',
    target: 3,
    progress: 0,
    xpReward: 80,
    energyReward: 1,
    requirements: {
      streakMaintained: 3
    }
  }
]

// Templates de desafios semanais
export const weeklyChallengeTemplates = [
  {
    id: 'weekly_master_1',
    type: challengeTypes.WEEKLY,
    category: challengeCategories.GAMES,
    difficulty: challengeDifficulty.HARD,
    title: 'Mestre da Semana',
    description: 'Complete {target} jogos esta semana',
    icon: '👑',
    target: 20,
    progress: 0,
    xpReward: 500,
    energyReward: 5,
    requirements: {
      gamesCompleted: 20
    }
  },
  {
    id: 'weekly_scholar_1',
    type: challengeTypes.WEEKLY,
    category: challengeCategories.TOPICS,
    difficulty: challengeDifficulty.MEDIUM,
    title: 'Estudioso Dedicado',
    description: 'Complete {target} tópicos esta semana',
    icon: '🎓',
    target: 5,
    progress: 0,
    xpReward: 400,
    energyReward: 3,
    requirements: {
      topicsCompleted: 5
    }
  },
  {
    id: 'weekly_xp_1',
    type: challengeTypes.WEEKLY,
    category: challengeCategories.XP,
    difficulty: challengeDifficulty.HARD,
    title: 'Acumulador Supremo',
    description: 'Ganhe {target} XP esta semana',
    icon: '💫',
    target: 2000,
    progress: 0,
    xpReward: 300,
    energyReward: 3,
    requirements: {
      xpGained: 2000
    }
  }
]

// Desafios especiais (eventos)
export const specialChallengeTemplates = [
  {
    id: 'special_weekend_1',
    type: challengeTypes.SPECIAL,
    category: challengeCategories.GAMES,
    difficulty: challengeDifficulty.MEDIUM,
    title: 'Fim de Semana Produtivo',
    description: 'Complete {target} jogos no fim de semana',
    icon: '🌟',
    target: 10,
    progress: 0,
    xpReward: 300,
    energyReward: 3,
    requirements: {
      gamesCompleted: 10
    },
    startDate: null, // Será definido dinamicamente
    endDate: null,
    isActive: false
  },
  {
    id: 'special_newbie_1',
    type: challengeTypes.SPECIAL,
    category: challengeCategories.TOPICS,
    difficulty: challengeDifficulty.EASY,
    title: 'Primeiro Passo',
    description: 'Complete seu primeiro tópico',
    icon: '🚀',
    target: 1,
    progress: 0,
    xpReward: 200,
    energyReward: 2,
    requirements: {
      topicsCompleted: 1
    },
    isOneTime: true
  }
]

// Configurações de recompensas por dificuldade
export const difficultyRewards = {
  [challengeDifficulty.EASY]: {
    xpMultiplier: 1.0,
    energyBonus: 0,
    badgeChance: 0.1
  },
  [challengeDifficulty.MEDIUM]: {
    xpMultiplier: 1.5,
    energyBonus: 1,
    badgeChance: 0.2
  },
  [challengeDifficulty.HARD]: {
    xpMultiplier: 2.0,
    energyBonus: 2,
    badgeChance: 0.3
  }
}

// Função para gerar desafios diários
export const generateDailyChallenges = (date = new Date()) => {
  const dateString = date.toISOString().split('T')[0]
  
  // Usar a data como seed para gerar desafios consistentes
  const seed = dateString.split('-').reduce((acc, val) => acc + parseInt(val), 0)
  
  // Selecionar 3 desafios aleatórios baseados no seed
  const shuffled = [...dailyChallengeTemplates].sort(() => {
    return (seed % 2) - 0.5
  })
  
  return shuffled.slice(0, 3).map((template, index) => ({
    ...template,
    id: `${template.id}_${dateString}`,
    date: dateString,
    isCompleted: false,
    completedAt: null,
    progress: 0,
    // Variar targets baseado no dia
    target: template.target + (seed % 3),
    description: template.description.replace('{target}', template.target + (seed % 3))
  }))
}

// Função para gerar desafios semanais
export const generateWeeklyChallenges = (weekStart = new Date()) => {
  const weekString = `${weekStart.getFullYear()}-W${Math.ceil(weekStart.getDate() / 7)}`
  
  return weeklyChallengeTemplates.map(template => ({
    ...template,
    id: `${template.id}_${weekString}`,
    weekStart: weekStart.toISOString().split('T')[0],
    isCompleted: false,
    completedAt: null,
    progress: 0,
    description: template.description.replace('{target}', template.target)
  }))
}

// Função para verificar se desafio foi completado
export const checkChallengeCompletion = (challenge, userStats, dailyStats) => {
  const requirements = challenge.requirements
  
  for (const [key, target] of Object.entries(requirements)) {
    let currentValue = 0
    
    switch (key) {
      case 'gamesCompleted':
        currentValue = dailyStats?.gamesCompleted || 0
        break
      case 'topicsCompleted':
        currentValue = dailyStats?.topicsCompleted || 0
        break
      case 'topicsStudied':
        currentValue = dailyStats?.topicsStudied || 0
        break
      case 'xpGained':
        currentValue = dailyStats?.xpGained || 0
        break
      case 'quizStreak':
        currentValue = dailyStats?.quizStreak || 0
        break
      case 'codeCompletedNoHints':
        currentValue = dailyStats?.codeCompletedNoHints || 0
        break
      case 'streakMaintained':
        currentValue = userStats?.currentStreak || 0
        break
      default:
        currentValue = 0
    }
    
    if (currentValue < target) {
      return { completed: false, progress: Math.min(currentValue / target, 1) }
    }
  }
  
  return { completed: true, progress: 1 }
}

// Função para calcular recompensas do desafio
export const calculateChallengeRewards = (challenge) => {
  const difficultyConfig = difficultyRewards[challenge.difficulty] || difficultyRewards.easy
  
  const xpReward = Math.floor(challenge.xpReward * difficultyConfig.xpMultiplier)
  const energyReward = challenge.energyReward + difficultyConfig.energyBonus
  const badgeEarned = Math.random() < difficultyConfig.badgeChance
  
  return {
    xp: xpReward,
    energy: energyReward,
    badge: badgeEarned ? `challenge_${challenge.category}_${challenge.difficulty}` : null
  }
}

// Função para obter desafios ativos
export const getActiveChallenges = (date = new Date()) => {
  const dailyChallenges = generateDailyChallenges(date)
  const weeklyChallenges = generateWeeklyChallenges(date)
  
  // Adicionar desafios especiais ativos
  const activeChallenges = [
    ...dailyChallenges,
    ...weeklyChallenges
  ]
  
  return activeChallenges
}

// Função para obter estatísticas de desafios
export const getChallengeStats = (completedChallenges) => {
  const totalCompleted = completedChallenges.length
  const dailyCompleted = completedChallenges.filter(c => c.type === challengeTypes.DAILY).length
  const weeklyCompleted = completedChallenges.filter(c => c.type === challengeTypes.WEEKLY).length
  const specialCompleted = completedChallenges.filter(c => c.type === challengeTypes.SPECIAL).length
  
  const totalXPEarned = completedChallenges.reduce((sum, c) => sum + (c.xpReward || 0), 0)
  const totalEnergyEarned = completedChallenges.reduce((sum, c) => sum + (c.energyReward || 0), 0)
  
  return {
    totalCompleted,
    dailyCompleted,
    weeklyCompleted,
    specialCompleted,
    totalXPEarned,
    totalEnergyEarned,
    completionRate: totalCompleted > 0 ? (totalCompleted / (totalCompleted + 10)) * 100 : 0 // Estimativa
  }
} 