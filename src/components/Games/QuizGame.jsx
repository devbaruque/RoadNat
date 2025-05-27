import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Lightbulb, CheckCircle, XCircle, Play, Pause } from 'lucide-react'

const QuizGame = ({ 
  game, 
  gameState, 
  timeRemaining, 
  score, 
  streak, 
  hintsUsed,
  onSubmitAnswer, 
  onUseHint, 
  onTogglePause,
  onEndGame 
}) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [eliminatedOptions, setEliminatedOptions] = useState([])
  const [isAnswered, setIsAnswered] = useState(false)

  // Reset quando o jogo muda
  useEffect(() => {
    setSelectedOption(null)
    setShowExplanation(false)
    setEliminatedOptions([])
    setIsAnswered(false)
  }, [game?.id])

  const handleOptionSelect = (optionIndex) => {
    if (isAnswered || gameState !== 'playing') return
    setSelectedOption(optionIndex)
  }

  const handleSubmit = () => {
    if (selectedOption === null || isAnswered) return

    const isCorrect = selectedOption === game.correctAnswer
    setIsAnswered(true)
    setShowExplanation(true)

    const result = onSubmitAnswer(selectedOption, isCorrect)
    
    if (isCorrect) {
      setTimeout(() => {
        onEndGame(true, 'Parabéns! Resposta correta!')
      }, 2000)
    } else {
      setTimeout(() => {
        onEndGame(false, 'Resposta incorreta. Tente novamente!')
      }, 3000)
    }
  }

  const handleUseHint = () => {
    const hint = onUseHint()
    if (hint === 'hint_eliminate_options') {
      // Eliminar 2 opções incorretas aleatoriamente
      const incorrectOptions = game.options
        .map((_, index) => index)
        .filter(index => index !== game.correctAnswer)
      
      const toEliminate = incorrectOptions
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
      
      setEliminatedOptions(toEliminate)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getOptionStyle = (index) => {
    if (isAnswered) {
      if (index === game.correctAnswer) {
        return 'bg-green-100 border-green-500 text-green-800'
      } else if (index === selectedOption && index !== game.correctAnswer) {
        return 'bg-red-100 border-red-500 text-red-800'
      }
    } else if (selectedOption === index) {
      return 'bg-blue-100 border-blue-500 text-blue-800'
    } else if (eliminatedOptions.includes(index)) {
      return 'bg-gray-100 border-gray-300 text-gray-400 opacity-50'
    }
    
    return 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
  }

  if (!game) return null

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header do Jogo */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Quiz</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              game.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              game.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {game.difficulty === 'beginner' ? 'Iniciante' :
               game.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
            </span>
          </div>
          
          <button
            onClick={onTogglePause}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {gameState === 'playing' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {gameState === 'playing' ? 'Pausar' : 'Continuar'}
          </button>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Tempo</span>
            </div>
            <div className={`text-xl font-bold ${timeRemaining <= 10 ? 'text-red-600' : 'text-blue-600'}`}>
              {formatTime(timeRemaining)}
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-sm font-medium text-green-700 mb-1">Pontos</div>
            <div className="text-xl font-bold text-green-600">{score}</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-sm font-medium text-purple-700 mb-1">Sequência</div>
            <div className="text-xl font-bold text-purple-600">{streak}</div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="text-sm font-medium text-orange-700 mb-1">XP Possível</div>
            <div className="text-xl font-bold text-orange-600">{game.xpReward}</div>
          </div>
        </div>
      </div>

      {/* Pergunta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8 mb-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
          {game.question}
        </h3>

        {/* Opções */}
        <div className="space-y-3">
          {game.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: eliminatedOptions.includes(index) ? 1 : 1.02 }}
              whileTap={{ scale: eliminatedOptions.includes(index) ? 1 : 0.98 }}
              onClick={() => handleOptionSelect(index)}
              disabled={eliminatedOptions.includes(index) || isAnswered}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${getOptionStyle(index)}`}
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {isAnswered && index === game.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {isAnswered && index === selectedOption && index !== game.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleUseHint}
            disabled={hintsUsed >= 3 || isAnswered}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lightbulb className="w-4 h-4" />
            Usar Dica ({3 - hintsUsed} restantes)
          </button>

          <button
            onClick={handleSubmit}
            disabled={selectedOption === null || isAnswered}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Resposta
          </button>
        </div>
      </motion.div>

      {/* Explicação */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`rounded-xl shadow-lg p-6 ${
              selectedOption === game.correctAnswer 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedOption === game.correctAnswer ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              )}
              <div>
                <h4 className={`font-semibold mb-2 ${
                  selectedOption === game.correctAnswer ? 'text-green-800' : 'text-red-800'
                }`}>
                  {selectedOption === game.correctAnswer ? 'Correto!' : 'Incorreto!'}
                </h4>
                <p className={`${
                  selectedOption === game.correctAnswer ? 'text-green-700' : 'text-red-700'
                }`}>
                  {game.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay de Pausa */}
      <AnimatePresence>
        {gameState === 'paused' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-8 text-center"
            >
              <Pause className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Jogo Pausado</h3>
              <p className="text-gray-600 mb-4">Clique em "Continuar" para retomar</p>
              <button
                onClick={onTogglePause}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Continuar Jogo
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default QuizGame 