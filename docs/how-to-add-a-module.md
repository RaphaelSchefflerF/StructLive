# 🧪 Como Criar um Novo Módulo (Processo Manual)

> [!NOTE]
> **Para a maioria dos casos, use os scripts de automação!**  
> Veja [Criando Módulos](modules.md) e [Scripts de Automação](scripts.md) para o método recomendado.  
> Este guia descreve o processo manual, útil para entender a estrutura ou casos especiais.

Objetivo: adicionar um novo módulo educacional (ex: “Fila”, “Árvore”) ou um módulo funcional (ex: “Payments”).

Abaixo mostraremos um módulo genérico: HelloModule (didático) + observações para “Payments”.

## 🧱 Estrutura Padrão de Módulo

Cada módulo de estrutura segue base existente (ex: LDSE):

```
src/app/estruturas/<nome>/page.tsx
src/app/estruturas/<nome>/types/<variação>/activity.tsx
src/app/estruturas/<nome>/types/<variação>/rag_contexts.ts
```

## 🪜 Passo a Passo

### 1. Criar Pastas

```bash
mkdir -p src/app/estruturas/hello/types/basico
```

### 2. Página Principal do Módulo

Arquivo: /src/app/estruturas/hello/page.tsx

```tsx
"use client";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";

export default function HelloPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-6">
        <h1 className="text-2xl font-bold mb-4">Hello Module</h1>
        <p className="mb-4">Este é um novo módulo de exemplo.</p>
        <Link
          href="/estruturas/hello/types/basico/activity"
          className="text-blue-600 underline"
        >
          Ir para atividade básica
        </Link>
      </SidebarInset>
    </SidebarProvider>
  );
}
```

### 3. Activity (Quiz / Exercício)

Arquivo: /src/app/estruturas/hello/types/basico/activity.tsx

```tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HelloActivity() {
  const [count, setCount] = useState(0);
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Atividade Hello</h2>
      <p>Exemplo simples: clique no botão.</p>
      <Button onClick={() => setCount((c) => c + 1)}>Clique: {count}</Button>
    </div>
  );
}
```

### 4. Prompt RAG (Se Necessário)

Arquivo: /src/app/estruturas/hello/types/basico/rag_contexts.ts

```ts
export interface HelloContext {
  title: string;
  objective: string;
  requirements: string[];
}

export const HELLO_CONTEXT: HelloContext = {
  title: "Hello Activity",
  objective: "Demonstrar estrutura mínima de prompt.",
  requirements: ["Incrementar contador", "Mostrar valor atualizado"],
};

export function buildHelloPrompt(userCode: string) {
  return `Título: ${HELLO_CONTEXT.title}
Objetivo: ${HELLO_CONTEXT.objective}
Requisitos:
${HELLO_CONTEXT.requirements.map((r) => "- " + r).join("\n")}

Código do aluno:
\`\`\`tsx
${userCode}
\`\`\`
Avalie se os requisitos foram cumpridos.`;
}
```

### 5. Rotas API (Se módulo precisa de dados)

Exemplo: criar endpoint de listagem:

```
src/app/api/hello/route.ts
```

```ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    items: [{ id: 1, name: "Item Hello" }],
  });
}
```

### 6. Registro no Menu / Navegação

Se existir componente que mapeia estruturas (ex: dataStructures em contexto), adicionar:
Arquivo (suposição): /src/contexts/AppContext.tsx

```ts
// ...existing code...
const dataStructures = [
  // ...existing code...
  {
    id: "hello",
    title: "Hello Module",
    description: "Exemplo de módulo inicial.",
    icon: "👋",
  },
];
// ...existing code...
```

Se não houver centralização, adicionar manualmente no sidebar (/src/components/sidebar/app-sidebar.tsx).

### 7. Integração com Banco (Opcional)

Criar tabela (exemplo):

```sql
create table hello_registros (
  id uuid primary key default gen_random_uuid(),
  descricao text,
  created_at timestamptz default now()
);
```

Service (exemplo):

```
src/lib/helloService.ts
```

```ts
export async function listHello() {
  // chamar Supabase (pseudo)
  // const { data } = await supabase.from('hello_registros').select('*');
  return [];
}
```

### 8. Teste Básico

Arquivo: /**tests**/hello.activity.test.tsx

```ts
import { render, screen, fireEvent } from "@testing-library/react";
import HelloActivity from "@/app/estruturas/hello/types/basico/activity";

test("incrementa contador", () => {
  render(<HelloActivity />);
  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  expect(btn.textContent).toMatch(/Clique: 1/);
});
```

### 9. Logs

Adicionar logs de interação (ex: registrarLogIA) conforme padrão:

```ts
// await registrarLogIA({ usuarioId, tipoRequisicao: 'hello_evento' });
```

### 10. Validação / i18n

- Validação: usar Zod (sugestão futura).
- i18n: não implementado → criar wrapper se necessário.

### 11. Caminhos de Build

Nada específico: Next.js detecta page.tsx automaticamente.

### 12. Executar e Verificar

```bash
npm run dev
# acessar
http://localhost:3000/estruturas/hello
```

## 💳 Variante “Payments” (Observações)

Se fosse um módulo de pagamentos:

- Adicionar serviço integrando gateway (ex: Stripe) em /src/lib/payments/stripeClient.ts.
- Encriptar keys no .env (STRIPE_KEY).
- Criar rota: /src/app/api/payments/checkout/route.ts (POST).
- Testar webhooks (necessário endpoint /api/payments/webhook/route.ts).

## 🧪 Checklist de PR

| Item                                         | OK  |
| -------------------------------------------- | --- |
| Pasta criada em /src/app/estruturas/<modulo> |
| page.tsx renderiza sem erros                 |
| activity.tsx segue padrão de UI              |
| Prompt RAG (se necessário) criado            |
| Rotas API implementadas (se usadas)          |
| Registro no menu/contexto                    |
| Teste unitário mínimo                        |
| Variáveis de ambiente novas documentadas     |
| Documentação atualizada (README + docs)      |
| Sem erros de lint / build                    |

## 🚀 Dicas

- Reaproveite componentes UI existentes para consistência.
- Centralize strings de texto (futuro i18n).
- Evite lógica de negócio diretamente em componentes grandes (criar services).

## 🧹 Remoção de Módulo

1. Apagar diretórios.
2. Remover entradas em menu / contexto.
3. Remover tabelas (se dedicadas).
4. Atualizar docs.

Pronto: módulo criado com sucesso!
