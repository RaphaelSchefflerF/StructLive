# 🧰 Tech Stack

Lista das principais tecnologias, versões e o "por quê".

## 📌 Versões Principais

| Tecnologia      | Versão | Onde Usar                |
|-----------------|--------|-------------------------|
| **Next.js**     | 15.2.1 | Framework principal     |
| **React**       | 19.0.0 | UI Components           |
| **TypeScript**  | 5.8.3  | Todo o projeto          |
| **Tailwind CSS**| 4.x    | Estilização             |
| **Vitest**      | 3.2.4  | Testes                  |
| **Node.js**     | >= 18  | Runtime (desenvolvimento)|

---

## Frontend

| Tech                              | Função                         | Onde                      |
| --------------------------------- | ------------------------------ | ------------------------- |
| Next.js (App Router)              | SSR, Rotas, API                | /src/app/\*               |
| React                             | Componentização                | Todos os .tsx             |
| TypeScript                        | Tipagem estática               | Projeto inteiro           |
| Tailwind CSS                      | Estilização utilitária         | classes em componentes    |
| shadcn/ui                         | Componentes acessíveis prontos | /src/components/ui        |
| lucide-react                      | Ícones                         | HomePage, etc.            |
| Monaco Editor (mencionado README) | Editor de código               | (arquivo não exibido)     |
| React Markdown                    | Render markdown                | (não exibido, mas citado) |

## Backend (Dentro do Next)

| Tech                              | Função                    |
| --------------------------------- | ------------------------- |
| NextAuth.js                       | Autenticação OAuth        |
| API Routes Next                   | Endpoints REST (route.ts) |
| Supabase JS SDK (suposição)       | Acesso ao banco           |
| RabbitMQ (amqplib ou lib similar) | Filas                     |

## IA

| Tech              | Função                             |
| ----------------- | ---------------------------------- |
| Google Gemini AI  | Gerar feedback e análise           |
| Prompt RAG custom | Contextualização (rag_contexts.ts) |

## Testes

| Tech            | Função                |
| --------------- | --------------------- |
| Vitest          | Runner de testes      |
| Testing Library | Testes de componentes |
| jsdom           | Simular DOM           |

## Infra / Dev

| Tech    | Função                                |
| ------- | ------------------------------------- |
| Docker  | Containerizar dependências (RabbitMQ) |
| OpenSSL | Gerar segredos                        |
| Git     | Versionamento                         |

## Por Que Essas Escolhas?

- Next.js unifica frontend e backend simples (menos sobrecarga).
- Tailwind acelera prototipagem.
- shadcn/ui evita reinventar componentes acessíveis.
- Supabase reduz tempo inicial comparado a montar DB + auth do zero.
- Gemini oferece explicações linguísticas boas para feedback educacional.

## Trade-offs

| Escolha            | Benefício                 | Custo                         |
| ------------------ | ------------------------- | ----------------------------- |
| Next.js App Router | API + páginas integradas  | Curva inicial                 |
| Supabase           | Rapidez                   | Dependência externa           |
| RabbitMQ           | Escalabilidade assíncrona | Overhead para módulos simples |
| IA externa         | Feedback rico             | Limite de custo e latência    |

## Versões Completas

Versões completas estão fixadas em `package.json` para reprodutibilidade.

Principais dependências:
- Next.js: 15.2.1
- React: 19.0.0
- TypeScript: 5.8.3
- Tailwind CSS: 4.x
- @monaco-editor/react: 4.7.0
- react-markdown: 10.1.0
- next-auth: 4.24.11
- @supabase/supabase-js: 2.49.4

## Sugestões Futuras

- Adicionar Zod para validação de schema
- Implementar i18n (ex: next-intl)
- Adicionar observabilidade (OpenTelemetry)
- Configurar Prettier para formatação automática
