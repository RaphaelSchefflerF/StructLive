// src/app/configuracao/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateModuleScaffolding } from "@/lib/scaffolding-service";
import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ConfiguracaoPage() {
  const [moduleName, setModuleName] = useState("");
  const [types, setTypes] = useState<string[]>([""]);
  const [script, setScript] = useState("");

  useEffect(() => {
    const generatedScript = generateModuleScaffolding(moduleName, types.filter(t => t));
    setScript(generatedScript);
  }, [moduleName, types]);

  const handleAddType = () => {
    setTypes([...types, ""]);
  };

  const handleRemoveType = (index: number) => {
    setTypes(types.filter((_, i) => i !== index));
  };

  const handleTypeChange = (index: number, value: string) => {
    const newTypes = [...types];
    newTypes[index] = value;
    setTypes(newTypes);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script);
    toast.success("Script copiado para a área de transferência!");
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Gerador de Módulos</h1>
        <p className="text-muted-foreground mb-8">
          Preencha os campos abaixo para gerar um script de scaffolding. Execute o script no terminal, na raiz do projeto, para criar todos os arquivos necessários para um novo módulo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coluna do Formulário */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="module-name" className="text-lg font-semibold">
                Nome do Módulo
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Ex: Fila, Grafo, Árvore.
              </p>
              <Input
                id="module-name"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                placeholder="Nome do Módulo"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Tipos do Módulo</h2>
              <p className="text-sm text-muted-foreground mb-2">
                Ex: Fila Estática, Fila Dinâmica.
              </p>
              <div className="space-y-2">
                {types.map((type, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={type}
                      onChange={(e) => handleTypeChange(index, e.target.value)}
                      placeholder={`Tipo ${index + 1}`}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveType(index)}
                      disabled={types.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button onClick={handleAddType} className="mt-2">
                Adicionar Tipo
              </Button>
            </div>
          </div>

          {/* Coluna do Script */}
          <div className="relative">
            <Label className="text-lg font-semibold">Script Gerado</Label>
             <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            <pre className="bg-slate-900 text-white p-4 rounded-md overflow-x-auto h-full min-h-[300px] text-sm">
              <code>{script}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}