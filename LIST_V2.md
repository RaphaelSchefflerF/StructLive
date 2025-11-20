# 📋 Lista de Tarefas V2 - Correções Pós-Auditoria

> **Objetivo:** Corrigir todos os problemas de extensibilidade identificados na auditoria (AUDIT.md) e atingir nota 9-10/10, eliminando a duplicação de código e o acoplamento entre as estruturas de dados.

**Baseado em:** AUDIT.md
**Problemas Identificados:** 2 críticos, 1 melhoria

---

## 🎯 Fase 4 - CORREÇÕES PÓS-AUDITORIA (CRÍTICO)

### 4.1 - Desacoplar Configuração de Estruturas (Resolvendo Problema Crítico #2)

- [x] **Task 4.1.1:** Criar arquivo de configuração para o módulo `lista`
  - **Origem:** AUDIT.md - Problema Crítico #2
  - **Arquivo:** `src/app/estruturas/lista/module.config.ts` (novo arquivo)
  - **Descrição:** Externalizar os metadados da estrutura "Listas" (atualmente hardcoded em `AppContext.tsx`) para seu próprio arquivo de configuração de módulo.
  - **Implementação:** Crie o arquivo com o seguinte conteúdo:
    ```typescript
    export const listsModuleConfig = {
      id: "lista",
      title: "Listas",
      created: true,
      description: "Estrutura de dados que organiza elementos de forma sequencial com operações de inserção e remoção flexíveis.",
      icon: "📝",
      complexity: "Básico" as const,
      lessons: 5,
    };
    ```
  - **Resultado esperado:** O arquivo é criado e exporta a configuração do módulo de listas.

- [x] **Task 4.1.2:** Criar o registro global de estruturas
  - **Origem:** AUDIT.md - Problema Crítico #2
  - **Arquivo:** `src/config/structures.config.ts` (novo arquivo em nova pasta)
  - **Descrição:** Criar uma "fonte única da verdade" para todas as estruturas de dados da plataforma. Este registro irá importar as configurações de cada módulo.
  - **Implementação:** Crie a pasta `src/config` e o arquivo com o seguinte conteúdo:
    ```typescript
    import { listsModuleConfig } from '@/app/estruturas/lista/module.config';

    export const dataStructures = [listsModuleConfig];
    ```
  - **Resultado esperado:** O registro global é criado e exporta um array `dataStructures` contendo apenas a configuração de listas por enquanto.

- [x] **Task 4.1.3:** Refatorar `AppContext.tsx` para usar o registro global
  - **Origem:** AUDIT.md - Problema Crítico #2
  - **Arquivo:** `src/contexts/AppContext.tsx`
  - **Descrição:** Modificar o `AppContext` para que ele consuma a lista de estruturas do novo registro central, em vez de tê-la hardcoded. Isso resolve a violação do Princípio Aberto/Fechado.
  - **Implementação:**
    1. Remova o array `const dataStructures` de dentro do arquivo.
    2. Adicione a importação: `import { dataStructures } from '@/config/structures.config';`
  - **Resultado esperado:** O `AppContext` passa a usar a configuração centralizada. A aplicação deve continuar funcionando exatamente como antes, sem nenhuma mudança visual.
  - **Validação:** Iniciar a aplicação e verificar se o item "Listas" ainda aparece corretamente na sidebar.

### 4.2 - Generalizar a UI de Estruturas (Resolvendo Problema Crítico #1)

- [x] **Task 4.2.1:** Criar rota dinâmica para estruturas
  - **Origem:** AUDIT.md - Problema Crítico #1
  - **Ação:** Renomear a pasta `src/app/estruturas/lista` para `src/app/estruturas/[structureId]`.
  - **Descrição:** Esta é a principal mudança para generalizar a UI. Em vez de uma rota fixa para `/lista`, teremos uma rota dinâmica que responde a qualquer ID de estrutura (ex: `/lista`, `/pilha`).
  - **Implementação:** Use o comando `mv` para renomear a pasta.
  - **Resultado esperado:** A estrutura de pastas reflete uma rota dinâmica. A aplicação irá quebrar temporariamente até a próxima tarefa ser concluída.
  - **⚠️ Aviso:** A aplicação ficará em estado quebrado até a conclusão da Task 4.2.3.

