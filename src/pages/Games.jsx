import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Brain, 
  Code, 
  Zap, 
  Heart, 
  Clock, 
  Trophy,
  ArrowLeft,
  Gamepad2
} from 'lucide-react'
import { useGameEngine } from '../hooks/useGameEngine.jsx'
import { 
  quizQuestions, 
  codeCompletionChallenges, 
  playgroundChallenges,
  gameTypes,
  getGamesByTopic,
  getRandomGameByTopic
} from '../constants/gamesData'
import { topics } from '../constants/roadmapData'
import QuizGame from '../components/Games/QuizGame'
import CodeCompletionGame from '../components/Games/CodeCompletionGame'

const Games = () => {
  const [selectedGameType, setSelectedGameType] = useState(null)
  const [selectedGame, setSelectedGame] = useState(null)
  const [showGameSelection, setShowGameSelection] = useState(false)
  
  const {
    currentEnergy,
    maxEnergy,
    currentGame,
    gameState,
    timeRemaining,
    score,
    streak,
    hintsUsed,
    startGame,
    togglePause,
    useHint,
    submitAnswer,
    endGame,
    resetGame,
    getTimeToNextEnergy,
    getPlayerStats,
    canPlayGame
  } = useGameEngine()

  const playerStats = getPlayerStats()

  const gameTypeOptions = [
    {
      id: gameTypes.QUIZ,
      name: 'Quiz',
      description: 'Teste seus conhecimentos com perguntas de múltipla escolha',
      icon: Brain,
      color: 'blue',
      games: quizQuestions,
      difficulty: 'Fácil'
    },
    {
      id: gameTypes.CODE_COMPLETION,
      name: 'Complete o Código',
      description: 'Preencha as lacunas no código para completar o desafio',
      icon: Code,
      color: 'green',
      games: codeCompletionChallenges,
      difficulty: 'Médio'
    },
    {
      id: gameTypes.PLAYGROUND,
      name: 'Playground',
      description: 'Escreva código do zero em desafios práticos',
      icon: Zap,
      color: 'purple',
      games: playgroundChallenges,
      difficulty: 'Difícil'
    }
  ]

  const handleGameTypeSelect = (gameType) => {
    setSelectedGameType(gameType)
    setShowGameSelection(true)
  }

  const handleGameSelect = (game) => {
    if (!canPlayGame) {
      return
    }
    
    setSelectedGame(game)
    const success = startGame(game)
    if (!success) {
      setSelectedGame(null)
    }
  }

  const handleBackToSelection = () => {
    resetGame()
    setSelectedGame(null)
    setShowGameSelection(false)
    setSelectedGameType(null)
  }

  const formatTime = (minutes) => {
    if (minutes === 0) return 'Energia cheia!'
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}min`
  }

  const EnergyBar = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900">Energia</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {currentEnergy}/{maxEnergy}
          </div>
          {currentEnergy < maxEnergy && (
            <div className="text-sm text-gray-500">
              Próxima em {formatTime(getTimeToNextEnergy())}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-1">
        {Array.from({ length: maxEnergy }, (_, i) => (
          <div
            key={i}
            className={`flex-1 h-3 rounded-full ${
              i < currentEnergy ? 'bg-red-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      
      {!canPlayGame && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            Energia insuficiente! Aguarde a regeneração ou volte mais tarde.
          </p>
        </div>
      )}
    </div>
  )

  const StatsCard = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        Suas Estatísticas
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{playerStats.totalGames}</div>
          <div className="text-sm text-gray-600">Jogos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{playerStats.successRate}%</div>
          <div className="text-sm text-gray-600">Taxa de Sucesso</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{playerStats.averageScore}</div>
          <div className="text-sm text-gray-600">Pontuação Média</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{playerStats.currentStreak}</div>
          <div className="text-sm text-gray-600">Sequência Atual</div>
        </div>
      </div>
    </div>
  )

  const GameTypeCard = ({ gameType }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handleGameTypeSelect(gameType)}
      className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer border-2 border-transparent hover:border-${gameType.color}-300 transition-all duration-300 ${
        !canPlayGame ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 bg-${gameType.color}-100 rounded-xl flex items-center justify-center`}>
          <gameType.icon className={`w-6 h-6 text-${gameType.color}-600`} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{gameType.name}</h3>
          <span className={`text-sm px-2 py-1 bg-${gameType.color}-100 text-${gameType.color}-800 rounded-full`}>
            {gameType.difficulty}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{gameType.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {gameType.games.length} desafios disponíveis
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Zap className="w-4 h-4" />
          1 energia
        </div>
      </div>
    </motion.div>
  )

  const GameSelectionModal = () => {
    const selectedTypeData = gameTypeOptions.find(gt => gt.id === selectedGameType)
    if (!selectedTypeData) return null

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <selectedTypeData.icon className={`w-8 h-8 text-${selectedTypeData.color}-600`} />
                <h2 className="text-2xl font-bold text-gray-900">
                  Escolha um {selectedTypeData.name}
                </h2>
              </div>
              <button
                onClick={() => setShowGameSelection(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedTypeData.games.map(game => (
                <motion.div
                  key={game.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleGameSelect(game)}
                  className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {game.title || `${selectedTypeData.name} ${game.id.split('-')[1]}`}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      game.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      game.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {game.difficulty === 'beginner' ? 'Iniciante' :
                       game.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {game.description || game.question}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {Math.floor(game.timeLimit / 60)}:{(game.timeLimit % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-3 h-3" />
                      {game.xpReward} XP
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Se há um jogo ativo, renderizar o componente do jogo
  if (currentGame && selectedGame) {
    if (currentGame.type === gameTypes.QUIZ) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="p-4">
            <button
              onClick={handleBackToSelection}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Jogos
            </button>
          </div>
          <QuizGame
            game={currentGame}
            gameState={gameState}
            timeRemaining={timeRemaining}
            score={score}
            streak={streak}
            hintsUsed={hintsUsed}
            onSubmitAnswer={submitAnswer}
            onUseHint={useHint}
            onTogglePause={togglePause}
            onEndGame={endGame}
          />
        </div>
      )
    } else if (currentGame.type === gameTypes.CODE_COMPLETION) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="p-4">
            <button
              onClick={handleBackToSelection}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Jogos
            </button>
          </div>
          <CodeCompletionGame
            game={currentGame}
            gameState={gameState}
            timeRemaining={timeRemaining}
            score={score}
            streak={streak}
            hintsUsed={hintsUsed}
            onSubmitAnswer={submitAnswer}
            onUseHint={useHint}
            onTogglePause={togglePause}
            onEndGame={endGame}
          />
        </div>
      )
    }
  }

  // Tela principal de seleção de jogos
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="w-12 h-12 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Centro de Jogos</h1>
          </div>
          <p className="text-xl text-gray-600">
            Aprenda React Native jogando! Escolha um tipo de jogo e teste seus conhecimentos.
          </p>
        </motion.div>

        {/* Energia e Estatísticas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <EnergyBar />
          <StatsCard />
        </div>

        {/* Tipos de Jogos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Escolha seu Desafio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gameTypeOptions.map((gameType, index) => (
              <motion.div
                key={gameType.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <GameTypeCard gameType={gameType} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Modal de Seleção de Jogo */}
        <AnimatePresence>
          {showGameSelection && <GameSelectionModal />}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Games 