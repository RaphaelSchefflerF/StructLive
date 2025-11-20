import { masterRegistry } from "@/lib/structure-registries";

type Props = {
  structureId: keyof typeof masterRegistry;
  listType: string;
  contentType: "theory" | "visualization" | "activity" | "challenge";
};

export default function StructureContentRenderer({ structureId, listType, contentType }: Props) {
  const registry = masterRegistry[structureId];
  if (!registry) return <div>Estrutura não encontrada.</div>;

  const list = (registry as any)[listType];
  if (!list) return <div>Tipo de lista não encontrado.</div>;

  const Component = list.components[contentType];
  if (!Component) return <div>Conteúdo não encontrado.</div>;

  return <Component />;
}
