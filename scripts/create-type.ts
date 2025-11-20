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

// --- Main Logic ---

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: npx tsx scripts/create-type.ts <ModuleName> <TypeName>");
    process.exit(1);
  }

  const moduleName = args[0];
  const typeName = args[1];
  
  const moduleKebab = toKebabCase(moduleName);
  const typeKebab = toKebabCase(typeName);
  const typePascal = toPascalCase(typeName);

  const baseDir = path.join(process.cwd(), 'src', 'app', 'estruturas', moduleKebab);
  
  console.log(`🚀 Adding type '${typeName}' to module '${moduleName}'`);

  // 1. Verify Module Exists
  if (!fs.existsSync(baseDir)) {
    console.error(`Error: Module directory '${baseDir}' does not exist.`);
    console.error(`Did you mean to create a new module? Use scripts/create-module.ts instead.`);
    process.exit(1);
  }

  const typeDir = path.join(baseDir, 'types', typeKebab);
  if (fs.existsSync(typeDir)) {
    console.error(`Error: Type directory '${typeDir}' already exists.`);
    process.exit(1);
  }

  // 2. Create Type Files
  fs.mkdirSync(typeDir, { recursive: true });

  fs.writeFileSync(path.join(typeDir, 'theory.tsx'), getTheoryTemplate(typeName));
  fs.writeFileSync(path.join(typeDir, 'visualization.tsx'), getVisualizationTemplate(typeName));
  fs.writeFileSync(path.join(typeDir, 'activity.tsx'), getActivityTemplate(typeName));
  fs.writeFileSync(path.join(typeDir, 'challenge.tsx'), getChallengeTemplate(typeName));
  fs.writeFileSync(path.join(typeDir, 'config.ts'), getConfigTemplate(typeName));
  
  console.log(`  ✅ Created type files in '${typeDir}'`);

  // 3. Update Module Config (src/app/estruturas/[module]/config.ts)
  const moduleConfigPath = path.join(baseDir, 'config.ts');
  let moduleConfigContent = fs.readFileSync(moduleConfigPath, 'utf-8');

  // Add import
  const importStatement = `import { ${typePascal}Config } from "./types/${typeKebab}/config";`;
  if (!moduleConfigContent.includes(importStatement)) {
    const lastImportIndex = moduleConfigContent.lastIndexOf('import ');
    const endOfLastImport = moduleConfigContent.indexOf(';', lastImportIndex) + 1;
    moduleConfigContent = 
      moduleConfigContent.slice(0, endOfLastImport) + '\n' + importStatement + 
      moduleConfigContent.slice(endOfLastImport);
  }

  // Add to Registry
  // Looking for: export const [Module]Registry = { ... }
  const registryRegex = /export const \w+Registry = {([\s\S]*?)};/;
  const match = moduleConfigContent.match(registryRegex);
  if (match) {
    const currentEntries = match[1];
    // Check if it ends with a comma or newline, if not add comma
    let newEntry = `  '${typeKebab}': ${typePascal}Config,`;
    // Insert before the closing brace of the object
    const closingBraceIndex = moduleConfigContent.lastIndexOf('};');
    moduleConfigContent = 
      moduleConfigContent.slice(0, closingBraceIndex) + newEntry + '\n' + 
      moduleConfigContent.slice(closingBraceIndex);
      
    fs.writeFileSync(moduleConfigPath, moduleConfigContent);
    console.log(`  ✅ Updated module registry in '${moduleConfigPath}'`);
  } else {
    console.error(`  ❌ Could not find Registry object in '${moduleConfigPath}'`);
  }

  // 4. Update Lesson Count in module.config.ts (Optional but good)
  const moduleMetaConfigPath = path.join(baseDir, 'module.config.ts');
  if (fs.existsSync(moduleMetaConfigPath)) {
    let metaContent = fs.readFileSync(moduleMetaConfigPath, 'utf-8');
    const lessonsRegex = /lessons:\s*(\d+)/;
    const lessonsMatch = metaContent.match(lessonsRegex);
    if (lessonsMatch) {
      const currentLessons = parseInt(lessonsMatch[1]);
      const newLessons = currentLessons + 1;
      metaContent = metaContent.replace(lessonsRegex, `lessons: ${newLessons}`);
      fs.writeFileSync(moduleMetaConfigPath, metaContent);
      console.log(`  ✅ Updated lesson count to ${newLessons} in '${moduleMetaConfigPath}'`);
    }
  }

  console.log(`\n🎉 Type '${typeName}' added successfully to module '${moduleName}'!`);
}

main().catch(console.error);
