# 🔧 Scripts de Automação

Este documento descreve os scripts de automação disponíveis no projeto StructLive para facilitar o desenvolvimento e a criação de novos módulos.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Script: create-module.ts](#script-create-modulets)
- [Script: create-type.ts](#script-create-typets)
- [Troubleshooting](#troubleshooting)

---

## Visão Geral

O StructLive possui dois scripts principais de automação que facilitam a criação de novos módulos e tipos:

1. **`create-module.ts`** - Cria um módulo completo com tipos
2. **`create-type.ts`** - Adiciona um novo tipo a um módulo existente

Ambos os scripts atualizam automaticamente os registros globais, garantindo consistência e reduzindo erros manuais.

---

## Script: create-module.ts

### Descrição

Cria um novo módulo de estrutura de dados completo com um ou mais tipos.

### Uso

```bash
npx tsx scripts/create-module.ts "<Nome do Módulo>" "<Tipo 1>" "<Tipo 2>" ...
```

### Parâmetros

- **Nome do Módulo** (obrigatório): Nome do módulo em formato legível (ex: "Pilha", "Árvores")
- **Tipos** (mínimo 1): Um ou mais tipos que o módulo terá (ex: "Pilha Estática", "Pilha Dinâmica")

### Exemplos

```bash
# Criar módulo simples com um tipo
npx tsx scripts/create-module.ts "Pilha" "Pilha Estática"

# Criar módulo com múltiplos tipos
npx tsx scripts/create-module.ts "Árvores" "Árvore Binária" "Árvore AVL" "Árvore Red-Black"

# Criar módulo de filas
npx tsx scripts/create-module.ts "Fila" "Fila Estática" "Fila Dinâmica" "Fila Circular"
```

### O que o script faz

1. **Cria a estrutura de diretórios:**
   ```
   src/app/estruturas/<modulo-kebab>/
   ├── types/
   │   ├── <tipo-1-kebab>/
   │   ├── <tipo-2-kebab>/
   │   └── ...
   ├── module.config.ts
   └── config.ts
   ```

2. **Para cada tipo, cria 5 arquivos:**
   - `theory.tsx` - Componente de teoria
   - `visualization.tsx` - Componente de visualização
   - `activity.tsx` - Componente de atividades
   - `challenge.tsx` - Componente de desafios
   - `config.ts` - Configuração do tipo

3. **Cria arquivos de configuração do módulo:**
   - `module.config.ts` - Metadados do módulo (ícone, título, descrição, complexidade)
   - `config.ts` - Registro de todos os tipos do módulo

4. **Atualiza registros globais automaticamente:**
   - `src/app/estruturas/index.ts` - Adiciona o módulo à lista global
   - `src/lib/structure-registries.ts` - Registra os tipos do módulo

### Estrutura dos Arquivos Gerados

#### module.config.ts
```typescript
export const PilhaModuleConfig = {
  id: "pilha",
  title: "Pilha",
  created: true,
  description: "Descrição do módulo Pilha.",
  icon: "🧩",  // Personalize este ícone!
  complexity: "Básico" as const,
  lessons: 2,  // Número de tipos
};
```

#### config.ts (do módulo)
```typescript
import { PilhaEstáticaConfig } from "./types/pilha-estatica/config";
import { PilhaDinâmicaConfig } from "./types/pilha-dinamica/config";

export const PilhaRegistry = {
  'pilha-estatica': PilhaEstáticaConfig,
  'pilha-dinamica': PilhaDinâmicaConfig,
};

export const PilhaOptions = Object.values(PilhaRegistry).map((item) => ({
  id: item.id,
  name: item.name,
  disabled: item.disabled,
}));
```

#### config.ts (de cada tipo)
```typescript
import Theory from "./theory";
import Visualization from "./visualization";
import Activity from "./activity";
import Challenge from "./challenge";

export const PilhaEstáticaConfig = {
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

---

## Script: create-type.ts

### Descrição

Adiciona um novo tipo a um módulo existente.

### Uso

```bash
npx tsx scripts/create-type.ts "<Nome do Módulo>" "<Nome do Tipo>"
```

### Parâmetros

- **Nome do Módulo** (obrigatório): Nome exato do módulo existente
- **Nome do Tipo** (obrigatório): Nome do novo tipo a ser adicionado

### Exemplos

```bash
# Adicionar tipo a módulo existente
npx tsx scripts/create-type.ts "Pilha" "Pilha com Lista Encadeada"

# Adicionar outro tipo de árvore
npx tsx scripts/create-type.ts "Árvores" "Árvore B"

# Adicionar tipo de fila
npx tsx scripts/create-type.ts "Fila" "Fila de Prioridade"
```

### O que o script faz

1. **Verifica se o módulo existe**
2. **Cria o diretório do novo tipo:**
   ```
   src/app/estruturas/<modulo>/types/<novo-tipo>/
   ```

3. **Cria os 5 arquivos do tipo:**
   - `theory.tsx`
   - `visualization.tsx`
   - `activity.tsx`
   - `challenge.tsx`
   - `config.ts`

4. **Atualiza automaticamente:**
   - `<modulo>/config.ts` - Adiciona o novo tipo ao registro
   - `<modulo>/module.config.ts` - Incrementa o contador de `lessons`

---

## Troubleshooting

### Erro: "Module already exists"

**Causa:** Você está tentando criar um módulo que já existe.

**Solução:**
- Use `create-type.ts` para adicionar um tipo ao módulo existente
- Ou delete o módulo existente primeiro se quiser recriá-lo

### Erro: "Module not found"

**Causa:** O script `create-type.ts` não encontrou o módulo especificado.

**Solução:**
- Verifique se o nome do módulo está correto
- Liste os módulos existentes: `ls src/app/estruturas/`

### Erro: "Cannot find module 'tsx'"

**Causa:** O pacote `tsx` não está instalado.

**Solução:**
```bash
npm install -D tsx
```

### Erro: "Permission denied"

**Causa:** Falta de permissões para criar arquivos.

**Solução:**
```bash
# Linux/Mac
chmod +x scripts/create-module.ts
chmod +x scripts/create-type.ts

# Ou execute com npx
npx tsx scripts/create-module.ts "..." "..."
```

### Tipo não aparece no seletor após criação

**Verificações:**
1. Verifique se `disabled: false` no arquivo `config.ts` do tipo
2. Reinicie o servidor de desenvolvimento:
   ```bash
   # Pare o servidor (Ctrl+C) e reinicie
   npm run dev
   ```
3. Limpe o cache do Next.js:
   ```bash
   rm -rf .next
   npm run dev
   ```

### Formatação/Case dos nomes

Os scripts automaticamente convertem os nomes para os formatos apropriados:

- **kebab-case**: Para diretórios e IDs (`pilha-estatica`)
- **PascalCase**: Para nomes de configuração TypeScript (`PilhaEstáticaConfig`)
- **Original**: Mantido para exibição na UI ("Pilha Estática")

---

## Ver Também

- [Guia de Criação de Módulos](modules.md) - Guia completo de uso
- [How to Add a Module](how-to-add-a-module.md) - Processo manual
- [Arquitetura](architecture.md) - Entenda a estrutura do projeto

---

**Dica:** Após criar um módulo, não esqueça de personalizar o ícone em `module.config.ts`! 🎨
