# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o StructLive! Este guia ajudará você a entender como colaborar com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Convenções de Commit](#convenções-de-commit)
- [Estrutura do Projeto](#estrutura-do-projeto)

---

## Código de Conduta

Este projeto segue os princípios de respeito, inclusão e colaboração. Esperamos que todos os contribuidores:

- 🤝 Sejam respeitosos e inclusivos
- 💬 Comuniquem-se de forma clara e profissional
- 🎯 Mantenham o foco em melhorar o projeto
- 🌟 Ajudem outros membros da comunidade

---

## Como Contribuir

### Reportando Bugs

Se você encontrou um bug, abra uma issue com:

1. **Descrição clara** do problema
2. **Passos para reproduzir** o bug
3. **Comportamento esperado** vs **comportamento atual**
4. **Screenshots** (se aplicável)
5. **Ambiente** (OS, navegador, versão do Node)

**Template de Bug Report:**
```markdown
## Descrição
[Descrição clara do bug]

## Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Observe o erro

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que está acontecendo]

## Screenshots
[Se aplicável]

## Ambiente
- OS: [ex: macOS 12.0]
- Browser: [ex: Chrome 96]
- Node: [ex: 20.0.0]
```

### Sugerindo Features

Para sugerir uma nova feature:

1. **Verifique** se já não existe uma issue similar
2. **Descreva** claramente a funcionalidade
3. **Explique** por que seria útil
4. **Forneça** exemplos de uso

**Template de Feature Request:**
```markdown
## Resumo
[Descrição breve da feature]

## Motivação
[Por que esta feature é necessária?]

## Proposta
[Como a feature funcionaria?]

## Exemplos
[Exemplos de uso]

## Alternativas
[Alternativas consideradas]
```

### Contribuindo com Código

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie** uma branch para sua feature
4. **Faça** suas alterações
5. **Teste** suas mudanças
6. **Commit** seguindo as convenções
7. **Push** para seu fork
8. **Abra** um Pull Request

---

## Padrões de Código

### TypeScript

- ✅ Use **TypeScript** para todo código novo
- ✅ Defina **tipos explícitos** quando necessário
- ✅ Evite `any`, prefira `unknown` ou tipos específicos
- ✅ Use **interfaces** para objetos complexos

**Exemplo:**
```typescript
// ✅ Bom
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  // ...
}

// ❌ Evite
function getUser(id: any): any {
  // ...
}
```

### React Components

- ✅ Use **function components** com hooks
- ✅ Prefira **const** para componentes
- ✅ Use **TypeScript** para props
- ✅ Extraia lógica complexa em **custom hooks**

**Exemplo:**
```typescript
// ✅ Bom
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
```

### Naming Conventions

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase com prefix `use` | `useAuth.ts` |
| Utilidades | camelCase | `formatDate.ts` |
| Constantes | UPPER_SNAKE_CASE | `MAX_ITEMS` |
| Interfaces/Types | PascalCase | `UserData` |
| Arquivos CSS | kebab-case | `user-profile.css` |

### Estrutura de Arquivos

Organize arquivos de forma lógica:

```
src/
├── app/                    # App Router (Next.js)
│   ├── api/               # API routes
│   └── estruturas/        # Páginas de estruturas
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes UI (shadcn)
│   └── [feature]/        # Componentes específicos
├── lib/                   # Utilitários e configurações
│   ├── utils.ts          # Funções utilitárias
│   └── [service].ts      # Serviços
└── hooks/                 # Custom hooks
```

### Estilização

- ✅ Use **Tailwind CSS** para estilos
- ✅ Siga padrões de **shadcn/ui** para componentes
- ✅ Use **CSS Modules** para estilos complexos específicos
- ✅ Evite inline styles quando possível

**Exemplo:**
```tsx
// ✅ Bom - Tailwind
<div className="flex items-center gap-2 p-4">
  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
    Click me
  </button>
</div>

// ❌ Evite - Inline styles
<div style={{ display: 'flex', gap: '8px', padding: '16px' }}>
  <button style={{ background: 'blue', color: 'white' }}>
    Click me
  </button>
</div>
```

---

## Processo de Pull Request

### Antes de Abrir um PR

- [ ] Código segue os padrões estabelecidos
- [ ] Testes passam: `npm test`
- [ ] Build funciona: `npm run build`
- [ ] Lint está limpo: `npm run lint`
- [ ] TypeScript sem erros: `npm run type-check`
- [ ] Documentação atualizada (se necessário)

### Template de PR

```markdown
## Descrição
[Descrição clara das mudanças]

## Tipo de Mudança
- [ ] 🐛 Bug fix
- [ ] ✨ Nova feature
- [ ] 📝 Documentação
- [ ] 🎨 Refatoração
- [ ] ⚡ Performance
- [ ] ✅ Testes

## Como Testar
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Sem warnings de build
- [ ] Self-review realizado

## Screenshots (se aplicável)
[Adicione screenshots]

## Issues Relacionadas
Closes #[número da issue]
```

### Processo de Review

1. **Abertura do PR**: Preencha o template completamente
2. **CI/CD**: Aguarde checks automáticos passarem
3. **Code Review**: Mantenedores revisarão o código
4. **Feedback**: Responda e implemente sugestões
5. **Aprovação**: Após aprovação, será feito merge

---

## Convenções de Commit

Use **Conventional Commits** para mensagens claras:

### Formato

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos

- `feat`: Nova feature
- `fix`: Correção de bug
- `docs`: Mudanças em documentação
- `style`: Formatação, sem mudança de código
- `refactor`: Refatoração de código
- `test`: Adição/modificação de testes
- `chore`: Manutenção, dependências

### Exemplos

```bash
# Feature
feat(modules): add script to create new types
feat(ui): add dark mode toggle

# Bug fix
fix(auth): resolve login redirect issue
fix(api): handle null response correctly

# Documentation
docs(readme): update installation steps
docs(modules): add customization guide

# Refactor
refactor(utils): simplify date formatting
refactor(components): extract common logic to hook

# Chore
chore(deps): update dependencies
chore: configure prettier
```

### Mensagens de Commit

- ✅ Use **imperativo** ("add" não "added")
- ✅ Primeira linha com **máximo 72 caracteres**
- ✅ Seja **específico** e **claro**
- ✅ Referencie **issues** quando aplicável

---

## Estrutura do Projeto

Para entender melhor a estrutura:

- [Arquitetura](architecture.md) - Arquitetura detalhada
- [Modules](modules.md) - Como criar módulos
- [Scripts](scripts.md) - Scripts de automação disponíveis

---

## Primeiros Passos

### Para Iniciantes

Ótimos lugares para começar:

1. **Issues com label "good first issue"**
2. **Documentação** - Sempre pode melhorar
3. **Testes** - Adicionar cobertura
4. **Correções de typo** - Simples mas importante

### Dúvidas?

- 📖 Leia a [documentação completa](README.md)
- 💬 Abra uma issue com sua dúvida
- 🔍 Procure issues similares primeiro

---

## Agradecimentos

Toda contribuição, pequena ou grande, é valiosa! Obrigado por ajudar a melhorar o StructLive! 🎉

---

**Lembre-se:** A melhor contribuição é aquela que você pode fazer. Não precisa ser perfeita, estamos aqui para ajudar! 💪
