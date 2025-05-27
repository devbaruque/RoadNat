// Dados do roadmap baseados na documentação do projeto
export const categories = [
  {
    id: 'prerequisites',
    name: 'Pré-requisitos',
    description: 'Fundamentos necessários antes de começar',
    color: '#ef4444',
    icon: '📚',
    order: 1
  },
  {
    id: 'environment',
    name: 'Ambiente e Ferramentas',
    description: 'Configuração do ambiente de desenvolvimento',
    color: '#f59e0b',
    icon: '⚙️',
    order: 2
  },
  {
    id: 'core',
    name: 'React Native Core',
    description: 'Componentes e conceitos fundamentais',
    color: '#3b82f6',
    icon: '⚛️',
    order: 3
  },
  {
    id: 'navigation',
    name: 'Navegação e Estado',
    description: 'Navegação entre telas e gerenciamento de estado',
    color: '#8b5cf6',
    icon: '🧭',
    order: 4
  },
  {
    id: 'advanced',
    name: 'Recursos Avançados',
    description: 'Networking, storage e recursos nativos',
    color: '#10b981',
    icon: '🚀',
    order: 5
  },
  {
    id: 'quality',
    name: 'Qualidade e Deploy',
    description: 'Testes, performance e publicação',
    color: '#6366f1',
    icon: '✅',
    order: 6
  }
]

