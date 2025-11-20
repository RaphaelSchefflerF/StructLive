# 📝 TODO V3 - Ferramenta de Scaffolding de Módulos

> **Objetivo:** Criar uma página de configuração na aplicação que gera um script de shell para automatizar a criação de novos módulos e tipos, eliminando o trabalho manual e o risco de erros.

---

## ✅ Fase 1: Criação da Página e Navegação

- [x] **Task 1.1:** Criar o arquivo da página de configuração.
  - **Arquivo:** `src/app/configuracao/page.tsx` (nova rota)
  - **Descrição:** Criar o arquivo inicial para a nova página de UI.

- [x] **Task 1.2:** Adicionar um link de navegação na sidebar.
  - **Arquivo:** `src/components/sidebar/app-sidebar.tsx`
  - **Descrição:** Adicionar um novo ícone/botão na barra lateral para que os usuários possam acessar a página `/configuracao`.

## 🚀 Fase 2: Lógica de Geração do Script

- [x] **Task 2.1:** Criar o serviço de scaffolding.
  - **Arquivo:** `src/lib/scaffolding-service.ts` (novo arquivo)
  - **Descrição:** Desenvolver a lógica principal que recebe o nome do módulo e uma lista de tipos, e retorna uma string contendo o script `bash` completo para criar todas as pastas e arquivos necessários. Cada tipo deve gerar `theory.tsx`, `visualization.tsx`, `activity.tsx`, e `challenge.tsx`.

## 🎨 Fase 3: Interface do Usuário (UI)

- [x] **Task 3.1:** Desenvolver o formulário de entrada.
- [x] **Task 3.2:** Integrar a lógica de geração com a UI.
- [x] **Task 3.3:** Exibir o script gerado.

## 🧪 Fase 4: Validação

- [x] **Task 4.1:** Testar o fluxo completo.
  - **Descrição:** Usar a nova página para gerar o script para um módulo de teste (ex: "Grafo"). Copiar o script, executá-lo no terminal e verificar se todos os arquivos e pastas foram criados corretamente e com o conteúdo base esperado.