- [x] **Task 4.2.2:** Generalizar o `page.tsx` da estrutura
  - **Origem:** AUDIT.md - Problema Crítico #1
  - **Arquivo:** `src/app/estruturas/[structureId]/page.tsx` (arquivo movido)
  - **Descrição:** Adaptar a página para que ela seja genérica. Ela deve usar o `structureId` da URL para buscar os dados da estrutura correta e renderizar o conteúdo dinamicamente.
  - **Implementação:**
    1. Modificar a função `ListPage` para receber `{ params }: { params: { structureId: string } }`.
    2. Usar o `useAppContext` e a função `getStructureById(params.structureId)` para obter os metadados (título, descrição) e renderizá-los no cabeçalho, substituindo o texto "Listas".
    3. Envolver o `<Select>` de tipos em uma verificação condicional, para que ele só apareça se a estrutura tiver múltiplos tipos (ex: `if (params.structureId === 'lista')`).
  - **Resultado esperado:** Acessar `/estruturas/lista` deve renderizar a página novamente, mas agora com o título e descrição vindos do contexto, e não mais hardcoded.

- [x] **Task 4.2.3:** Criar um registro mestre de tipos
  - **Origem:** AUDIT.md - Problema Crítico #1
  - **Arquivo:** `src/lib/structure-registries.ts` (novo arquivo)
  - **Descrição:** Criar um registro central que mapeia um `structureId` ao seu respectivo registro de tipos (ex: `lista` -> `listRegistry`). Isso é essencial para o renderizador genérico saber onde encontrar os componentes de cada estrutura.
  - **Implementação:** Crie a pasta `src/lib` e o arquivo com o seguinte conteúdo:
    ```typescript
    import { listRegistry } from '@/app/estruturas/[structureId]/config'; // O path será ajustado

    export const masterRegistry = {
      lista: listRegistry,
      // Futuramente: pilha: stackRegistry
    };
    ```
  - **Resultado esperado:** O registro mestre é criado.

- [x] **Task 4.2.4:** Generalizar o `ContentRenderer`
  - **Origem:** AUDIT.md - Problema Crítico #1
  - **Arquivo:** `src/app/estruturas/[structureId]/components/list-content-renderer.tsx`
  - **Descrição:** Transformar o `ListContentRenderer` em um `StructureContentRenderer` universal.
  - **Implementação:**
    1. Renomeie o arquivo para `structure-content-renderer.tsx`.
    2. Modifique o componente para que ele receba `structureId` como prop.
    3. Use o `masterRegistry` para encontrar o registro de tipos correto (ex: `masterRegistry[structureId]`).
    4. Use o registro encontrado para renderizar o componente de conteúdo específico.
  - **Resultado esperado:** O renderizador agora é capaz de lidar com qualquer tipo de estrutura, não apenas listas.

- [x] **Task 4.2.5:** Finalizar a adaptação da página genérica
  - **Origem:** AUDIT.md - Problema Crítico #1
  - **Arquivo:** `src/app/estruturas/[structureId]/page.tsx`
  - **Descrição:** Atualizar a página para usar o novo `StructureContentRenderer`.
  - **Implementação:** Substitua as chamadas a `ListContentRenderer` por `StructureContentRenderer`, passando a prop `structureId={params.structureId}`.
  - **Resultado esperado:** A página `/estruturas/lista` volta a funcionar 100%, mas agora através de uma arquitetura totalmente genérica e reutilizável.
  - **Validação:** Testar a navegação para `/estruturas/lista` e verificar que todas as abas e tipos de lista funcionam como antes.

### 4.3 - Teste Final de Extensibilidade

- [x] **Task 4.3.1:** Adicionar a estrutura "Pilha" (demonstração)
  - **Origem:** AUDIT.md - Cenário 2
  - **Descrição:** Executar o processo de adicionar uma nova estrutura "Pilha" para validar que a duplicação de código foi eliminada.
  - **Implementação:**
    1. Criar `src/app/estruturas/pilha/module.config.ts` com os metadados da Pilha.
    2. Criar `src/app/estruturas/pilha/types/pilha-estatica/` com um componente `theory.tsx` simples.
    3. Criar `src/app/estruturas/pilha/types/pilha-estatica/config.ts` para o tipo "Pilha Estática".
    4. Criar `src/app/estruturas/pilha/config.ts` (o registro de tipos da pilha).
    5. Atualizar `src/config/structures.config.ts` para registrar o módulo de Pilha.
    6. Atualizar `src/lib/structure-registries.ts` para registrar o `stackRegistry`.
  - **Resultado esperado:** Uma nova estrutura "Pilha" aparece na sidebar e a página `/estruturas/pilha` carrega o conteúdo de teoria, **sem ter criado uma nova `page.tsx` ou um novo renderer**.
  - **Validação:** Este é o teste final. Se bem-sucedido, a refatoração atingiu seu objetivo principal.

---

## 📊 Métricas de Sucesso (Pós-Fase 4)

### Antes (Pós-Fase 1-3)
- ❌ **Nova Estrutura:** Exigia ~90% de duplicação de código e modificação de arquivos centrais.

### Depois da Fase 4
- ✅ **Nova Estrutura:** Exige 0% de duplicação de UI. O processo é puramente declarativo (criação de arquivos de configuração e componentes de conteúdo).

---