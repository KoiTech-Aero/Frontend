import { X, Menu as MenuIcon } from "lucide-react";
import MenuSecao from "./menuSecao";
import UsuarioCard from "../usuarioCard";
import Text from "../text";
import type { menuItemData } from "../../types/menuItemData";

interface Props {
  open: boolean;
  onToggle: () => void;
  itensMenu: menuItemData[];
  itensAdmin: menuItemData[];
}

export default function DesktopSidebar({
  open,
  onToggle,
  itensMenu,
  itensAdmin,
}: Props) {
  return (
    <aside
      className={`hidden md:flex flex-col h-screen bg-red-dark border-r border-slate-800 transition-all duration-300 ${
        open ? "w-72" : "w-20"
      }`}
    >
      <div className={`flex items-center p-4 ${open ? "justify-between" : "justify-center"}`}>
        {open && <Text as="h1" isTitle>KOITECH AERO</Text>}

        <button onClick={onToggle} className="text-white">
          {open ? <X /> : <MenuIcon />}
        </button>
      </div>

      <MenuSecao titulo="Menu" itens={itensMenu} open={open} />
      <MenuSecao titulo="Administrador" itens={itensAdmin} open={open} />

      <UsuarioCard open={open} />
    </aside>
  );
}