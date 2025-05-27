# Como Adicionar Conteúdo ao Roadmap

Este documento explica como adicionar novos tópicos e categorias ao roadmap do RoadNat.

## 📁 Estrutura de Dados

O conteúdo do roadmap está localizado em `src/constants/roadmapData.js` e é dividido em:

### Categories (Categorias)
```javascript
{
  id: 'categoria-id',           // ID único da categoria
  name: 'Nome da Categoria',    // Nome exibido
  description: 'Descrição...',  // Descrição da categoria
  color: '#3b82f6',            // Cor da categoria (hex)
  icon: '⚛️',                   // Emoji/ícone
  order: 1                     // Ordem de exibição
}
```

### Topics (Tópicos)
```javascript
{
  id: 'topico-id',                    // ID único do tópico
  title: 'Título do Tópico',          // Título exibido
  description: 'Descrição breve...',  // Descrição curta
  category_id: 'categoria-id',        // ID da categoria pai
  content: `# Conteúdo em Markdown`, // Conteúdo principal (markdown)
  code_example: `// Código exemplo`, // Exemplo de código
  order_index: 1,                    // Ordem dentro da categoria
  prerequisites: ['outro-topico'],    // Array de pré-requisitos
  difficulty_level: 'beginner',      // beginner|intermediate|advanced
  estimated_time: 60,               // Tempo estimado em minutos
  xp_reward: 100                     // XP ganho ao completar
}
```

## 🆕 Adicionando Nova Categoria

1. Abra `src/constants/roadmapData.js`
2. Adicione a nova categoria ao array `categories`:

```javascript
export const categories = [
  // ... categorias existentes
  {
    id: 'styling',
    name: 'Estilização',
    description: 'Styling e layout em React Native',
    color: '#ec4899',
    icon: '🎨',
    order: 4
  }
]
```

## 📝 Adicionando Novo Tópico

1. Adicione o tópico ao array `topics`:

```javascript
export const topics = [
  // ... tópicos existentes
  {
    id: 'flexbox-layout',
    title: 'Flexbox Layout',
    description: 'Sistema de layout flexível do React Native',
    category_id: 'styling',
    content: `
# Flexbox Layout

## O que é Flexbox?

Flexbox é o sistema de layout padrão do React Native, baseado no CSS Flexbox.

### Propriedades Principais

\`\`\`javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
\`\`\`

### Flex Direction

- \`row\`: Elementos em linha horizontal
- \`column\`: Elementos em coluna vertical (padrão)
- \`row-reverse\`: Linha horizontal reversa
- \`column-reverse\`: Coluna vertical reversa
    `,
    code_example: `
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlexboxExample = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>Box 1</Text>
      </View>
      <View style={styles.box}>
        <Text>Box 2</Text>
      </View>
      <View style={styles.box}>
        <Text>Box 3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FlexboxExample;
    `,
    order_index: 1,
    prerequisites: ['react-components'],
    difficulty_level: 'beginner',
    estimated_time: 45,
    xp_reward: 80
  }
]
```

## 📖 Formatação do Conteúdo

### Markdown Suportado
- **Títulos**: `# ## ###`
- **Texto em negrito**: `**texto**`
- **Código inline**: `` `código` ``
- **Blocos de código**: ````javascript`
- **Listas**: `- item` ou `1. item`
- **Links**: `[texto](url)`

### Blocos de Código
Use syntax highlighting especificando a linguagem:

````markdown
```javascript
const exemplo = "código JavaScript";
```

```jsx
const Componente = () => <Text>JSX</Text>;
```

```bash
npm install react-native
```
````

## 🔗 Sistema de Pré-requisitos

Os pré-requisitos controlam quando um tópico fica disponível:

```javascript
{
  id: 'topico-avancado',
  // ... outras propriedades
  prerequisites: ['topico-basico-1', 'topico-basico-2']
}
```

**Regras:**
- Tópicos sem pré-requisitos ficam disponíveis imediatamente
- Tópicos com pré-requisitos só ficam disponíveis quando todos os pré-requisitos são completados
- Use IDs exatos dos tópicos pré-requisitos

## 🎯 Níveis de Dificuldade

### `beginner` (Iniciante)
- Conceitos básicos
- Primeiros passos
- Cor: Verde

### `intermediate` (Intermediário)
- Conceitos mais complexos
- Combinação de conhecimentos
- Cor: Amarelo

### `advanced` (Avançado)
- Conceitos complexos
- Otimizações e padrões avançados
- Cor: Vermelho

## ⏱️ Tempo Estimado

Defina o tempo em minutos baseado em:
- Leitura do conteúdo
- Compreensão dos exemplos
- Prática básica

**Sugestões:**
- Tópicos básicos: 30-60 minutos
- Tópicos intermediários: 45-90 minutos
- Tópicos avançados: 60-120 minutos

## 🏆 Sistema de XP

O XP deve ser proporcional à dificuldade e tempo:

**Fórmula sugerida:**
- Beginner: 60-100 XP
- Intermediate: 80-150 XP
- Advanced: 120-200 XP

## 🔄 Atualizando Conteúdo Existente

Para atualizar um tópico existente:

1. Encontre o tópico pelo `id`
2. Modifique as propriedades necessárias
3. Mantenha o `id` inalterado para preservar o progresso dos usuários

## 🧪 Testando Novo Conteúdo

1. Adicione o conteúdo
2. Execute `npm run dev`
3. Navegue para `/roadmap`
4. Verifique se:
   - A categoria aparece corretamente
   - O tópico está na categoria certa
   - O conteúdo renderiza bem no modal
   - Os pré-requisitos funcionam
   - O progresso é calculado corretamente

## 📋 Checklist para Novo Conteúdo

- [ ] ID único e descritivo
- [ ] Título claro e conciso
- [ ] Descrição informativa
- [ ] Categoria correta
- [ ] Conteúdo markdown bem formatado
- [ ] Exemplo de código funcional
- [ ] Pré-requisitos corretos
- [ ] Nível de dificuldade apropriado
- [ ] Tempo estimado realista
- [ ] XP balanceado
- [ ] Testado no navegador

## 🚀 Próximos Passos

Após adicionar conteúdo, considere:

1. **Feedback dos usuários**: Monitore se o conteúdo está claro
2. **Balanceamento**: Ajuste XP e tempo baseado no uso real
3. **Expansão**: Adicione mais tópicos relacionados
4. **Interatividade**: Considere adicionar exercícios práticos

---

**Dica:** Mantenha o conteúdo focado e prático. Os usuários preferem exemplos reais a explicações muito teóricas. 