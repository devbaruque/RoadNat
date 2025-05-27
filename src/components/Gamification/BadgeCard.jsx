import { motion } from 'framer-motion'

const BadgeCard = ({ badge, isEarned = false, currentLevel = 1 }) => {
  const isUnlocked = currentLevel >= badge.requirement.value
  const progress = isUnlocked ? 100 : Math.min((currentLevel / badge.requirement.value) * 100, 99)

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -3 }}
      className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
        isEarned
          ? 'bg-gradient-to-br from-white to-gray-50 border-2 shadow-lg'
          : isUnlocked
          ? 'bg-white border-gray-300 hover:border-gray-400 hover:shadow-md'
          : 'bg-gray-50 border-gray-200 opacity-75'
      }`}
      style={{
        borderColor: isEarned ? badge.color : undefined,
        boxShadow: isEarned ? `0 0 20px ${badge.color}30` : undefined
      }}
    >
      {/* Ícone principal */}
      <div className="text-center mb-4">
        <div className="relative inline-block">
          <motion.span 
            className={`text-5xl block ${
              isEarned ? '' : isUnlocked ? 'opacity-80' : 'grayscale opacity-50'
            }`}
            animate={isEarned ? {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            {badge.icon}
          </motion.span>
          
          {isEarned && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
            >
              <span className="text-xs text-white font-bold">✓</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Nome e descrição */}
      <div className="text-center mb-4">
        <h3 className={`font-bold text-lg mb-2 ${
          isEarned ? 'text-gray-900' : isUnlocked ? 'text-gray-700' : 'text-gray-500'
        }`}>
          {badge.name}
        </h3>
        <p className={`text-sm ${
          isEarned ? 'text-gray-600' : isUnlocked ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {badge.description}
        </p>
      </div>

      {/* Requisito */}
      <div className="text-center mb-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          isEarned 
            ? 'bg-green-100 text-green-800' 
            : isUnlocked
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {isEarned ? (
            <>
              <span className="mr-1">🏆</span>
              Conquistado!
            </>
          ) : (
            <>
              <span className="mr-1">🎯</span>
              Nível {badge.requirement.value}
            </>
          )}
        </div>
      </div>

      {/* Barra de progresso */}
      {!isEarned && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Progresso</span>
            <span>Nível {currentLevel}/{badge.requirement.value}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full"
              style={{ backgroundColor: badge.color }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="text-center text-xs text-gray-500 mt-1">
            {isUnlocked ? 'Disponível!' : `${badge.requirement.value - currentLevel} níveis restantes`}
          </div>
        </div>
      )}

      {/* Efeito de brilho para badges conquistados */}
      {isEarned && (
        <>
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: `linear-gradient(45deg, transparent 30%, ${badge.color}15 50%, transparent 70%)`
            }}
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4
            }}
          />
          
          {/* Partículas flutuantes */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: badge.color,
                  left: `${20 + i * 30}%`,
                  top: '50%'
                }}
                animate={{
                  y: [20, -20],
                  x: [Math.random() * 20 - 10, Math.random() * 20 - 10],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  repeatDelay: 3
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  )
}

export default BadgeCard 