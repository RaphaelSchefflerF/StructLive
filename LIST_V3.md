# 📋 Lista de Tarefas V3 - Arquitetura de Módulos Escalável

> **Objetivo:** Corrigir o bug da estrutura ausente, refatorar o registro de módulos para ser à prova de erros e adicionar a estrutura de dados "Fila" como validação final da arquitetura.

---

## ✅ Fase 1: Correção e Refatoração do Registro

- [x] **Task 1.1:** Corrigir o registro de estruturas de dados.

  - **Arquivo:** `src/config/structures.config.ts`
  - **Descrição:** O registro atual contém apenas a "Pilha", fazendo com que a "Lista" não apareça na aplicação. É preciso corrigir o array `dataStructures` para incluir ambas.

- [x] **Task 1.2:** Centralizar a exportação dos módulos.

  - **Arquivo:** `src/app/estruturas/index.ts` (novo arquivo)
  - **Descrição:** Criar um arquivo `index.ts` que importa e reexporta todas as configurações de módulo (`module.config.ts`) de dentro da pasta `estruturas`. Isso evita a necessidade de adicionar manualmente cada importação no arquivo de registro principal.

- [ ] **Task 1.3:** Simplificar o registro global.
  - **Arquivo:** `src/config/structures.config.ts`
  - **Descrição:** Modificar o registro global para importar o array de módulos do novo `index.ts`. O registro se tornará mais limpo e não precisará mais ser modificado ao adicionar novas estruturas.
