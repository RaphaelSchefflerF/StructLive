"use client";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BookOpenCheck, Home, List, PlayCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { listOptions } from "../lista/config";



import { useAppContext } from "@/contexts/AppContext";
import StructureContentRenderer from "./components/structure-content-renderer";

function StructurePageContent({ params }: { params: { structureId: string } }) {
  const searchParams = useSearchParams();
  const [tipoLista, setTipoLista] = useState("ldse");
  const { getStructureById } = useAppContext();
  const structure = getStructureById(params.structureId);

  // Lê o parâmetro 'tab' da URL, padrão é 'conteudo'
  const tabFromUrl = searchParams.get("tab") || "conteudo";
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // Atualiza a aba quando o parâmetro da URL mudar
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  if (!structure) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl text-muted-foreground">
        Estrutura de dados não encontrada.
      </div>
    );
  }

  return (
    <>
      <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/" className="flex items-center gap-1">
                  <Home className="h-3.5 w-3.5" />
                  <span>Início</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/estruturas">
                  Estruturas de Dados
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1">
                  {structure.icon && <span className="h-3.5 w-3.5 flex items-center justify-center text-lg">{structure.icon}</span>}
                  <span>{structure.title}</span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="py-10 px-4 sm:px-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2">
            {structure.icon && <span className="text-4xl">{structure.icon}</span>}
            {structure.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {structure.description}
          </p>
        </div>
        {/* Select de tipos de lista */}
        {params.structureId === 'lista' && (
          <div className="mt-6 mb-4 flex items-center gap-4">
            <span className="text-base text-muted-foreground">
              Selecione qual estrutura você deseja:
            </span>
            <Select value={tipoLista} onValueChange={setTipoLista}>
              <SelectTrigger className="w-[330px]">
                <SelectValue placeholder="Selecione o tipo de lista" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {listOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id} disabled={option.disabled}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        <Separator className="my-6" />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList
            className="
                flex flex-wrap w-full mb-4
                justify-start sm:justify-center
                bg-muted/50 rounded-lg p-1
              "
          >
            <TabsTrigger
              value="conteudo"
              className="
                  flex items-center gap-2 px-4 w-full sm:w-auto
                  rounded-md font-medium transition
                  data-[state=active]:bg-background data-[state=active]:shadow
                  cursor-pointer
                "
            >
              <BookOpen className="h-4 w-4" /> Conteúdo
            </TabsTrigger>
            <TabsTrigger
              value="visualization"
              className="
                  flex items-center gap-2 px-4 w-full sm:w-auto
                  rounded-md font-medium transition
                  data-[state=active]:bg-background data-[state=active]:shadow
                  cursor-pointer
                "
            >
              <PlayCircle className="h-4 w-4" /> Visualização
            </TabsTrigger>
            <TabsTrigger
              value="practice"
              className="flex items-center gap-2 w-full cursor-pointer"
            >
              <BookOpenCheck className="h-4 w-4" /> Atividades
            </TabsTrigger>
            <TabsTrigger
              value="challenge"
              className="flex items-center gap-2 w-full cursor-pointer"
            >
              <List className="h-4 w-4" /> Desafios
            </TabsTrigger>
          </TabsList>

          {/* Conteudo - Explicação teórica */}
          <TabsContent value="conteudo">
            <div className="border rounded-lg p-6 bg-card">
              <StructureContentRenderer structureId={params.structureId} listType={tipoLista} contentType="theory" />
            </div>
          </TabsContent>

          {/* Visualização interativa */}
          <TabsContent value="visualization">
            <div className="border rounded-lg bg-card">
              <StructureContentRenderer structureId={params.structureId} listType={tipoLista} contentType="visualization" />
            </div>
          </TabsContent>

          {/* Atividades práticas */}
          <TabsContent value="practice">
            <div className="border rounded-lg p-6 bg-card">
              <h2 className="text-2xl text-stone-800 font-semibold mb-2">
                Questões
              </h2>
              <p className="text-muted-foreground mb-6">
                Complete os desafios para testar seu conhecimento sobre listas.
              </p>
              <StructureContentRenderer structureId={params.structureId} listType={tipoLista} contentType="activity" />
            </div>
          </TabsContent>

          {/* Desafios */}
          <TabsContent value="challenge">
            <div className="border rounded-lg p-6 bg-card">
              <h2 className="text-2xl text-stone-800 font-semibold mb-2">
                Desafios
              </h2>
              <p className="text-muted-foreground mb-6">
                Enfrente os desafios para aprimorar suas habilidades em listas.
              </p>
              <StructureContentRenderer structureId={params.structureId} listType={tipoLista} contentType="challenge" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default function StructurePage({ params }: { params: { structureId: string } }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Suspense fallback={<div>Carregando...</div>}>
          <StructurePageContent params={params} />
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
