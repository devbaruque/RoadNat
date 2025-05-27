# RoadNat - Plataforma Gamificada para Aprender React Native

## 📋 Visão Geral do Projeto

**RoadNat** é uma plataforma educacional gamificada inspirada no Duolingo, focada no ensino de React Native através de um roadmap interativo e sistema de jogos.

## 🎯 Objetivos Principais

- Ensinar React Native de forma progressiva e interativa
- Gamificar o processo de aprendizado
- Fornecer roadmap visual baseado no roadmap.sh/react-native
- Criar comunidade de aprendizado

## 🏗️ Arquitetura Técnica

### Frontend
- **React.js** (versão mais recente)
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **Framer Motion** para animações
- **React Query** para gerenciamento de estado servidor

### Backend
- **Supabase** (PostgreSQL + Auth + Storage)
- **Edge Functions** para lógica complexa
- **Real-time subscriptions** para atualizações ao vivo

### Funcionalidades Adicionais
- **React Syntax Highlighter** para código
- **Confetti.js** para celebrações
- **Chart.js** para progresso visual
- **React Hot Toast** para notificações

## 📱 Funcionalidades Principais

### 1. Sistema de Autenticação
- Login/Cadastro com email
- Autenticação social (Google, GitHub)
- Recuperação de senha
- Perfil de usuário personalizável

### 2. Roadmap Interativo (Biblioteca)
- Visualização em formato de mapa/roadmap
- Navegação por categorias e subcategorias
- Indicadores de progresso visual
- Sistema de desbloqueio progressivo

### 3. Sistema de Aprendizado
- Conteúdo explicativo para cada tópico
- Exemplos de código interativos
- Playground para testar código
- Exercícios práticos

### 4. Gamificação Estilo Duolingo
- Sistema de XP (pontos de experiência)
- Streak (sequência de dias)
- Níveis e badges
- Rankings e competições
- Desafios diários/semanais

### 5. Jogo Principal - "Estrada do Conhecimento"
- Metáfora visual de uma estrada a percorrer
- Checkpoints representando tópicos
- Mini-jogos variados por tópico
- Sistema de vidas/energia
- Recompensas por conquistas

### 6. Perfil e Progresso
- Dashboard personalizado
- Estatísticas detalhadas
- Histórico de atividades
- Conquistas e certificados
- Configurações de perfil

## 🗄️ Estrutura do Banco de Dados (Supabase)

### Tabelas Principais

#### users
```sql
- id (uuid, primary key)
- email (text, unique)
- username (text, unique)
- full_name (text)
- avatar_url (text)
- level (integer, default: 1)
- total_xp (integer, default: 0)
- current_streak (integer, default: 0)
- longest_streak (integer, default: 0)
- created_at (timestamp)
- updated_at (timestamp)
```

#### roadmap_topics
```sql
- id (uuid, primary key)
- title (text)
- description (text)
- category_id (uuid, foreign key)
- content (text)
- code_example (text)
- order_index (integer)
- prerequisites (uuid[])
- difficulty_level (enum: beginner, intermediate, advanced)
- estimated_time (integer)
- xp_reward (integer)
- created_at (timestamp)
```

#### categories
```sql
- id (uuid, primary key)
- name (text)
- description (text)
- color (text)
- icon (text)
- order_index (integer)
```

#### user_progress
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key)
- topic_id (uuid, foreign key)
- status (enum: locked, available, in_progress, completed)
- score (integer)
- attempts (integer)
- completed_at (timestamp)
- created_at (timestamp)
```

#### game_sessions
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key)
- topic_id (uuid, foreign key)
- game_type (text)
- score (integer)
- time_taken (integer)
- correct_answers (integer)
- total_questions (integer)
- created_at (timestamp)
```

#### achievements
```sql
- id (uuid, primary key)
- name (text)
- description (text)
- icon (text)
- requirement_type (text)
- requirement_value (integer)
- xp_reward (integer)
```

#### user_achievements
```sql
- user_id (uuid, foreign key)
- achievement_id (uuid, foreign key)
- earned_at (timestamp)
```

## 🎮 Tipos de Jogos/Desafios

### 1. Quiz de Múltipla Escolha
- Perguntas conceituais sobre React Native
- Identificação de código correto
- Debugging de código

### 2. Complete o Código
- Preencher lacunas em código
- Ordenar linhas de código
- Matching de conceitos

### 3. Playground Interativo
- Editor de código em tempo real
- Visualização de resultado
- Desafios de implementação

### 4. Drag & Drop
- Montar componentes visualmente
- Organizar estrutura de pastas
- Sequenciar processo de desenvolvimento

### 5. Desafios Cronometrados
- Speed coding
- Identificação rápida de erros
- Trivia relâmpago

## 🗺️ Estrutura do Roadmap (Baseado no roadmap.sh)

### Fase 1: Pré-requisitos
- **JavaScript Fundamentals**
  - Variables & Data Types
  - Functions & Arrow Functions
  - Objects & Arrays
  - ES6+ Features
  - Promises & async/await

- **React Basics**
  - Components & JSX
  - Props & State
  - Event Handling
  - Conditional Rendering
  - Lists & Keys

### Fase 2: Ambiente e Ferramentas
- **Development Environment**
  - Node.js & npm
  - Expo CLI vs React Native CLI
  - Android Studio / Xcode
  - Emulators & Physical Devices

### Fase 3: React Native Core
- **Core Components**
  - View, Text, Image
  - Button, TouchableOpacity
  - ScrollView, FlatList
  - TextInput, Switch

- **Styling**
  - StyleSheet
  - Flexbox Layout
  - Dimensions & Platform

