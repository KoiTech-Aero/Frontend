import { Menu as MenuIcon, X } from "lucide-react";
import type { menuItemData } from "../../types/menuItemData";
import Text from "../text";
import MenuSecao from "./menuSecao";
import UsuarioCard from "./usuarioCard";

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

			<MenuSecao titulo="Menu" itens={itensMenu} open={open} />
			<MenuSecao titulo="Administrador" itens={itensAdmin} open={open} />

			<UsuarioCard open={open} />
		</aside>
	);
}
