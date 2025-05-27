import { motion } from 'framer-motion'
import { rarityColors, rarityLabels } from '../../constants/achievementsData'

const AchievementCard = ({ achievement, isEarned = false, progress = 0, onClick }) => {
  const rarityColor = rarityColors[achievement.rarity]
  const rarityLabel = rarityLabels[achievement.rarity]

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
        isEarned
          ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-amber-300 shadow-lg'
          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={onClick}
      style={{
        borderColor: isEarned ? rarityColor : undefined
      }}
    >
      {/* Badge de raridade */}
      <div 
        className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: rarityColor }}
      >
        {rarityLabel}
      </div>

      {/* Ícone e status */}
      <div className="flex items-start justify-between mb-3">
        <div className="relative">
          <span className={`text-3xl ${isEarned ? '' : 'grayscale opacity-60'}`}>
            {achievement.icon}
          </span>
          {isEarned && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
            >
              <span className="text-xs text-white">✓</span>
            </motion.div>
          )}
        </div>
        
        {isEarned && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium"
          >
            +{achievement.xp_reward} XP
          </motion.div>
        )}
      </div>

      {/* Título e descrição */}
      <div className="mb-3">
        <h3 className={`font-bold text-lg mb-1 ${
          isEarned ? 'text-gray-900' : 'text-gray-600'
        }`}>
          {achievement.name}
        </h3>
        <p className={`text-sm ${
          isEarned ? 'text-gray-700' : 'text-gray-500'
        }`}>
          {achievement.description}
        </p>
      </div>

      {/* Barra de progresso (para conquistas não obtidas) */}
      {!isEarned && progress > 0 && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progresso</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full"
              style={{ backgroundColor: rarityColor }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      )}

      {/* Tipo de conquista */}
      <div className="flex items-center justify-between text-xs">
        <span className={`px-2 py-1 rounded-full font-medium ${
          isEarned 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {achievement.type === 'completion' && '📚 Conclusão'}
          {achievement.type === 'streak' && '🔥 Sequência'}
          {achievement.type === 'xp' && '⭐ Experiência'}
          {achievement.type === 'category' && '📂 Categoria'}
          {achievement.type === 'speed' && '🚀 Velocidade'}
          {achievement.type === 'dedication' && '💪 Dedicação'}
        </span>
        
        {isEarned && (
          <span className="text-gray-400 text-xs">
            Conquistado!
          </span>
        )}
      </div>

      {/* Efeito de brilho para conquistas obtidas */}
      {isEarned && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${rarityColor}20 50%, transparent 70%)`
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
      )}
    </motion.div>
  )
}

export default AchievementCard 