### Fase 4: Navegação e Estado
- **Navigation**
  - React Navigation
  - Stack, Tab, Drawer Navigation
  - Passing Parameters

- **State Management**
  - useState, useEffect
  - Context API
  - Redux (opcional)

### Fase 5: Recursos Avançados
- **Networking**
  - Fetch API
  - Axios
  - Error Handling

- **Storage**
  - AsyncStorage
  - SecureStore
  - File System

- **Native Features**
  - Camera & Image Picker
  - Location Services
  - Push Notifications

### Fase 6: Qualidade e Deploy
- **Testing**
  - Jest
  - React Native Testing Library
  - E2E Testing

- **Performance**
  - Optimization Techniques
  - Memory Management
  - Bundle Analysis

- **Deployment**
  - App Store Guidelines
  - Google Play Store
  - OTA Updates

## 🚀 Plano de Desenvolvimento - 6 Fases

### Fase 1: Fundação (2-3 semanas)
**Objetivos:** Configurar base técnica e autenticação

**Tarefas:**
- Setup do projeto React + Tailwind
- Configuração do Supabase
- Sistema de autenticação completo
- Design system básico
- Componentes base (Header, Footer, Layout)

**Entregáveis:**
- Login/Cadastro funcional
- Estrutura de projeto estabelecida
- Design system documentado

### Fase 2: Roadmap Visual (3-4 semanas)
**Objetivos:** Criar biblioteca interativa de conteúdo

**Tarefas:**
- Componente de roadmap visual
- Sistema de navegação entre tópicos
- Páginas de conteúdo com exemplos
- Sistema de progresso básico
- Responsividade mobile

**Entregáveis:**
- Roadmap interativo funcional
- Conteúdo dos primeiros 10 tópicos
- Sistema de navegação completo

### Fase 3: Sistema de Gamificação (3-4 semanas)
**Objetivos:** Implementar mecânicas de jogo

**Tarefas:**
- Sistema de XP e níveis
- Streak counter
- Badges e conquistas
- Dashboard de progresso
- Animações e feedback visual

**Entregáveis:**
- Sistema de pontuação funcional
- Dashboard completo
- Primeiras animações implementadas

### Fase 4: Jogos Principais (4-5 semanas)
**Objetivos:** Desenvolver diferentes tipos de jogos

**Tarefas:**
- Engine de quiz básico
- Sistema de "Complete o Código"
- Playground interativo
- Sistema de vidas/energia
- Feedback de respostas

**Entregáveis:**
- 3 tipos de jogos funcionais
- Sistema de feedback implementado
- Balanceamento inicial de dificuldade

### Fase 5: Recursos Avançados (3-4 semanas)
**Objetivos:** Implementar features complementares

**Tarefas:**
- Sistema de ranking
- Desafios diários
- Notificações
- Compartilhamento social
- Analytics básicos

**Entregáveis:**
- Ranking funcional
- Sistema de desafios
- Notificações implementadas

### Fase 6: Polimento e Deploy (2-3 semanas)
**Objetivos:** Finalizar e lançar

**Tarefas:**
- Testes extensivos
- Otimização de performance
- SEO e acessibilidade
- Deploy e CI/CD
- Documentação

**Entregáveis:**
- Aplicação testada e otimizada
- Deploy em produção
- Documentação completa

## 📊 Métricas de Sucesso

### Engajamento
- Tempo médio por sessão > 15 minutos
- Taxa de retorno diária > 30%
- Streak médio > 7 dias

### Aprendizado
- Taxa de conclusão de tópicos > 70%
- Score médio nos jogos > 80%
- Progressão no roadmap > 50% dos usuários

### Retenção
- Usuários ativos semanais
- Taxa de churn < 20% no primeiro mês
- NPS > 8.0

## 🔧 Ferramentas de Desenvolvimento

### Desenvolvimento
- **Vite** para build rápido
- **ESLint + Prettier** para qualidade de código
- **Husky** para git hooks
- **TypeScript** (opcional, mas recomendado)

### Testing
- **Vitest** para testes unitários
- **React Testing Library** para testes de componente
- **Playwright** para testes E2E

### Deployment
- **Vercel** ou **Netlify** para frontend
- **Supabase** para backend
- **GitHub Actions** para CI/CD

## 💡 Funcionalidades Futuras

### V2.0
- Modo multiplayer/competitivo
- Criação de conteúdo pela comunidade
- Certificações oficiais
- Integração com IDEs

### V3.0
- Mobile app nativo
- Modo offline
- Mentoria 1:1
- Projetos práticos guiados

## 🎨 Considerações de UX/UI

### Design Principles
- **Simplicidade:** Interface limpa e intuitiva
- **Feedback:** Resposta imediata às ações
- **Progressão:** Senso claro de avanço
- **Diversão:** Elementos lúdicos balanceados

### Accessibility
- Suporte a screen readers
- Navegação por teclado
- Contraste adequado
- Texto escalável

## 🔒 Segurança e Performance

### Segurança
- Sanitização de inputs
- Rate limiting
- Validação server-side
- Proteção CSRF

### Performance
- Lazy loading de componentes
- Otimização de imagens
- Cache inteligente
- Bundle splitting

---

## 📝 Próximos Passos

1. **Validação da Ideia:** Criar MVP com 5-10 tópicos
2. **Feedback Inicial:** Testar com pequeno grupo de usuários
3. **Iteração:** Refinar baseado no feedback
4. **Scale:** Expandir conteúdo e funcionalidades
5. **Comunidade:** Construir base de usuários engajados