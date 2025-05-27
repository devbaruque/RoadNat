// Dados e configurações do sistema de ranking

export const rankingTypes = {
  GLOBAL: 'global',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  FRIENDS: 'friends'
}

export const rankingCategories = {
  XP: 'xp',
  STREAK: 'streak',
  GAMES_COMPLETED: 'games_completed',
  TOPICS_COMPLETED: 'topics_completed'
}

// Dados simulados de usuários para o ranking
export const mockRankingData = {
  [rankingTypes.GLOBAL]: {
    [rankingCategories.XP]: [
      {
        id: 1,
        username: 'CodeMaster',
        avatar: '👨‍💻',
        totalXP: 15420,
        level: 28,
        streak: 45,
        gamesCompleted: 234,
        topicsCompleted: 67,
        lastActive: '2024-01-15T10:30:00Z'
      },
      {
        id: 2,
        username: 'ReactNinja',
        avatar: '🥷',
        totalXP: 12890,
        level: 24,
        streak: 32,
        gamesCompleted: 198,
        topicsCompleted: 58,
        lastActive: '2024-01-15T09:15:00Z'
      },
      {
        id: 3,
        username: 'JSQueen',
        avatar: '👑',
        totalXP: 11750,
        level: 22,
        streak: 28,
        gamesCompleted: 176,
        topicsCompleted: 52,
        lastActive: '2024-01-15T08:45:00Z'
      },
      {
        id: 4,
        username: 'DevGuru',
        avatar: '🧙‍♂️',
        totalXP: 10980,
        level: 21,
        streak: 19,
        gamesCompleted: 165,
        topicsCompleted: 48,
        lastActive: '2024-01-14T22:30:00Z'
      },
      {
        id: 5,
        username: 'CodeWarrior',
        avatar: '⚔️',
        totalXP: 9850,
        level: 19,
        streak: 15,
        gamesCompleted: 142,
        topicsCompleted: 43,
        lastActive: '2024-01-14T20:15:00Z'
      },
      {
        id: 6,
        username: 'ReactRookie',
        avatar: '🚀',
        totalXP: 8920,
        level: 17,
        streak: 12,
        gamesCompleted: 128,
        topicsCompleted: 38,
        lastActive: '2024-01-14T18:00:00Z'
      },
      {
        id: 7,
        username: 'JSExplorer',
        avatar: '🗺️',
        totalXP: 7650,
        level: 15,
        streak: 8,
        gamesCompleted: 115,
        topicsCompleted: 34,
        lastActive: '2024-01-14T16:45:00Z'
      },
      {
        id: 8,
        username: 'CodeStudent',
        avatar: '📚',
        totalXP: 6420,
        level: 13,
        streak: 5,
        gamesCompleted: 98,
        topicsCompleted: 28,
        lastActive: '2024-01-14T14:30:00Z'
      },
      {
        id: 9,
        username: 'DevLearner',
        avatar: '🎓',
        totalXP: 5280,
        level: 11,
        streak: 3,
        gamesCompleted: 82,
        topicsCompleted: 23,
        lastActive: '2024-01-14T12:15:00Z'
      },
      {
        id: 10,
        username: 'Você',
        avatar: '😊',
        totalXP: 4150,
        level: 9,
        streak: 7,
        gamesCompleted: 67,
        topicsCompleted: 18,
        lastActive: '2024-01-15T11:00:00Z',
        isCurrentUser: true
      }
    ]
  }
}

// Configurações de recompensas por posição no ranking
export const rankingRewards = {
  1: { xp: 500, badge: 'first_place', title: '🥇 Campeão' },
  2: { xp: 300, badge: 'second_place', title: '🥈 Vice-Campeão' },
  3: { xp: 200, badge: 'third_place', title: '🥉 Terceiro Lugar' },
  'top10': { xp: 100, badge: 'top_10', title: '🏆 Top 10' },
  'top50': { xp: 50, badge: 'top_50', title: '⭐ Top 50' }
}

