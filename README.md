# 🏗️ StructLive

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

> Plataforma visual e interativa para aprender Estruturas de Dados passo a passo.

## 🎯 Sobre

O StructLive é uma plataforma educacional que oferece uma experiência completa e interativa para aprendizado de estruturas de dados:

- **📚 Teoria Interativa**: Conteúdo didático rico e acessível
- **🎨 Visualizações Animadas**: Veja estruturas de dados em ação
- **💻 Desafios Práticos**: Editor de código com análise por IA
- **🎮 Atividades Gamificadas**: Questionários com sistema de progresso
- **📊 Estruturas Disponíveis**: Listas (LDSE, LDDE, LEE, LES) e mais

## 🚀 Início Rápido

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd next-structlive

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: **http://localhost:3000**

> 💡 **Primeira vez?** Veja o [Guia de Setup](docs/setup.md) detalhado.

## 📚 Documentação

A documentação completa está organizada na pasta [`docs/`](docs/):

### 🎯 Essenciais

- **[📖 Documentação Completa](docs/README.md)** - Índice de toda a documentação
- **[🏗️ Arquitetura](docs/architecture.md)** - Estrutura e organização do projeto
- **[⚙️ Setup](docs/setup.md)** - Guia completo de instalação e configuração
- **[🧩 Criando Módulos](docs/modules.md)** - Como criar novos módulos automaticamente

### 🛠️ Desenvolvimento

- **[🔧 Scripts](docs/scripts.md)** - Scripts de automação disponíveis
- **[🧪 Testes](docs/testing.md)** - Como executar e escrever testes

### 🚀 Deploy & Referência

- **[🚀 Deployment](docs/deployment.md)** - Como fazer deploy em produção
- **[📊 Stack Técnica](docs/tech-stack.md)** - Tecnologias utilizadas
- **[❓ FAQ](docs/faq.md)** - Perguntas frequentes
- **[📝 Glossário](docs/glossary.md)** - Termos e definições

## 🛠️ Stack Técnica

### Frontend

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface
- **TypeScript 5.8** - Linguagem tipada
- **Tailwind CSS 4** - Framework de estilos
- **shadcn/ui** - Componentes de interface

### Backend & Serviços

- **NextAuth.js** - Autenticação
- **Supabase** - Banco de dados PostgreSQL
- **Google Gemini AI** - Análise de código por IA
- **RabbitMQ** - Sistema de filas

### Testes & Qualidade

- **Vitest** - Framework de testes
- **Testing Library** - Testes de componentes
- **ESLint** - Linting de código

> 📚 Veja mais detalhes em [Tech Stack](docs/tech-stack.md)

## 📁 Estrutura do Projeto

```
next-structlive/
├── src/
│   ├── app/                  # App Router (Next.js 15)
│   │   ├── api/             # API Routes
│   │   └── estruturas/      # Páginas de estruturas de dados
│   ├── components/          # Componentes reutilizáveis
│   │   └── ui/             # Componentes shadcn/ui
│   └── lib/                # Utilitários e configurações
├── docs/                    # 📚 Documentação completa
├── scripts/                 # 🔧 Scripts de automação
├── workers/                 # ⚙️ Workers RabbitMQ
└── __tests__/              # 🧪 Testes unitários
```

> 📖 Veja a [Arquitetura Completa](docs/architecture.md)

## ⚡ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento
npm run start:worker     # Inicia worker RabbitMQ

# Build & Produção
npm run build           # Build de produção
npm start               # Inicia servidor de produção

# Testes
npm test                # Executa testes
npm run test:watch      # Testes em modo watch
npm run test:ui         # Interface visual de testes
npm run coverage        # Relatório de cobertura

# Qualidade de Código
npm run lint            # Verifica problemas de lint
npm run type-check      # Verifica erros de TypeScript

# Criação de Módulos
npx tsx scripts/create-module.ts "Nome do Módulo" "Tipo 1" "Tipo 2"
npx tsx scripts/create-type.ts "Módulo Existente" "Novo Tipo"
```

> 🔧 Veja mais em [Scripts de Automação](docs/scripts.md)

## 🧩 Criando Novos Módulos

Criar novos módulos é simples com os scripts de automação:

```bash
# Criar um módulo completo
npx tsx scripts/create-module.ts "Pilha" "Pilha Estática" "Pilha Dinâmica"

# Adicionar tipo a módulo existente
npx tsx scripts/create-type.ts "Pilha" "Pilha com Lista"
```

Os scripts criam automaticamente:

- ✅ Estrutura de diretórios
- ✅ Componentes (teoria, visualização, atividade, desafio)
- ✅ Arquivos de configuração
- ✅ Registros globais atualizados

> 📖 Guia completo: [Criando Módulos](docs/modules.md)

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Modo watch (desenvolvimento)
npm run test:watch

# Interface visual
npm run test:ui
```

> 📚 Veja o [Guia de Testes](docs/testing.md)

## 🐳 Docker

```bash
# Iniciar RabbitMQ
docker-compose up -d

# Verificar status
docker ps

# Ver logs
docker-compose logs -f
```

**Acessos:**

- Aplicação: http://localhost:3000
- RabbitMQ Management: http://localhost:15672 (guest/guest)

## 📝 Licença

Este projeto é de código aberto.

## 🔗 Links Úteis

- [📖 Documentação Completa](docs/README.md)
- [🏗️ Visão Geral do Projeto](docs/overview.md)
- [❓ FAQ](docs/faq.md)
- [📝 Glossário](docs/glossary.md)

---

**Desenvolvido com ❤️ para estudantes de Estruturas de Dados**
