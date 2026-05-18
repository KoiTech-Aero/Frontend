import { Home, FilePlus2, ClipboardPlus, UserPlus } from "lucide-react";
import { PERMISSOES } from "../enums/permissoes";
import type { menuItemData } from "../types/menuItemData";

export const itensMenu: menuItemData[] = [
  {
    id: 1,
    icon: Home,
    children: "Página Inicial",
    endpoint: "/pesquisarNorma",
    permissao: PERMISSOES.PESQUISAR,
  },
  {
    id: 2,
    icon: FilePlus2,
    children: "Cadastrar Norma",
    endpoint: "/cadastrarNorma",
    permissao: PERMISSOES.CADASTRAR_NORMA,
  },
  {
    id: 3,
    icon: ClipboardPlus,
    children: "Solicitar Norma",
    endpoint: "/solicitarNorma",
    permissao: PERMISSOES.SOLICITAR,
  },
];

export const itensAdmin: menuItemData[] = [
  {
    id: 11,
    icon: UserPlus,
    children: "Cadastrar Usuário",
    endpoint: "/cadastrarUsuario",
    permissao: PERMISSOES.CADASTRAR_USUARIO,
  },
];