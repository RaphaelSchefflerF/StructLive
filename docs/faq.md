# ❓ FAQ

## 1. Não consigo logar com Google. O que fazer?

Verifique GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET e se a redirect URL está igual: http://localhost:3000/api/auth/callback/google

## 2. A página /home redireciona para /login.

Sua sessão não está autenticada. Faça login ou ajuste NEXTAUTH_URL.

## 3. Atividades não carregam.

Provável rota /api/atividades ausente. Crie route.ts com GET retornando JSON.

## 4. O feedback da IA nunca aparece.

- Worker ou fila RabbitMQ não iniciado.
- Chave GEMINI_API_KEY ausente.
- Polling precoce: aguarde alguns segundos.

## 5. Erro de variável undefined.

Falta no .env ou precisa reiniciar dev depois de alterar.

## 6. Como adiciono uma nova estrutura?

Use os scripts de automação! Veja [docs/modules.md](modules.md) e [docs/scripts.md](scripts.md). Para processo manual: [docs/how-to-add-a-module.md](how-to-add-a-module.md).

## 7. Posso usar Yarn ou pnpm?

Sim, mas mantenha consistência no time.

## 8. Como rodo testes com interface?

npm run test:ui

## 9. Como limpar build quebrado?

```bash
rm -rf .next
npm run dev
```

## 10. Quero contribuir. Checklist?

Ver [docs/contributing.md](contributing.md) para guia completo de contribuição.

## 11. Como ativo produção?

- Ajustar NEXTAUTH_URL.
- Usar chaves seguras.
- Executar build: npm run build; npm start.

## 12. Onde configuro estilos globais?

/src/app/globals.css (não exibido no snapshot, mas padrão Next).

## 13. Onde ficam logs da IA?

Função registrarLogIA (arquivo não exibido) deve gravar em DB ou fila.

## 14. É necessário Docker?

Só para serviços externos (RabbitMQ). App roda sem Docker.

## 15. Como vejo fila RabbitMQ?

Acesse http://localhost:15672 (guest/guest).

## 16. O que fazer se Gemini excede limites?

Use GEMINI_API_KEY2 como fallback (já previsto no .env).

## 17. Posso desativar IA no dev?

Sim: condicionar chamadas se GEMINI_API_KEY não estiver setada.

## 18. Onde ficam migrations?

Não encontrado. Recomenda-se criar pasta /migrations.

## 19. Como garantir padrões de código?

Adicionar ESLint + Prettier (se não existir) e configurar script pre-commit.

## 20. Quero adicionar validação de entrada.

Adicionar Zod e validar no route.ts antes de acessar DB.

## 21. Como usar os scripts de automação?

Para criar um módulo:
```bash
npx tsx scripts/create-module.ts "Nome do Módulo" "Tipo 1" "Tipo 2"
```

Para adicionar um tipo:
```bash
npx tsx scripts/create-type.ts "Módulo Existente" "Novo Tipo"
```

Veja [docs/modules.md](modules.md) para detalhes.

## 22. O projeto funciona com Next.js 15?

Sim! O projeto usa Next.js 15.2.1 com App Router e React 19.
