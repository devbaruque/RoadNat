import { motion } from 'framer-motion'
import { Heart, Clock } from 'lucide-react'

const EnergyDisplay = ({ 
  currentEnergy, 
  maxEnergy, 
  timeToNextEnergy, 
  className = "" 
}) => {
  const formatTime = (minutes) => {
    if (minutes === 0) return 'Cheia!'
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}min`
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Corações de Energia */}
      <div className="flex items-center gap-1">
        {Array.from({ length: maxEnergy }, (_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <Heart 
              className={`w-6 h-6 transition-all duration-300 ${
                index < currentEnergy 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-300 fill-gray-300'
              }`}
            />
            {index < currentEnergy && (
              <motion.div
                className="absolute inset-0"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              >
                <Heart className="w-6 h-6 text-red-400 fill-red-400" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Contador Numérico */}
      <div className="text-sm font-medium text-gray-700">
        {currentEnergy}/{maxEnergy}
      </div>

      {/* Tempo para Próxima Energia */}
      {currentEnergy < maxEnergy && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{formatTime(timeToNextEnergy)}</span>
        </div>
      )}
    </div>
  )
}

export default EnergyDisplay 