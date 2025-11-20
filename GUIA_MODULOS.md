# Guia Completo de Criação e Personalização de Módulos

Este guia explica como usar os scripts de automação para criar módulos e como personalizar cada aspecto do módulo criado.

---

## 📋 Índice

1. [Comandos Disponíveis](#comandos-disponíveis)
2. [O Que Cada Comando Faz](#o-que-cada-comando-faz)
3. [Como Personalizar um Módulo](#como-personalizar-um-módulo)
4. [Estrutura de Arquivos Gerada](#estrutura-de-arquivos-gerada)
5. [Exemplos Práticos](#exemplos-práticos)

---

## 🚀 Comandos Disponíveis

### 1. Criar um Novo Módulo

```bash
npx tsx scripts/create-module.ts "Nome do Módulo" "Tipo 1" "Tipo 2" ...
```

**Exemplo:**
```bash
npx tsx scripts/create-module.ts "Pilha" "Pilha Estática" "Pilha Dinâmica"
```

### 2. Adicionar um Tipo a um Módulo Existente

```bash
npx tsx scripts/create-type.ts "Nome do Módulo" "Nome do Novo Tipo"
```

**Exemplo:**
```bash
npx tsx scripts/create-type.ts "Pilha" "Pilha com Lista"
```

---

## 🔍 O Que Cada Comando Faz

### Comando `create-module.ts`

Quando você executa:
```bash
npx tsx scripts/create-module.ts "Pilha" "Pilha Estática" "Pilha Dinâmica"
```

**Passo 1: Criação de Pastas**
```
src/app/estruturas/pilha/
├── types/
│   ├── pilha-estatica/
│   └── pilha-dinamica/
```

**Passo 2: Criação de Componentes para Cada Tipo**

Para cada tipo (ex: "Pilha Estática"), cria 4 arquivos:

1. **`theory.tsx`** - Componente de teoria
```tsx
export default function Theory() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Teoria de Pilha Estática</h2>
      <p>Conteúdo da teoria sobre Pilha Estática será adicionado aqui.</p>
    </div>
  );
}
```

2. **`visualization.tsx`** - Componente de visualização
```tsx
export default function Visualization() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Visualização de Pilha Estática</h2>
      <p>Componente de visualização de Pilha Estática será adicionado aqui.</p>
    </div>
  );
}
```

3. **`activity.tsx`** - Componente de atividades
```tsx
export default function Activity() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Atividade de Pilha Estática</h2>
      <p>Componente de atividade de Pilha Estática será adicionado aqui.</p>
    </div>
  );
}
```

4. **`challenge.tsx`** - Componente de desafios
```tsx
export default function Challenge() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Desafio de Pilha Estática</h2>
      <p>Componente de desafio de Pilha Estática será adicionado aqui.</p>
    </div>
  );
}
```

5. **`config.ts`** - Configuração do tipo
```typescript
import Theory from "./theory";
import Visualization from "./visualization";
import Activity from "./activity";
import Challenge from "./challenge";

export const PilhaEstticaConfig = {
  id: "pilha-estatica",
  name: "Pilha Estática",
  components: {
    theory: Theory,
    visualization: Visualization,
    activity: Activity,
    challenge: Challenge,
  },
  disabled: false,
};
```

**Passo 3: Criação de Arquivos de Configuração do Módulo**

1. **`module.config.ts`** - Metadados do módulo
```typescript
export const PilhaModuleConfig = {
  id: "pilha",
  title: "Pilhas",
  created: true,
  description: "Descrição do módulo Pilha.",
  icon: "🧩",  // ← Ícone padrão
  complexity: "Básico" as const,
  lessons: 2,  // ← Número de tipos criados
};
```

2. **`config.ts`** - Registro de tipos do módulo
```typescript
import { PilhaEstticaConfig } from "./types/pilha-estatica/config";
import { PilhaDinmicaConfig } from "./types/pilha-dinamica/config";

export const PilhaRegistry = {
  'pilha-estatica': PilhaEstticaConfig,
  'pilha-dinamica': PilhaDinmicaConfig,
};

export const PilhaOptions = Object.values(PilhaRegistry).map((item) => ({
  id: item.id,
  name: item.name,
  disabled: item.disabled,
}));
```

**Passo 4: Registro Automático Global**

Atualiza automaticamente dois arquivos:

1. **`src/app/estruturas/index.ts`**
```typescript
import { listsModuleConfig } from "./lista/module.config";
import { PilhaModuleConfig } from "./pilha/module.config"; // ← NOVO

export const modules = [listsModuleConfig, PilhaModuleConfig]; // ← NOVO
```

2. **`src/lib/structure-registries.ts`**
```typescript
import { listRegistry } from '@/app/estruturas/lista/config';
import { PilhaRegistry } from '@/app/estruturas/pilha/config'; // ← NOVO

export const masterRegistry = {
  lista: listRegistry,
  pilha: PilhaRegistry, // ← NOVO
};
```

---

## 🎨 Como Personalizar um Módulo

### 1. Alterar o Ícone do Módulo

**Arquivo:** `src/app/estruturas/[modulo]/module.config.ts`

```typescript
export const PilhaModuleConfig = {
  id: "pilha",
  title: "Pilhas",
  created: true,
  description: "Descrição do módulo Pilha.",
  icon: "📚",  // ← MUDE AQUI! Use qualquer emoji
  complexity: "Básico" as const,
  lessons: 2,
};
```

**Ícones sugeridos:**
- Pilha: 📚, 🥞, 📦
- Fila: 🎟️, 🚶, 🚦
- Árvore: 🌳, 🌲, 🎄
- Grafo: 🕸️, 🔗, 🗺️
- Hash: #️⃣, 🔑, 📊

### 2. Alterar o Título e Descrição

**Arquivo:** `src/app/estruturas/[modulo]/module.config.ts`

```typescript
export const PilhaModuleConfig = {
  id: "pilha",
  title: "Estrutura Pilha (Stack)", // ← Título exibido na UI
  created: true,
  description: "Uma estrutura LIFO (Last In, First Out) fundamental para desenvolvimento de software.", // ← Descrição
  icon: "📚",
  complexity: "Básico" as const,
  lessons: 2,
};
```

### 3. Alterar a Complexidade

**Arquivo:** `src/app/estruturas/[modulo]/module.config.ts`

```typescript
export const PilhaModuleConfig = {
  // ... outros campos
  complexity: "Intermediário" as const, // Opções: "Básico", "Intermediário", "Avançado"
  // ...
};
```

### 4. Desabilitar um Tipo Específico

Se você quiser que um tipo não apareça no seletor (enquanto desenvolve):

**Arquivo:** `src/app/estruturas/[modulo]/types/[tipo]/config.ts`

```typescript
export const PilhaEstticaConfig = {
  id: "pilha-estatica",
  name: "Pilha Estática",
  components: {
    theory: Theory,
    visualization: Visualization,
    activity: Activity,
    challenge: Challenge,
  },
  disabled: true, // ← MUDE PARA true PARA DESABILITAR
};
```

### 5. Renomear um Tipo

**Arquivo:** `src/app/estruturas/[modulo]/types/[tipo]/config.ts`

```typescript
export const PilhaEstticaConfig = {
  id: "pilha-estatica",  // ← ID (usado na URL, não mude)
  name: "Pilha com Array (Estática)", // ← NOME EXIBIDO - mude aqui!
  // ...
};
```

### 6. Personalizar o Conteúdo dos Componentes

Edite diretamente os arquivos `.tsx` em `src/app/estruturas/[modulo]/types/[tipo]/`:

**Exemplo - `theory.tsx`:**
```tsx
export default function Theory() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">O que é uma Pilha?</h2>
      
      <p className="text-lg">
        Uma pilha é uma estrutura de dados linear que segue o princípio LIFO
        (Last In, First Out).
      </p>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Operações Principais:</h3>
        <ul className="list-disc list-inside">
          <li><strong>Push</strong>: Adiciona um elemento no topo</li>
          <li><strong>Pop</strong>: Remove o elemento do topo</li>
          <li><strong>Peek</strong>: Visualiza o elemento do topo sem remover</li>
        </ul>
      </div>
    </div>
  );
}
```

---

## 📁 Estrutura de Arquivos Gerada

Quando você cria um módulo "Pilha" com tipos "Pilha Estática" e "Pilha Dinâmica":

```
src/app/estruturas/
├── index.ts                    # ✅ Atualizado automaticamente
├── pilha/                      # 🆕 Módulo criado
│   ├── module.config.ts        # Metadados do módulo (ícone, título, etc.)
│   ├── config.ts               # Registro dos tipos
│   └── types/
│       ├── pilha-estatica/
│       │   ├── theory.tsx      # Componente de teoria
│       │   ├── visualization.tsx
│       │   ├── activity.tsx
│       │   ├── challenge.tsx
│       │   └── config.ts       # Config do tipo
│       └── pilha-dinamica/
│           ├── theory.tsx
│           ├── visualization.tsx
│           ├── activity.tsx
│           ├── challenge.tsx
│           └── config.ts

src/lib/
└── structure-registries.ts     # ✅ Atualizado automaticamente
```

---

## 💡 Exemplos Práticos

### Exemplo 1: Criar Módulo "Árvores"

```bash
npx tsx scripts/create-module.ts "Árvores" "Árvore Binária" "Árvore AVL" "Árvore Red-Black"
```

Isso cria:
- ✅ Módulo "Árvores" com 3 tipos
- ✅ 12 componentes (4 por tipo)
- ✅ Registros automáticos

**Depois, personalize o ícone:**
1. Abra `src/app/estruturas/arvores/module.config.ts`
2. Mude `icon: "🧩"` para `icon: "🌳"`

### Exemplo 2: Adicionar Tipo a Módulo Existente

```bash
npx tsx scripts/create-type.ts "Pilha" "Pilha com Lista Encadeada"
```

Isso:
- ✅ Cria a pasta `pilha/types/pilha-com-lista-encadeada/`
- ✅ Gera os 4 componentes + config
- ✅ Atualiza `pilha/config.ts` automaticamente
- ✅ Incrementa `lessons` em `module.config.ts`

### Exemplo 3: Workflow Completo

1. **Criar o módulo:**
   ```bash
   npx tsx scripts/create-module.ts "Grafo" "Grafo Não Direcionado"
   ```

2. **Personalizar o ícone:**
   - Edite `src/app/estruturas/grafo/module.config.ts`
   - Mude `icon: "🧩"` para `icon: "🕸️"`

3. **Implementar a teoria:**
   - Edite `src/app/estruturas/grafo/types/grafo-nao-direcionado/theory.tsx`
   - Adicione conteúdo educacional completo

4. **Adicionar mais um tipo:**
   ```bash
   npx tsx scripts/create-type.ts "Grafo" "Grafo Direcionado"
   ```

5. **Testar:**
   - Acesse `http://localhost:3000/estruturas/grafo`
   - O seletor mostrará os 2 tipos automaticamente!

---

## 🔧 Solução de Problemas

### Problema: "Module already exists"
**Solução:** O módulo já existe. Use `create-type.ts` para adicionar tipos ou delete a pasta primeiro.

### Problema: Tipo não aparece no seletor
**Verificações:**
1. Certifique-se que `disabled: false` no `config.ts` do tipo
2. Verifique se o módulo está em `src/app/estruturas/index.ts`
3. Verifique se o tipo está registrado em `[modulo]/config.ts`

### Problema: Ícone não aparece
**Solução:** Use um emoji válido. Evite caracteres especiais que não sejam emojis.

---

## 📚 Referência Rápida

| Ação | Arquivo a Editar |
|------|------------------|
| Mudar ícone | `[modulo]/module.config.ts` → `icon` |
| Mudar título | `[modulo]/module.config.ts` → `title` |
| Mudar descrição | `[modulo]/module.config.ts` → `description` |
| Desabilitar tipo | `[modulo]/types/[tipo]/config.ts` → `disabled` |
| Renomear tipo | `[modulo]/types/[tipo]/config.ts` → `name` |
| Editar conteúdo | `[modulo]/types/[tipo]/[componente].tsx` |

---

**Última atualização:** Novembro 2024