export const topics = [
  // Fase 1: Pré-requisitos
  {
    id: 'js-fundamentals',
    title: 'JavaScript Fundamentals',
    description: 'Variáveis, tipos de dados, funções e conceitos básicos',
    category_id: 'prerequisites',
    content: `
# JavaScript Fundamentals

## Variáveis e Tipos de Dados

JavaScript é uma linguagem dinamicamente tipada, o que significa que você não precisa declarar o tipo de uma variável.

### Declaração de Variáveis

\`\`\`javascript
// ES6+ - Recomendado
let nome = "João";
const idade = 25;

// Evitar - var tem escopo diferente
var sobrenome = "Silva";
\`\`\`

### Tipos de Dados Primitivos

\`\`\`javascript
// String
const texto = "Hello World";

// Number
const numero = 42;
const decimal = 3.14;

// Boolean
const ativo = true;

// Undefined
let indefinido;

// Null
const vazio = null;
\`\`\`
    `,
    code_example: `
// Exemplo prático: Calculadora simples
function calculadora(a, b, operacao) {
  switch(operacao) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : 'Erro: Divisão por zero';
    default:
      return 'Operação inválida';
  }
}

console.log(calculadora(10, 5, '+')); // 15
console.log(calculadora(10, 5, '*')); // 50
    `,
    order_index: 1,
    prerequisites: [],
    difficulty_level: 'beginner',
    estimated_time: 60,
    xp_reward: 100
  },
  {
    id: 'functions-arrow',
    title: 'Functions & Arrow Functions',
    description: 'Funções tradicionais e arrow functions do ES6',
    category_id: 'prerequisites',
    content: `
# Functions & Arrow Functions

## Funções Tradicionais

\`\`\`javascript
function saudacao(nome) {
  return "Olá, " + nome + "!";
}

// Função anônima
const despedida = function(nome) {
  return "Tchau, " + nome + "!";
};
\`\`\`

## Arrow Functions (ES6)

\`\`\`javascript
// Sintaxe básica
const saudacao = (nome) => {
  return \`Olá, \${nome}!\`;
};

// Sintaxe simplificada (uma linha)
const quadrado = x => x * x;

// Múltiplos parâmetros
const soma = (a, b) => a + b;

// Sem parâmetros
const aleatorio = () => Math.random();
\`\`\`
    `,
    code_example: `
// Exemplo: Manipulação de arrays com arrow functions
const numeros = [1, 2, 3, 4, 5];

// Map - transformar elementos
const dobrados = numeros.map(num => num * 2);
console.log(dobrados); // [2, 4, 6, 8, 10]

// Filter - filtrar elementos
const pares = numeros.filter(num => num % 2 === 0);
console.log(pares); // [2, 4]

// Reduce - reduzir a um valor
const soma = numeros.reduce((acc, num) => acc + num, 0);
console.log(soma); // 15
    `,
    order_index: 2,
    prerequisites: ['js-fundamentals'],
    difficulty_level: 'beginner',
    estimated_time: 45,
    xp_reward: 80
  },
  {
    id: 'objects-arrays',
    title: 'Objects & Arrays',
    description: 'Manipulação de objetos e arrays em JavaScript',
    category_id: 'prerequisites',
    content: `
# Objects & Arrays

## Objetos

\`\`\`javascript
// Criação de objeto
const pessoa = {
  nome: "Maria",
  idade: 30,
  profissao: "Desenvolvedora"
};

// Acessando propriedades
console.log(pessoa.nome); // "Maria"
console.log(pessoa["idade"]); // 30

// Adicionando propriedades
pessoa.email = "maria@email.com";
\`\`\`

## Arrays

\`\`\`javascript
// Criação de array
const frutas = ["maçã", "banana", "laranja"];

// Métodos úteis
frutas.push("uva"); // Adiciona no final
frutas.unshift("morango"); // Adiciona no início
const ultimaFruta = frutas.pop(); // Remove do final
\`\`\`
    `,
    code_example: `
// Exemplo: Sistema de usuários
const usuarios = [
  { id: 1, nome: "João", ativo: true },
  { id: 2, nome: "Maria", ativo: false },
  { id: 3, nome: "Pedro", ativo: true }
];

// Encontrar usuário ativo
const usuariosAtivos = usuarios.filter(user => user.ativo);

// Buscar por ID
const buscarUsuario = (id) => usuarios.find(user => user.id === id);

// Atualizar usuário
const atualizarUsuario = (id, novosDados) => {
  const index = usuarios.findIndex(user => user.id === id);
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...novosDados };
  }
  return usuarios[index];
};
    `,
    order_index: 3,
    prerequisites: ['functions-arrow'],
    difficulty_level: 'beginner',
    estimated_time: 50,
    xp_reward: 90
  },
  {
    id: 'es6-features',
    title: 'ES6+ Features',
    description: 'Destructuring, spread operator, template literals e mais',
    category_id: 'prerequisites',
    content: `
# ES6+ Features

## Destructuring

\`\`\`javascript
// Array destructuring
const [primeiro, segundo] = [1, 2, 3];

// Object destructuring
const { nome, idade } = { nome: "João", idade: 25, cidade: "SP" };

// Com renomeação
const { nome: nomeUsuario } = usuario;
\`\`\`

## Spread Operator

\`\`\`javascript
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Objetos
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
\`\`\`

## Template Literals

\`\`\`javascript
const nome = "Maria";
const idade = 30;
const mensagem = \`Olá, meu nome é \${nome} e tenho \${idade} anos.\`;
\`\`\`
    `,
    code_example: `
// Exemplo: Gerenciador de tarefas
const criarTarefa = (titulo, { prioridade = 'baixa', concluida = false } = {}) => ({
  id: Date.now(),
  titulo,
  prioridade,
  concluida,
  criadaEm: new Date().toISOString()
});

const tarefas = [
  criarTarefa("Estudar React Native", { prioridade: 'alta' }),
  criarTarefa("Fazer exercícios"),
  criarTarefa("Ler documentação", { prioridade: 'média' })
];

// Filtrar e mapear com destructuring
const tarefasAlta = tarefas
  .filter(({ prioridade }) => prioridade === 'alta')
  .map(({ titulo, criadaEm }) => ({ titulo, criadaEm }));
    `,
    order_index: 4,
    prerequisites: ['objects-arrays'],
    difficulty_level: 'intermediate',
    estimated_time: 70,
    xp_reward: 120
  },
  {
    id: 'promises-async',
    title: 'Promises & async/await',
    description: 'Programação assíncrona em JavaScript',
    category_id: 'prerequisites',
    content: `
# Promises & async/await

## Promises

\`\`\`javascript
// Criando uma Promise
const minhaPromise = new Promise((resolve, reject) => {
  const sucesso = true;
  
  setTimeout(() => {
    if (sucesso) {
      resolve("Operação bem-sucedida!");
    } else {
      reject("Algo deu errado!");
    }
  }, 1000);
});

// Usando a Promise
minhaPromise
  .then(resultado => console.log(resultado))
  .catch(erro => console.error(erro));
\`\`\`

## async/await

\`\`\`javascript
async function exemploAsync() {
  try {
    const resultado = await minhaPromise;
    console.log(resultado);
  } catch (erro) {
    console.error(erro);
  }
}
\`\`\`
    `,
    code_example: `
// Exemplo: API de usuários
const buscarUsuario = async (id) => {
  try {
    const response = await fetch(\`https://api.exemplo.com/users/\${id}\`);
    
    if (!response.ok) {
      throw new Error(\`Erro HTTP: \${response.status}\`);
    }
    
    const usuario = await response.json();
    return usuario;
  } catch (erro) {
    console.error('Erro ao buscar usuário:', erro);
    throw erro;
  }
};

// Buscar múltiplos usuários
const buscarMultiplosUsuarios = async (ids) => {
  try {
    const promises = ids.map(id => buscarUsuario(id));
    const usuarios = await Promise.all(promises);
    return usuarios;
  } catch (erro) {
    console.error('Erro ao buscar usuários:', erro);
    return [];
  }
};
    `,
    order_index: 5,
    prerequisites: ['es6-features'],
    difficulty_level: 'intermediate',
    estimated_time: 80,
    xp_reward: 150
  },

  // React Basics
  {
    id: 'react-components',
    title: 'Components & JSX',
    description: 'Componentes React e sintaxe JSX',
    category_id: 'prerequisites',
    content: `
# Components & JSX

## Componentes Funcionais

\`\`\`jsx
// Componente simples
function Saudacao() {
  return <h1>Olá, mundo!</h1>;
}

// Com arrow function
const Despedida = () => {
  return <h1>Até logo!</h1>;
};

// Componente com props
const BoasVindas = ({ nome, idade }) => {
  return (
    <div>
      <h1>Bem-vindo, {nome}!</h1>
      <p>Você tem {idade} anos.</p>
    </div>
  );
};
\`\`\`

## JSX Rules

\`\`\`jsx
// Deve retornar um elemento pai
const Componente = () => {
  return (
    <div>
      <h1>Título</h1>
      <p>Parágrafo</p>
    </div>
  );
};

// Ou usar Fragment
const ComponenteFragment = () => {
  return (
    <>
      <h1>Título</h1>
      <p>Parágrafo</p>
    </>
  );
};
\`\`\`
    `,
    code_example: `
// Exemplo: Card de usuário
const UserCard = ({ usuario }) => {
  const { nome, email, avatar, ativo } = usuario;
  
  return (
    <div className="user-card">
      <img src={avatar} alt={nome} className="avatar" />
      <div className="info">
        <h3>{nome}</h3>
        <p>{email}</p>
        <span className={\`status \${ativo ? 'ativo' : 'inativo'}\`}>
          {ativo ? 'Online' : 'Offline'}
        </span>
      </div>
    </div>
  );
};

// Lista de usuários
const UserList = ({ usuarios }) => {
  return (
    <div className="user-list">
      {usuarios.map(usuario => (
        <UserCard key={usuario.id} usuario={usuario} />
      ))}
    </div>
  );
};
    `,
    order_index: 6,
    prerequisites: ['promises-async'],
    difficulty_level: 'beginner',
    estimated_time: 60,
    xp_reward: 100
  },

  // Ambiente e Ferramentas
  {
    id: 'nodejs-npm',
    title: 'Node.js & npm',
    description: 'Configuração do Node.js e gerenciamento de pacotes',
    category_id: 'environment',
    content: `
# Node.js & npm

## Instalação do Node.js

Node.js é necessário para executar ferramentas de desenvolvimento JavaScript.

### Verificar instalação
\`\`\`bash
node --version
npm --version
\`\`\`

## Gerenciamento de Pacotes

### npm (Node Package Manager)
\`\`\`bash
# Inicializar projeto
npm init -y

# Instalar dependências
npm install react react-native

# Instalar dependência de desenvolvimento
npm install --save-dev eslint

# Instalar globalmente
npm install -g expo-cli
\`\`\`

### package.json
\`\`\`json
{
  "name": "meu-app",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-native": "^0.72.0"
  }
}
\`\`\`
    `,
    code_example: `
// Exemplo: Scripts úteis no package.json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build:android": "expo build:android",
    "build:ios": "expo build:ios",
    "test": "jest",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
  },
  "dependencies": {
    "expo": "~49.0.0",
    "react": "18.2.0",
    "react-native": "0.72.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0"
  }
}
    `,
    order_index: 7,
    prerequisites: ['react-components'],
    difficulty_level: 'beginner',
    estimated_time: 30,
    xp_reward: 60
  }
]

// Função para obter tópicos por categoria
export const getTopicsByCategory = (categoryId) => {
  return topics.filter(topic => topic.category_id === categoryId)
    .sort((a, b) => a.order_index - b.order_index)
}

// Função para verificar se um tópico está desbloqueado
export const isTopicUnlocked = (topicId, completedTopics = []) => {
  const topic = topics.find(t => t.id === topicId)
  if (!topic) return false
  
  // Se não tem pré-requisitos, está desbloqueado
  if (!topic.prerequisites || topic.prerequisites.length === 0) {
    return true
  }
  
  // Verifica se todos os pré-requisitos foram completados
  return topic.prerequisites.every(prereq => completedTopics.includes(prereq))
}

// Função para calcular progresso por categoria
export const getCategoryProgress = (categoryId, completedTopics = []) => {
  const categoryTopics = getTopicsByCategory(categoryId)
  if (categoryTopics.length === 0) return 0
  
  const completedCount = categoryTopics.filter(topic => 
    completedTopics.includes(topic.id)
  ).length
  
  return Math.round((completedCount / categoryTopics.length) * 100)
} 