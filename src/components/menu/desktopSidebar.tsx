import { Menu as MenuIcon, X } from "lucide-react";
import type { menuItemData } from "../../types/menuItemData";
import Text from "../text";
import MenuSecao from "./menuSecao";
import UsuarioCard from "./usuarioCard";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

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
  const { usuario: usuarioLogado } = useContext(AuthContext);

  return (
    <aside
      className={`hidden md:flex flex-col h-screen bg-red-dark border-r border-slate-800 transition-all duration-300 ${
        open ? "w-80" : "w-20"
      }`}
    >
      <div
        className={`flex items-center p-4 ${open ? "justify-between" : "justify-center"}`}
      >
        {open && (
          <Text as="h1" isTitle>
            KOITECH AERO
          </Text>
        )}

        <button type="button" onClick={onToggle} className="text-white">
          {open ? <X /> : <MenuIcon />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <MenuSecao titulo="Menu" itens={itensMenu} open={open} />
        <MenuSecao
          titulo={usuarioLogado?.role || ""}
          itens={itensAdmin}
          open={open}
        />
      </div>

      <UsuarioCard open={open} />
    </aside>
  );
}
