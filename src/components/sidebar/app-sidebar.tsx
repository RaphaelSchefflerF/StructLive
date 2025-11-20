"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useAppContext } from "@/contexts/AppContext";
import { CheckCircle, Minus, Plus, Globe2, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type * as React from "react";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { NavUser } from "@/components/nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { dataStructures, progress, currentStructure } = useAppContext();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  // Pega dados reais do usuário autenticado
  const { data: session } = useSession();

  // Busca dados do usuário do localStorage se disponíveis
  const [localUser, setLocalUser] = useState({
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    const name = localStorage.getItem("user_name") || "";
    const email = localStorage.getItem("user_email") || "";
    const image = localStorage.getItem("user_image") || "";
    setLocalUser({ name, email, image });
  }, [session]);

  const user = {
    name: localUser.name || session?.user?.name || "User",
    email: localUser.email || session?.user?.email || "",
    image: localUser.image || session?.user?.image || "",
  };

  // Salva os dados do usuário no localStorage sempre que a sessão mudar
  useEffect(() => {
    if (session?.user) {
      localStorage.setItem("user_name", session.user.name || "");
      localStorage.setItem("user_email", session.user.email || "");
      localStorage.setItem("user_image", session.user.image || "");
    }
  }, [session]);

  // Define o item atual como expandido quando a estrutura atual mudar
  useEffect(() => {
    if (currentStructure) {
      setExpandedItems((prev) => ({
        ...prev,
        [currentStructure]: true,
      }));
    }
  }, [currentStructure]);

  // Organiza as estruturas por complexidade
  const structuresByComplexity: Record<string, typeof dataStructures> = {
    Básico: [],
  };

  for (const structure of dataStructures) {
    structuresByComplexity[structure.complexity].push(structure);
  }

  // Obtém a data da última visita formatada
  const getLastVisitedText = (structureId: string) => {
    const lastVisited = progress[structureId]?.lastVisited;
    if (!lastVisited) return "";

    // Formate a data relativa (hoje, ontem, ou data específica)
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastVisited.toDateString() === today.toDateString()) {
      return "Visitado hoje";
    }
    if (lastVisited.toDateString() === yesterday.toDateString()) {
      return "Visitado ontem";
    }
    return `Visitado em ${lastVisited.toLocaleDateString()}`;
  };

  return (
    <Sidebar
      collapsible="icon"
      className="bg-blue-50 border-r border-blue-200 shadow-sm"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image
                  src="/assets/Logo.png"
                  alt="StructLive Logo"
                  width={64}
                  height={64}
                  className="h-8 w-8"
                  priority
                />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-xl">StructLive</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/estruturas" className="flex items-center gap-2">
                  <Globe2 className="text-blue-500 text-lg" />
                  <span className="font-medium">Estruturas de Dados</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Estruturas Básicas</SidebarGroupLabel>
          <SidebarMenu>
            {structuresByComplexity.Básico.map((structure) => (
              <Collapsible
                key={structure.id}
                defaultOpen={
                  expandedItems[structure.id] ||
                  structure.id === currentStructure
                }
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{structure.icon}</span>
                        {structure.title}
                        {progress[structure.id]?.completed && (
                          <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                        )}
                      </span>
                      <div>
                        <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={`/estruturas/${structure.id}?tab=conteudo`}
                          >
                            Conteúdo
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={`/estruturas/${structure.id}?tab=visualization`}
                          >
                            Visualização
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={`/estruturas/${structure.id}?tab=practice`}
                          >
                            Atividades
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {progress[structure.id]?.lastVisited && (
                        <div className="px-8 py-1 text-xs text-muted-foreground">
                          {getLastVisitedText(structure.id)}
                        </div>
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Ferramentas</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/configuracao" className="flex items-center gap-2">
                  <Settings className="text-blue-500 text-lg" />
                  <span className="font-medium">Configuração</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={user}
          onLogout={() => signOut({ callbackUrl: "/login" })}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
