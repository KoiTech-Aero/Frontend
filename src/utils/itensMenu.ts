import {
  Home,
  FilePlus2,
  ClipboardPlus,
  UserPlus,
  Users,
  User,
  ClipboardList,
} from "lucide-react";
import { PERMISSOES } from "../enums/permissoes";
import type { menuItemData } from "../types/menuItemData";

export function getItensMenu(usuarioLogado: any): menuItemData[] {
  return [
    {
      id: 1,
      icon: Home,
      children: "Página Inicial",
      endpoint: "/pesquisarNorma",
      permissao: PERMISSOES.PESQUISAR,
    },
    {
      id: 2,
      icon: ClipboardPlus,
      children: "Solicitar Norma",
      endpoint: "/solicitarNorma",
      permissao: PERMISSOES.SOLICITAR,
    },
    {
      id: 3,
      icon: User,
      children: "Meu Perfil",
      endpoint: `/editarUsuario/${usuarioLogado.id}`,
      permissao: PERMISSOES.EDITAR_USUARIO,
    },
    {
      id: 4,
      icon: ClipboardPlus,
      children: "Solicitar Nota",
      endpoint: "/solicitarNota",
      permissao: PERMISSOES.SOLICITAR_NOTA,
    },
  ];
}

export function getItensAdmin(usuarioLogado: any): menuItemData[] {
  return [
    {
    id: 10,
    icon: ClipboardList,
    children: "Visualizar Solicitações",
    endpoint: "/visualizarSolicitacoes",
    permissao: PERMISSOES.VISUALIZAR_SOLICITACOES,
  },
  {
    id: 11,
    icon: FilePlus2,
    children: "Cadastrar Norma",
    endpoint: "/cadastrarNorma",
    permissao: PERMISSOES.CADASTRAR_NORMA,
  },
  {
    id: 12,
    icon: Users,
    children: "Visualizar Usuários",
    endpoint: "/visualizarUsuarios",
    permissao: PERMISSOES.VISUALIZAR_USUARIOS,
  },
  {
    id: 13,
    icon: UserPlus,
    children: "Cadastrar Usuário",
    endpoint: "/cadastrarUsuario",
    permissao: PERMISSOES.CADASTRAR_USUARIO,
  },
  {
    id: 14,
    icon: FilePlus2,
    children: "Cadastrar Tag",
    endpoint: "/cadastrarTag",
    permissao: PERMISSOES.CADASTRAR_TAG,
  },
  ];
}
