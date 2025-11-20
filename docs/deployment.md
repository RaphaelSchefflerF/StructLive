# 🚀 Guia de Deploy

Este documento descreve como fazer deploy do StructLive em produção.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Configuração de Ambiente](#configuração-de-ambiente)
- [Deploy na Vercel](#deploy-na-vercel)
- [Deploy em Outros Provedores](#deploy-em-outros-provedores)
- [Configurações de Produção](#configurações-de-produção)
- [Checklist Pré-Deploy](#checklist-pré-deploy)
- [Monitoramento](#monitoramento)
- [Troubleshooting](#troubleshooting)

---

## Pré-requisitos

Antes de fazer deploy, certifique-se de ter:

- ✅ Conta no provedor de hosting (Vercel recomendado)
- ✅ Projeto Supabase configurado
- ✅ Credenciais OAuth do Google
- ✅ API Key do Google Gemini
- ✅ Instância RabbitMQ (CloudAMQP recomendado para produção)
- ✅ Código testado e funcionando localmente

---

## Configuração de Ambiente

### Variáveis de Ambiente Necessárias

Crie as seguintes variáveis de ambiente no seu provedor de hosting:

```env
# Autenticação Google OAuth
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret

# NextAuth
NEXTAUTH_SECRET=sua-chave-secreta-nextauth-segura
NEXTAUTH_URL=https://seu-dominio.com

# Supabase
SUPABASE_URL=sua-url-supabase
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role

# Google Gemini AI
GEMINI_API_KEY=sua-chave-gemini-ai
GEMINI_API_KEY2=sua-chave-gemini-ai-2

# RabbitMQ (CloudAMQP para produção)
RABBITMQ_URL=amqps://usuario:senha@servidor.cloudamqp.com/vhost
```

### Gerando Secrets Seguros

Para gerar o `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

---

## Deploy na Vercel

A Vercel é o método recomendado para deploy de aplicações Next.js.

### Deploy Automático via GitHub

1. **Conecte seu repositório:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe seu repositório do GitHub

2. **Configure as variáveis de ambiente:**
   - Na aba "Environment Variables"
   - Adicione todas as variáveis listadas acima
   - Mantenha separado: Production, Preview, Development

3. **Deploy:**
   - Clique em "Deploy"
   - Vercel fará build e deploy automaticamente

### Deploy Manual via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy para preview
vercel

# Deploy para produção
vercel --prod
```

### Configuração do Worker RabbitMQ

O worker RabbitMQ (`responderWorker.ts`) precisa rodar separadamente. Opções:

1. **Heroku**:
   ```bash
   # Criar Procfile
   echo "worker: npm run start:worker" > Procfile
   
   # Deploy
   git push heroku main
   ```

2. **Railway**:
   - Conecte o repositório
   - Configure as variáveis de ambiente
   - Adicione comando: `npm run start:worker`

3. **VPS próprio**:
   ```bash
   # PM2 para gerenciar processos
   pm2 start npm --name "structlive-worker" -- run start:worker
   pm2 save
   pm2 startup
   ```

---

## Deploy em Outros Provedores

### Netlify

```bash
# Instalar CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Railway

1. Conecte seu repositório GitHub
2. Configure variáveis de ambiente
3. Railway detecta Next.js automaticamente
4. Deploy é feito automaticamente

### Docker (Produção Custom)

**Dockerfile:**
```dockerfile
FROM node:20-alpine AS base

# Dependências
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Produção
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

**docker-compose.yml para produção:**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.production
    restart: unless-stopped
```

---

## Configurações de Produção

### Otimizações no next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Imagens otimizadas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Compressão
  compress: true,
  
  // ESLint
  eslint: {
    ignoreDuringBuilds: false,  // Em prod, não ignore
  },
  
  // TypeScript
  typescript: {
    ignoreBuildErrors: false,  // Em prod, não ignore
  },
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Configurações do Supabase

1. **Row Level Security (RLS)**:
   - Ative RLS em todas as tabelas
   - Configure políticas apropriadas

2. **Connection Pooler**:
   - Use connection pooling em produção
   - Configure timeout adequado

---

## Checklist Pré-Deploy

- [ ] **Testes passando**: `npm test`
- [ ] **Build local funcionando**: `npm run build`
- [ ] **Sem erros de lint**: `npm run lint`
- [ ] **Sem erros de TypeScript**: `npm run type-check`
- [ ] **Variáveis de ambiente configuradas**
- [ ] **Secrets seguros gerados**
- [ ] **URLs de callback OAuth atualizadas**
- [ ] **Database migrations aplicadas**
- [ ] **RabbitMQ configurado e testado**
- [ ] **Domínio customizado configurado** (se aplicável)
- [ ] **SSL/HTTPS configurado**
- [ ] **Monitoramento configurado**

---

## Monitoramento

### Logs

**Vercel:**
- Acesse Deployment → Logs
- Configure integração com Logtail ou similar

**Custom VPS:**
```bash
# PM2
pm2 logs structlive

# Docker
docker logs -f container-name
```

### Métricas

Ferramentas recomendadas:
- **Vercel Analytics** - Métricas de performance
- **Sentry** - Error tracking
- **Google Analytics** - Analytics de usuário
- **Uptime Robot** - Monitoramento de uptime

### Configurar Sentry (Opcional)

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

---

## Troubleshooting

### Build falha com erro de módulo

**Solução:**
```bash
# Limpar cache
rm -rf .next node_modules
npm install
npm run build
```

### Imagens não carregam

**Causa:** Domínio não está em `remotePatterns`

**Solução:** Adicionar domínio em `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'seu-dominio.com',
    },
  ],
}
```

### Erro "NEXTAUTH_URL is not set"

**Solução:** Configure a variável com a URL completa:
```env
NEXTAUTH_URL=https://seu-dominio.com
```

### Worker RabbitMQ não conecta

**Verificações:**
1. URL do RabbitMQ correta
2. Credenciais válidas
3. Firewall não bloqueando porta 5672

### Erro 500 em produção

**Debug:**
1. Verifique logs do servidor
2. Verifique variáveis de ambiente
3. Teste endpoints API individualmente
4. Verifique conexão com Supabase

---

## Rollback

### Vercel

Na dashboard:
1. Acesse "Deployments"
2. Encontre deploy anterior estável
3. Clique em "..." → "Promote to Production"

### Railway/Netlify

Similar: histórico de deploys disponível na dashboard

### Docker

```bash
# Reverter para imagem anterior
docker-compose down
docker-compose up -d --build <commit-hash>
```

---

## Ver Também

- [Setup](setup.md) - Configuração local
- [Tech Stack](tech-stack.md) - Tecnologias utilizadas
- [Architecture](architecture.md) - Arquitetura do sistema

---

**Importante:** Sempre teste em ambiente de staging antes de deploy em produção! 🛡️
