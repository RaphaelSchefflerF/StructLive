# 📖 Guia de Extensibilidade da Plataforma StructLive

## 1. Análise da Arquitetura

A arquitetura desta plataforma foi projetada para ser **altamente modular e extensível**, seguindo o **Princípio Aberto/Fechado**. Isso significa que você pode adicionar novas funcionalidades (como estruturas de dados e seus tipos) **sem modificar o código existente** da interface do usuário.

O sistema funciona com base em três conceitos principais:

1.  **Módulos de Estrutura:** Cada estrutura de dados (como "Lista", "Pilha", "Fila") é um "módulo". Ele vive em sua própria pasta dentro de `src/app/estruturas/` e define seus metadados gerais (título, ícone, etc.).
2.  **Tipos de Estrutura:** Dentro de um módulo, podem existir várias implementações ou "tipos". Por exemplo, o módulo "Lista" possui os tipos "Lista Dinâmica Simplesmente Encadeada (LDSE)", "Lista Duplamente Encadeada (LDDE)", etc.
3.  **Registros Dinâmicos:** O sistema usa "registros" para descobrir e carregar dinamicamente os módulos e seus tipos. Um renderizador de conteúdo genérico (`StructureContentRenderer`) usa esses registros para exibir os componentes corretos (teoria, atividade, etc.) com base na URL, sem nunca precisar de uma lógica `if/else` ou `switch` para tratar cada estrutura.

Graças a essa arquitetura, o processo de extensão é simples, rápido e seguro.

---

## 2. Como Adicionar um Novo Módulo (Ex: Fila)

Adicionar uma estrutura de dados completamente nova, como "Fila", envolve criar os arquivos de configuração e os componentes de conteúdo. Nenhuma alteração na lógica da UI principal é necessária.

**Passo a passo:**

### Passo 2.1: Criar a Estrutura de Pastas

Crie a pasta principal para o módulo e a subpasta para o primeiro tipo.

```bash
mkdir -p src/app/estruturas/fila/types/fila-estatica
```

### Passo 2.2: Criar a Configuração do Módulo

Este arquivo define os metadados gerais da "Fila".

**Arquivo:** `src/app/estruturas/fila/module.config.ts`
```typescript
export const queueModuleConfig = {
  id: "fila",
  title: "Filas",
  created: true,
  description: "Estrutura de dados que segue o princípio FIFO (First-In, First-Out).",
  icon: "➡️",
  complexity: "Básico" as const,
  lessons: 4, // Exemplo
};
```

### Passo 2.3: Criar o Componente de Conteúdo (Placeholder)

Crie pelo menos um componente de conteúdo para o tipo "Fila Estática". Começaremos com a teoria.

**Arquivo:** `src/app/estruturas/fila/types/fila-estatica/theory.tsx`
```tsx
export default function Theory() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Teoria da Fila Estática</h2>
      <p>
        Conteúdo da teoria sobre Fila Estática será adicionado aqui.
      </p>
    </div>
  );
}
```
> **Nota:** Você pode criar os outros arquivos (`activity.tsx`, `challenge.tsx`, `visualization.tsx`) no mesmo local.

### Passo 2.4: Criar a Configuração do Tipo

Este arquivo define os componentes para o tipo "Fila Estática".

**Arquivo:** `src/app/estruturas/fila/types/fila-estatica/config.ts`
```typescript
import Theory from "./theory";
// Importe outros componentes aqui (Activity, Challenge, etc.)

export const queueStaticConfig = {
  id: "fila-estatica",
  name: "Fila Estática",
  components: {
    theory: Theory,
    visualization: () => <div>Visualização Indisponível</div>, // Placeholder
    activity: () => <div>Atividade Indisponível</div>,      // Placeholder
    challenge: () => <div>Desafio Indisponível</div>,       // Placeholder
  },
  disabled: false,
};
```

### Passo 2.5: Criar o Registro de Tipos da Fila

Este arquivo agrega todos os tipos que pertencem ao módulo "Fila".

**Arquivo:** `src/app/estruturas/fila/config.ts`
```typescript
import { queueStaticConfig } from "./types/fila-estatica/config";

export const queueRegistry = {
  'fila-estatica': queueStaticConfig,
  // Adicione outros tipos de fila aqui (ex: 'fila-dinamica': queueDynamicConfig)
};
```

### Passo 2.6: Registrar o Novo Módulo (2 alterações)

Finalmente, registre o módulo e seu registro de tipos nos arquivos centrais.

1.  **Registre o Módulo:**

    **Arquivo:** `src/app/estruturas/index.ts`
    ```typescript
    import { listsModuleConfig } from "./lista/module.config";
    import { stackModuleConfig } from "./pilha/module.config";
    import { queueModuleConfig } from "./fila/module.config"; // Adicione esta linha

    export const modules = [listsModuleConfig, stackModuleConfig, queueModuleConfig]; // Adicione ao array
    ```

2.  **Registre o Registro de Tipos:**

    **Arquivo:** `src/lib/structure-registries.ts`
    ```typescript
    import { listRegistry } from '@/app/estruturas/lista/config';
    import { stackRegistry } from '@/app/estruturas/pilha/config';
    import { queueRegistry } from '@/app/estruturas/fila/config'; // Adicione esta linha

    export const masterRegistry = {
      lista: listRegistry,
      pilha: stackRegistry,
      fila: queueRegistry, // Adicione esta linha
    };
    ```

**Pronto!** Ao iniciar a aplicação, o módulo "Fila" aparecerá automaticamente na interface.

---

## 3. Como Adicionar um Novo Tipo a um Módulo (Ex: Lista Circular)

Adicionar uma variação a uma estrutura existente é ainda mais simples.

1.  **Crie a Pasta e os Componentes:**
    Crie a pasta `src/app/estruturas/lista/types/lista-circular` e, dentro dela, os arquivos de conteúdo (`theory.tsx`, etc.).

2.  **Crie a Configuração do Tipo:**
    Crie o arquivo `src/app/estruturas/lista/types/lista-circular/config.ts` com a configuração do novo tipo, similar ao Passo 2.4.

3.  **Atualize o Registro do Módulo:**
    Abra o registro do módulo "Lista" e adicione o novo tipo.

    **Arquivo:** `src/app/estruturas/lista/config.ts`
    ```typescript
    // ... outras importações
    import { lcConfig } from "./types/lc/config"; // Supondo que lc seja "lista circular"

    export const listRegistry = {
      ldse: ldseConfig,
      ldde: lddeConfig,
      lc: lcConfig, // Adicione a nova linha
      // ... outros tipos
    };
    ```

**É só isso.** O novo tipo "Lista Circular" aparecerá no seletor dentro da página de Listas.

---

## 4. Como Modificar o Conteúdo (Ex: Atividade da LDDE)

Modificar o conteúdo é a tarefa mais fácil de todas.

1.  **Navegue até o arquivo:**
    Encontre o componente React correspondente ao conteúdo que deseja alterar. Por exemplo, para a atividade da "Lista Dinâmica Duplamente Encadeada":
    `src/app/estruturas/lista/types/ldde/activity.tsx`

2.  **Edite o componente:**
    Modifique o arquivo `.tsx` diretamente. Como cada pedaço de conteúdo é um componente React isolado, sua alteração não terá efeitos colaterais em outras partes da plataforma.

## Conclusão

A arquitetura atual é **robusta, escalável e de fácil manutenção**. A decisão de desacoplar a UI da lógica de conteúdo e usar um sistema de registros dinâmicos foi fundamental para alcançar esse nível de qualidade. Adicionar novas funcionalidades é um processo declarativo e de baixo risco.
