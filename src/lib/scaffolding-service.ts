// src/lib/scaffolding-service.ts

/**
 * Converte um nome como "Fila Estática" para "fila-estatica"
 */
const toKebabCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

/**
 * Converte um nome como "Fila Estática" para "QueueStatic"
 */
const toPascalCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};

// --- Templates de Conteúdo ---

const getTheoryTemplate = (typeName: string) => `
export default function Theory() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Teoria de ${typeName}</h2>
      <p>Conteúdo da teoria sobre ${typeName} será adicionado aqui.</p>
    </div>
  );
}
`;

const getVisualizationTemplate = (typeName: string) => `
export default function Visualization() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Visualização de ${typeName}</h2>
      <p>Componente de visualização de ${typeName} será adicionado aqui.</p>
    </div>
  );
}
`;

const getActivityTemplate = (typeName: string) => `
export default function Activity() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Atividade de ${typeName}</h2>
      <p>Componente de atividade de ${typeName} será adicionado aqui.</p>
    </div>
  );
}
`;

const getChallengeTemplate = (typeName: string) => `
export default function Challenge() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Desafio de ${typeName}</h2>
      <p>Componente de desafio de ${typeName} será adicionado aqui.</p>
    </div>
  );
}
`;

const getConfigTemplate = (typeName: string) => {
  const pascalCaseName = toPascalCase(typeName);
  const kebabCaseName = toKebabCase(typeName);

  return `
import Theory from "./theory";
import Visualization from "./visualization";
import Activity from "./activity";
import Challenge from "./challenge";

export const ${pascalCaseName}Config = {
  id: "${kebabCaseName}",
  name: "${typeName}",
  components: {
    theory: Theory,
    visualization: Visualization,
    activity: Activity,
    challenge: Challenge,
  },
  disabled: false,
};
`;
};

/**
 * Gera o script de scaffolding para um novo módulo.
 */
export function generateModuleScaffolding(
  moduleName: string,
  types: string[]
): string {
  if (!moduleName || types.length === 0) {
    return "# Preencha o nome do módulo e adicione pelo menos um tipo.";
  }

  const moduleKebab = toKebabCase(moduleName);
  const modulePascal = toPascalCase(moduleName);

  let script = `#!/bin/bash
# Script para criar o módulo '${moduleName}'

# --- 1. Criar Estrutura de Pastas ---
echo "Creating directories..."
mkdir -p src/app/estruturas/${moduleKebab}/types
`;

  // Criar pasta para cada tipo
  for (const typeName of types) {
    const typeKebab = toKebabCase(typeName);
    script += `mkdir -p src/app/estruturas/${moduleKebab}/types/${typeKebab}\n`;
  }

  script += `
# --- 2. Criar Arquivos de Conteúdo e Configuração para cada Tipo ---
echo "Creating content and config files..."
`;

  // Criar arquivos para cada tipo
  for (const typeName of types) {
    const typeKebab = toKebabCase(typeName);
    script += `
# Tipo: ${typeName}
cat <<'EOF' > src/app/estruturas/${moduleKebab}/types/${typeKebab}/theory.tsx
${getTheoryTemplate(typeName)}
EOF

cat <<'EOF' > src/app/estruturas/${moduleKebab}/types/${typeKebab}/visualization.tsx
${getVisualizationTemplate(typeName)}
EOF

cat <<'EOF' > src/app/estruturas/${moduleKebab}/types/${typeKebab}/activity.tsx
${getActivityTemplate(typeName)}
EOF

cat <<'EOF' > src/app/estruturas/${moduleKebab}/types/${typeKebab}/challenge.tsx
${getChallengeTemplate(typeName)}
EOF

cat <<'EOF' > src/app/estruturas/${moduleKebab}/types/${typeKebab}/config.ts
${getConfigTemplate(typeName)}
EOF
`;
  }

  script += `
# --- 3. Criar Arquivos de Registro do Módulo ---
echo "Creating module registry files..."

# module.config.ts
cat <<'EOF' > src/app/estruturas/${moduleKebab}/module.config.ts
export const ${modulePascal}ModuleConfig = {
  id: "${moduleKebab}",
  title: "${moduleName}",
  created: true,
  description: "Descrição do módulo ${moduleName}.",
  icon: "🧩", // Trocar ícone
  complexity: "Básico" as const,
  lessons: ${types.length},
};
EOF

# config.ts (registro de tipos)
cat <<'EOF' > src/app/estruturas/${moduleKebab}/config.ts
${types
  .map(
    (typeName) =>
      `import { ${toPascalCase(typeName)}Config } from "./types/${toKebabCase(
        typeName
      )}/config";`
  )
  .join("\n")}

export const ${modulePascal}Registry = {
  ${types
    .map(
      (typeName) =>
        `'${toKebabCase(typeName)}': ${toPascalCase(typeName)}Config,`
    )
    .join("\n  ")}
};
EOF
`;

  script += `
# --- 4. Atualizar Registros Globais (AÇÃO MANUAL NECESSÁRIA) ---
echo "------------------------------------------------------------------"
echo "✅ Script concluído!"
echo "🔴 AÇÃO MANUAL NECESSÁRIA:"
echo "1. Abra o arquivo 'src/app/estruturas/index.ts' e adicione a importação e exportação do novo módulo."
echo "2. Abra o arquivo 'src/lib/structure-registries.ts' e adicione o registro do novo módulo."
echo "------------------------------------------------------------------"
`;

  return script;
}
