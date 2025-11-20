# 🧪 Guia de Testes

Este documento descreve como executar, escrever e manter testes no projeto StructLive.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Executando Testes](#executando-testes)
- [Estrutura de Testes](#estrutura-de-testes)
- [Escrevendo Testes](#escrevendo-testes)
- [Cobertura de Código](#cobertura-de-código)
- [Boas Práticas](#boas-práticas)

---

## Visão Geral

O StructLive utiliza **Vitest** como framework de testes, juntamente com **Testing Library** para testes de componentes React.

### Tecnologias de Teste

- **Vitest** - Framework de testes rápido e moderno
- **@testing-library/react** - Utilitários para testar componentes React
- **@testing-library/jest-dom** - Matchers customizados para DOM
- **jsdom** - Ambiente DOM para testes
- **@vitest/ui** - Interface visual para testes

---

## Executando Testes

### Comandos Disponíveis

```bash
# Executar todos os testes (uma vez)
npm test

# Executar testes em modo watch (reexecuta ao salvar)
npm run test:watch

# Executar testes uma vez (sem watch)
npm run test:run

# Abrir interface visual do Vitest
npm run test:ui

# Gerar relatório de cobertura
npm run coverage
```

### Exemplos de Uso

```bash
# Desenvolvimento - modo watch
npm run test:watch

# CI/CD - execução única
npm run test:run

# Análise de cobertura
npm run coverage
```

---

## Estrutura de Testes

### Localização dos Testes

Os testes estão organizados em:

```
__tests__/              # Testes unitários gerais
src/
  └── app/
      └── estruturas/
          └── [structureId]/
              └── __tests__/   # Testes específicos de módulos
```

### Convenções de Nomenclatura

- Arquivos de teste: `*.test.tsx` ou `*.test.ts`
- Co-localização: Testes próximos ao código que testam
- Descritivos: Nome do arquivo reflete o que está sendo testado

**Exemplos:**
- `activity.test.tsx` - Testa componente de atividade
- `list-content-renderer.test.tsx` - Testa o renderer de listas
- `utils.test.ts` - Testa funções utilitárias

---

## Escrevendo Testes

### Exemplo Básico

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('deve renderizar corretamente', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('deve responder a cliques', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### Testando Componentes React

```typescript
import { render, screen } from '@testing-library/react';
import Theory from './theory';

describe('Theory Component', () => {
  it('deve exibir o título', () => {
    render(<Theory />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Teoria de');
  });

  it('deve ter a estrutura correta', () => {
    const { container } = render(<Theory />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
```

### Testando Funções Utilitárias

```typescript
import { describe, it, expect } from 'vitest';
import { toKebabCase, toPascalCase } from './utils';

describe('String Utils', () => {
  describe('toKebabCase', () => {
    it('deve converter para kebab-case', () => {
      expect(toKebabCase('Hello World')).toBe('hello-world');
      expect(toKebabCase('Pilha Estática')).toBe('pilha-estatica');
    });
  });

  describe('toPascalCase', () => {
    it('deve converter para PascalCase', () => {
      expect(toPascalCase('hello world')).toBe('HelloWorld');
      expect(toPascalCase('pilha-estatica')).toBe('PilhaEstatica');
    });
  });
});
```

### Testando Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('deve iniciar com 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('deve incrementar o contador', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});
```

### Mockando Dependências

```typescript
import { describe, it, expect, vi } from 'vitest';
import { fetchData } from './api';

// Mock de função
vi.mock('./api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'mocked' })),
}));

describe('API Tests', () => {
  it('deve chamar a API', async () => {
    const result = await fetchData();
    expect(result).toEqual({ data: 'mocked' });
    expect(fetchData).toHaveBeenCalled();
  });
});
```

---

## Cobertura de Código

### Gerando Relatório

```bash
npm run coverage
```

Isso gera um relatório em `coverage/` mostrando:
- Porcentagem de linhas cobertas
- Porcentagem de funções cobertas
- Porcentagem de branches cobertas
- Arquivos não cobertos

### Visualizando Cobertura

Após executar `npm run coverage`, abra:
```bash
open coverage/index.html  # Mac
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
```

### Metas de Cobertura

Embora não haja uma meta rígida, recomenda-se:
- **Componentes críticos**: 80%+ de cobertura
- **Utilitários**: 90%+ de cobertura
- **Novos recursos**: Sempre adicionar testes

---

## Boas Práticas

### 1. Teste Comportamento, Não Implementação

❌ **Ruim:**
```typescript
it('deve ter estado internal correto', () => {
  const component = new MyComponent();
  expect(component.state.value).toBe(0);  // Testa detalhes internos
});
```

✅ **Bom:**
```typescript
it('deve exibir valor inicial', () => {
  render(<MyComponent />);
  expect(screen.getByText('0')).toBeInTheDocument();  // Testa o que o usuário vê
});
```

### 2. Use Queries Semânticas

Prefira queries que refletem como usuários interagem:

```typescript
// Prioridade (do melhor ao pior):
screen.getByRole('button', { name: /submit/i })  // 1. Role
screen.getByLabelText(/username/i)                // 2. Label
screen.getByPlaceholderText(/enter name/i)        // 3. Placeholder
screen.getByText(/hello/i)                        // 4. Text
screen.getByTestId('submit-button')               // 5. TestId (último recurso)
```

### 3. Teste Casos Edge

```typescript
describe('Input Component', () => {
  it('deve aceitar input válido', () => { /* ... */ });
  it('deve rejeitar input vazio', () => { /* ... */ });
  it('deve rejeitar input muito longo', () => { /* ... */ });
  it('deve sanitizar caracteres especiais', () => { /* ... */ });
});
```

### 4. Organize Testes com describe

```typescript
describe('Calculator', () => {
  describe('addition', () => {
    it('deve somar números positivos', () => { /* ... */ });
    it('deve somar números negativos', () => { /* ... */ });
  });

  describe('subtraction', () => {
    it('deve subtrair números', () => { /* ... */ });
  });
});
```

### 5. Use beforeEach para Setup

```typescript
import { beforeEach, describe, it, expect } from 'vitest';

describe('Component Tests', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const { container: c } = render(<MyComponent />);
    container = c;
  });

  it('test 1', () => {
    // container já está renderizado
  });

  it('test 2', () => {
    // container já está renderizado
  });
});
```

### 6. Cleanup Automático

O Vitest com Testing Library faz cleanup automático, mas se necessário:

```typescript
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
```

---

## Configuração

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Setup File (src/test/setup.ts)

```typescript
import '@testing-library/jest-dom';
```

---

## Troubleshooting

### Erro: "ReferenceError: window is not defined"

**Solução:** Certifique-se que `environment: 'jsdom'` está configurado em `vitest.config.ts`.

### Erro: "Cannot find module '@/...'"

**Solução:** Verifique os path aliases em `vitest.config.ts`:
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

### Testes lentos

**Soluções:**
- Use `it.concurrent` para testes independentes
- Evite renderizações desnecessárias
- Use mocks para APIs externas

---

## Ver Também

- [Setup](setup.md) - Configuração do ambiente
- [Contributing](contributing.md) - Guia de contribuição
- [Arquitetura](architecture.md) - Estrutura do projeto

---

**Dica:** Use `npm run test:ui` para uma experiência visual interativa de testes! 🎨
