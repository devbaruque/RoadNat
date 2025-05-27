// Dados dos jogos e desafios

export const gameTypes = {
  QUIZ: 'quiz',
  CODE_COMPLETION: 'code_completion',
  PLAYGROUND: 'playground',
  DRAG_DROP: 'drag_drop',
  SPEED_CHALLENGE: 'speed_challenge'
}

export const difficultyLevels = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
}

// Perguntas de Quiz sobre React Native
export const quizQuestions = [
  {
    id: 'quiz-1',
    topicId: 'js-fundamentals',
    type: gameTypes.QUIZ,
    difficulty: difficultyLevels.BEGINNER,
    question: 'Qual é a forma correta de declarar uma variável em JavaScript ES6?',
    options: [
      'var nome = "João"',
      'let nome = "João"',
      'const nome = "João"',
      'Todas as alternativas estão corretas'
    ],
    correctAnswer: 3,
    explanation: 'Todas as formas são válidas em ES6, mas cada uma tem seu uso específico: var (escopo de função), let (escopo de bloco, mutável), const (escopo de bloco, imutável).',
    xpReward: 50,
    timeLimit: 30
  },
  {
    id: 'quiz-2',
    topicId: 'react-components',
    type: gameTypes.QUIZ,
    difficulty: difficultyLevels.BEGINNER,
    question: 'Qual é a função principal do componente View no React Native?',
    options: [
      'Exibir texto na tela',
      'Servir como container básico para layout',
      'Capturar eventos de toque',
      'Fazer requisições HTTP'
    ],
    correctAnswer: 1,
    explanation: 'O componente View é o container básico para layout no React Native, equivalente a uma div no HTML.',
    xpReward: 50,
    timeLimit: 25
  },
  {
    id: 'quiz-3',
    topicId: 'react-components',
    type: gameTypes.QUIZ,
    difficulty: difficultyLevels.INTERMEDIATE,
    question: 'Como você passa dados de um componente pai para um componente filho?',
    options: [
      'Usando state',
      'Usando props',
      'Usando context',
      'Usando refs'
    ],
    correctAnswer: 1,
    explanation: 'Props são a forma padrão de passar dados de componentes pais para filhos no React.',
    xpReward: 75,
    timeLimit: 20
  },
  {
    id: 'quiz-4',
    topicId: 'styling',
    type: gameTypes.QUIZ,
    difficulty: difficultyLevels.BEGINNER,
    question: 'Qual propriedade CSS é usada para organizar elementos em linha no Flexbox?',
    options: [
      'flexDirection: "row"',
      'flexDirection: "column"',
      'justifyContent: "center"',
      'alignItems: "center"'
    ],
    correctAnswer: 0,
    explanation: 'flexDirection: "row" organiza os elementos em linha horizontal (padrão no React Native).',
    xpReward: 50,
    timeLimit: 25
  },
  {
    id: 'quiz-5',
    topicId: 'functions-arrow',
    type: gameTypes.QUIZ,
    difficulty: difficultyLevels.INTERMEDIATE,
    question: 'Qual é a principal diferença entre function e arrow function?',
    options: [
      'Arrow functions são mais rápidas',
      'Arrow functions não têm seu próprio "this"',
      'Arrow functions não podem receber parâmetros',
      'Não há diferença'
    ],
    correctAnswer: 1,
    explanation: 'Arrow functions não têm seu próprio contexto "this", herdando do escopo pai.',
    xpReward: 75,
    timeLimit: 30
  }
]

// Desafios de Completar Código
export const codeCompletionChallenges = [
  {
    id: 'code-1',
    topicId: 'react-components',
    type: gameTypes.CODE_COMPLETION,
    difficulty: difficultyLevels.BEGINNER,
    title: 'Criar um Componente Básico',
    description: 'Complete o código para criar um componente React Native que exibe "Olá Mundo"',
    codeTemplate: `import React from 'react';
import { View, Text } from 'react-native';

const MeuComponente = () => {
  return (
    <___>
      <___>Olá Mundo</___>
    </___>
  );
};

export default ___;`,
    blanks: [
      { id: 0, answer: 'View', options: ['View', 'Text', 'ScrollView', 'Button'] },
      { id: 1, answer: 'Text', options: ['View', 'Text', 'Image', 'Button'] },
      { id: 2, answer: 'Text', options: ['View', 'Text', 'Image', 'Button'] },
      { id: 3, answer: 'View', options: ['View', 'Text', 'ScrollView', 'Button'] },
      { id: 4, answer: 'MeuComponente', options: ['MeuComponente', 'Component', 'React', 'View'] }
    ],
    correctCode: `import React from 'react';
import { View, Text } from 'react-native';

const MeuComponente = () => {
  return (
    <View>
      <Text>Olá Mundo</Text>
    </View>
  );
};

export default MeuComponente;`,
    xpReward: 100,
    timeLimit: 120
  },
  {
    id: 'code-2',
    topicId: 'styling',
    type: gameTypes.CODE_COMPLETION,
    difficulty: difficultyLevels.INTERMEDIATE,
    title: 'Estilização com StyleSheet',
    description: 'Complete o código para criar estilos usando StyleSheet',
    codeTemplate: `import React from 'react';
import { View, Text, ___ } from 'react-native';

const App = () => {
  return (
    <View style={styles.___}>
      <Text style={styles.___}>Texto Estilizado</Text>
    </View>
  );
};

const styles = StyleSheet.___({
  container: {
    flex: 1,
    justifyContent: '___',
    alignItems: '___',
  },
  texto: {
    fontSize: ___,
    color: '___',
  },
});`,
    blanks: [
      { id: 0, answer: 'StyleSheet', options: ['StyleSheet', 'Styles', 'CSS', 'Style'] },
      { id: 1, answer: 'container', options: ['container', 'view', 'main', 'wrapper'] },
      { id: 2, answer: 'texto', options: ['texto', 'text', 'title', 'label'] },
      { id: 3, answer: 'create', options: ['create', 'make', 'build', 'new'] },
      { id: 4, answer: 'center', options: ['center', 'flex-start', 'flex-end', 'space-between'] },
      { id: 5, answer: 'center', options: ['center', 'flex-start', 'flex-end', 'stretch'] },
      { id: 6, answer: '18', options: ['18', '16', '20', '24'] },
      { id: 7, answer: 'blue', options: ['blue', 'red', 'green', 'black'] }
    ],
    xpReward: 150,
    timeLimit: 180
  },
  {
    id: 'code-3',
    topicId: 'functions-arrow',
    type: gameTypes.CODE_COMPLETION,
    difficulty: difficultyLevels.BEGINNER,
    title: 'Arrow Functions',
    description: 'Complete o código usando arrow functions',
    codeTemplate: `// Função tradicional para arrow function
const somar = (a, b) ___ {
  ___ a + b;
};

// Arrow function de uma linha
const multiplicar = (a, b) ___ a * b;

// Arrow function sem parâmetros
const obterDataAtual = ___ ___ new Date();

console.log(somar(2, 3)); // 5
console.log(multiplicar(4, 5)); // 20
console.log(obterDataAtual()); // Data atual`,
    blanks: [
      { id: 0, answer: '=>', options: ['=>', '=', ':', 'function'] },
      { id: 1, answer: 'return', options: ['return', 'console.log', 'const', 'let'] },
      { id: 2, answer: '=>', options: ['=>', '=', ':', 'function'] },
      { id: 3, answer: '()', options: ['()', '[]', '{}', 'void'] },
      { id: 4, answer: '=>', options: ['=>', '=', ':', 'function'] }
    ],
    xpReward: 100,
    timeLimit: 90
  }
]