// Configurações de ligas/divisões
export const leagues = {
  BRONZE: {
    name: 'Bronze',
    minXP: 0,
    maxXP: 2999,
    color: '#CD7F32',
    icon: '🥉',
    rewards: { weeklyXP: 50 }
  },
  SILVER: {
    name: 'Prata',
    minXP: 3000,
    maxXP: 7999,
    color: '#C0C0C0',
    icon: '🥈',
    rewards: { weeklyXP: 100 }
  },
  GOLD: {
    name: 'Ouro',
    minXP: 8000,
    maxXP: 15999,
    color: '#FFD700',
    icon: '🥇',
    rewards: { weeklyXP: 200 }
  },
  PLATINUM: {
    name: 'Platina',
    minXP: 16000,
    maxXP: 31999,
    color: '#E5E4E2',
    icon: '💎',
    rewards: { weeklyXP: 300 }
  },
  DIAMOND: {
    name: 'Diamante',
    minXP: 32000,
    maxXP: 63999,
    color: '#B9F2FF',
    icon: '💠',
    rewards: { weeklyXP: 500 }
  },
  MASTER: {
    name: 'Mestre',
    minXP: 64000,
    maxXP: Infinity,
    color: '#9966CC',
    icon: '👑',
    rewards: { weeklyXP: 1000 }
  }
}

// Função para determinar a liga baseada no XP
export const getUserLeague = (totalXP) => {
  for (const [key, league] of Object.entries(leagues)) {
    if (totalXP >= league.minXP && totalXP <= league.maxXP) {
      return { key, ...league }
    }
  }
  return { key: 'BRONZE', ...leagues.BRONZE }
}

// Função para gerar dados de ranking baseados na categoria
export const getRankingData = (type = rankingTypes.GLOBAL, category = rankingCategories.XP) => {
  const baseData = mockRankingData[type]?.[category] || mockRankingData[rankingTypes.GLOBAL][rankingCategories.XP]
  
  // Ordenar baseado na categoria
  return baseData.sort((a, b) => {
    switch (category) {
      case rankingCategories.XP:
        return b.totalXP - a.totalXP
      case rankingCategories.STREAK:
        return b.streak - a.streak
      case rankingCategories.GAMES_COMPLETED:
        return b.gamesCompleted - a.gamesCompleted
      case rankingCategories.TOPICS_COMPLETED:
        return b.topicsCompleted - a.topicsCompleted
      default:
        return b.totalXP - a.totalXP
    }
  }).map((user, index) => ({
    ...user,
    position: index + 1
  }))
}

// Função para obter posição do usuário atual
export const getCurrentUserPosition = (type = rankingTypes.GLOBAL, category = rankingCategories.XP) => {
  const ranking = getRankingData(type, category)
  const currentUser = ranking.find(user => user.isCurrentUser)
  return currentUser ? currentUser.position : null
}

// Função para calcular pontos necessários para próxima posição
export const getPointsToNextPosition = (type = rankingTypes.GLOBAL, category = rankingCategories.XP) => {
  const ranking = getRankingData(type, category)
  const currentUser = ranking.find(user => user.isCurrentUser)
  
  if (!currentUser || currentUser.position === 1) return 0
  
  const nextUser = ranking.find(user => user.position === currentUser.position - 1)
  if (!nextUser) return 0
  
  switch (category) {
    case rankingCategories.XP:
      return nextUser.totalXP - currentUser.totalXP + 1
    case rankingCategories.STREAK:
      return nextUser.streak - currentUser.streak + 1
    case rankingCategories.GAMES_COMPLETED:
      return nextUser.gamesCompleted - currentUser.gamesCompleted + 1
    case rankingCategories.TOPICS_COMPLETED:
      return nextUser.topicsCompleted - currentUser.topicsCompleted + 1
    default:
      return 0
  }
} 