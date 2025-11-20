import fs from 'fs';
import path from 'path';

// --- Utility Functions ---

const toKebabCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

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

// --- Templates ---

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

const getModuleConfigTemplate = (moduleName: string, moduleKebab: string, typesCount: number) => `
export const ${toPascalCase(moduleName)}ModuleConfig = {
  id: "${moduleKebab}",
  title: "${moduleName}",
  created: true,
  description: "Descrição do módulo ${moduleName}.",
  icon: "🧩",
  complexity: "Básico" as const,
  lessons: ${typesCount},
};
`;

const getModuleRegistryTemplate = (modulePascal: string, types: string[]) => `
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

export const ${modulePascal}Options = Object.values(${modulePascal}Registry).map((item) => ({
  id: item.id,
  name: item.name,
  disabled: item.disabled,
}));
`;

// --- Main Logic ---

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: npx ts-node scripts/create-module.ts <ModuleName> <TypeName1> [TypeName2] ...");
    process.exit(1);
  }

  const moduleName = args[0];
  const types = args.slice(1);
  const moduleKebab = toKebabCase(moduleName);
  const modulePascal = toPascalCase(moduleName);

  const baseDir = path.join(process.cwd(), 'src', 'app', 'estruturas', moduleKebab);
  
  console.log(`🚀 Creating module '${moduleName}' with types: ${types.join(', ')}`);

  // 1. Create Directories
  if (fs.existsSync(baseDir)) {
    console.error(`Error: Module directory '${baseDir}' already exists.`);
    process.exit(1);
  }

  fs.mkdirSync(path.join(baseDir, 'types'), { recursive: true });

  // 2. Create Type Files
  for (const typeName of types) {
    const typeKebab = toKebabCase(typeName);
    const typeDir = path.join(baseDir, 'types', typeKebab);
    fs.mkdirSync(typeDir, { recursive: true });

    fs.writeFileSync(path.join(typeDir, 'theory.tsx'), getTheoryTemplate(typeName));
    fs.writeFileSync(path.join(typeDir, 'visualization.tsx'), getVisualizationTemplate(typeName));
    fs.writeFileSync(path.join(typeDir, 'activity.tsx'), getActivityTemplate(typeName));
    fs.writeFileSync(path.join(typeDir, 'challenge.tsx'), getChallengeTemplate(typeName));
    fs.writeFileSync(path.join(typeDir, 'config.ts'), getConfigTemplate(typeName));
    
    console.log(`  ✅ Created type '${typeName}'`);
  }

  // 3. Create Module Config Files
  fs.writeFileSync(
    path.join(baseDir, 'module.config.ts'), 
    getModuleConfigTemplate(moduleName, moduleKebab, types.length)
  );
  
  fs.writeFileSync(
    path.join(baseDir, 'config.ts'),
    getModuleRegistryTemplate(modulePascal, types)
  );

  console.log(`  ✅ Created module configuration files`);

  // 4. Update Global Module Registry (src/app/estruturas/index.ts)
  const globalIndexInfo = path.join(process.cwd(), 'src', 'app', 'estruturas', 'index.ts');
  let globalIndexContent = fs.readFileSync(globalIndexInfo, 'utf-8');

  // Add import
  const importStatement = `import { ${modulePascal}ModuleConfig } from "./${moduleKebab}/module.config";`;
  if (!globalIndexContent.includes(importStatement)) {
    const lastImportIndex = globalIndexContent.lastIndexOf('import ');
    const endOfLastImport = globalIndexContent.indexOf(';', lastImportIndex) + 1;
    globalIndexContent = 
      globalIndexContent.slice(0, endOfLastImport) + '\n' + importStatement + 
      globalIndexContent.slice(endOfLastImport);
  }

  // Add to array
  const modulesArrayRegex = /export const modules = \[([\s\S]*?)\];/;
  const match = globalIndexContent.match(modulesArrayRegex);
  if (match) {
    const currentModules = match[1].trim();
    const newModules = currentModules ? `${currentModules}, ${modulePascal}ModuleConfig` : `${modulePascal}ModuleConfig`;
    globalIndexContent = globalIndexContent.replace(modulesArrayRegex, `export const modules = [${newModules}];`);
    fs.writeFileSync(globalIndexInfo, globalIndexContent);
    console.log(`  ✅ Updated src/app/estruturas/index.ts`);
  } else {
    console.error("  ❌ Could not find 'modules' array in src/app/estruturas/index.ts");
  }

  // 5. Update Master Registry (src/lib/structure-registries.ts)
  const masterRegistryPath = path.join(process.cwd(), 'src', 'lib', 'structure-registries.ts');
  let masterRegistryContent = fs.readFileSync(masterRegistryPath, 'utf-8');

  // Add import
  // Note: using relative path from src/lib to src/app/estruturas
  const registryImport = `import { ${modulePascal}Registry } from '@/app/estruturas/${moduleKebab}/config';`;
  if (!masterRegistryContent.includes(registryImport)) {
    const lastImportIndex = masterRegistryContent.lastIndexOf('import ');
    const endOfLastImport = masterRegistryContent.indexOf(';', lastImportIndex) + 1;
    masterRegistryContent = 
      masterRegistryContent.slice(0, endOfLastImport) + '\n' + registryImport + 
      masterRegistryContent.slice(endOfLastImport);
  }

  // Add to object
  const masterObjectRegex = /export const masterRegistry = {([\s\S]*?)};/;
  const masterMatch = masterRegistryContent.match(masterObjectRegex);
  if (masterMatch) {
    const currentEntries = masterMatch[1];
    // Check if it ends with a comma or newline, if not add comma
    let newEntry = `  ${moduleKebab}: ${modulePascal}Registry,`;
    // Insert before the closing brace
    const closingBraceIndex = masterRegistryContent.lastIndexOf('};');
    masterRegistryContent = 
      masterRegistryContent.slice(0, closingBraceIndex) + newEntry + '\n' + 
      masterRegistryContent.slice(closingBraceIndex);
      
    fs.writeFileSync(masterRegistryPath, masterRegistryContent);
    console.log(`  ✅ Updated src/lib/structure-registries.ts`);
  } else {
    console.error("  ❌ Could not find 'masterRegistry' object in src/lib/structure-registries.ts");
  }

  console.log(`\n🎉 Module '${moduleName}' created successfully!`);
}

main().catch(console.error);