// Desafios de Playground
export const playgroundChallenges = [
  {
    id: 'playground-1',
    topicId: 'react-components',
    type: gameTypes.PLAYGROUND,
    difficulty: difficultyLevels.BEGINNER,
    title: 'Meu Primeiro App',
    description: 'Crie um app simples que exibe seu nome e uma mensagem de boas-vindas',
    initialCode: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      {/* Adicione seu código aqui */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default App;`,
    expectedOutput: 'Um app que exibe nome e mensagem de boas-vindas',
    hints: [
      'Use o componente Text para exibir texto',
      'Adicione estilos para deixar mais bonito',
      'Lembre-se de fechar as tags corretamente'
    ],
    xpReward: 200,
    timeLimit: 300
  },
  {
    id: 'playground-2',
    topicId: 'styling',
    type: gameTypes.PLAYGROUND,
    difficulty: difficultyLevels.INTERMEDIATE,
    title: 'Card de Perfil',
    description: 'Crie um card de perfil com foto, nome e descrição usando Flexbox',
    initialCode: `import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileCard = () => {
  return (
    <View style={styles.card}>
      {/* Implemente o card de perfil aqui */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // Adicione estilos do card
  },
});

export default ProfileCard;`,
    expectedOutput: 'Um card com imagem, nome e descrição organizados verticalmente',
    hints: [
      'Use flexDirection para organizar elementos',
      'Adicione padding e margin para espaçamento',
      'Use borderRadius para cantos arredondados'
    ],
    xpReward: 250,
    timeLimit: 400
  }
]

// Sistema de Vidas/Energia
export const energySystem = {
  maxEnergy: 5,
  energyRegenTime: 30 * 60 * 1000, // 30 minutos em ms
  energyCostPerGame: 1,
  energyRewardForCorrectAnswer: 0, // Não ganha energia por acerto
  energyPenaltyForWrongAnswer: 0 // Não perde energia extra por erro
}

// Configurações de Dificuldade
export const difficultyConfig = {
  [difficultyLevels.BEGINNER]: {
    timeMultiplier: 1.5,
    xpMultiplier: 1.0,
    hintsAllowed: 3
  },
  [difficultyLevels.INTERMEDIATE]: {
    timeMultiplier: 1.0,
    xpMultiplier: 1.2,
    hintsAllowed: 2
  },
  [difficultyLevels.ADVANCED]: {
    timeMultiplier: 0.8,
    xpMultiplier: 1.5,
    hintsAllowed: 1
  }
}

// Função para obter jogos por tópico
export const getGamesByTopic = (topicId) => {
  const quizzes = quizQuestions.filter(q => q.topicId === topicId)
  const codeCompletions = codeCompletionChallenges.filter(c => c.topicId === topicId)
  const playgrounds = playgroundChallenges.filter(p => p.topicId === topicId)
  
  return {
    quizzes,
    codeCompletions,
    playgrounds,
    total: quizzes.length + codeCompletions.length + playgrounds.length
  }
}

// Função para obter jogo aleatório por tópico
export const getRandomGameByTopic = (topicId, gameType = null) => {
  const games = getGamesByTopic(topicId)
  
  if (gameType) {
    switch (gameType) {
      case gameTypes.QUIZ:
        return games.quizzes[Math.floor(Math.random() * games.quizzes.length)]
      case gameTypes.CODE_COMPLETION:
        return games.codeCompletions[Math.floor(Math.random() * games.codeCompletions.length)]
      case gameTypes.PLAYGROUND:
        return games.playgrounds[Math.floor(Math.random() * games.playgrounds.length)]
      default:
        return null
    }
  }
  
  // Retorna jogo aleatório de qualquer tipo
  const allGames = [...games.quizzes, ...games.codeCompletions, ...games.playgrounds]
  return allGames[Math.floor(Math.random() * allGames.length)]
} 