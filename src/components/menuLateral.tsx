import { Home, MenuIcon, Newspaper, ScrollText, User } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { PERMISSOES } from "../enums/permissoes";
import type { menuItemData } from "../types/menuItemData";
import MenuSecao from "./menuSecao";
import Text from "./text";
import UsuarioCard from "./usuarioCard";

export default function MenuLateral() {
	const [open, setOpen] = useState(true);
	const [select, setSelect] = useState(1);
	const { usuario, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	function handleLogout() {
		logout();
		navigate("/login");
	}

	function handleMenu() {
		setOpen((prev) => !prev);
	}

	const itensMenu: menuItemData[] = [
		{
			id: 1,
			icon: Home,
			children: "Home",
			endpoint: "/pesquisarNorma",
			permissao: PERMISSOES.PESQUISAR,
		},
		{
			id: 2,
			icon: ScrollText,
			children: "Normas",
			endpoint: "/cadastrarNorma",
			permissao: PERMISSOES.CADASTRAR_NORMA,
		},
		{
			id: 3,
			icon: Newspaper,
			children: "Solicitações",
			endpoint: "/solicitarNorma",
			permissao: PERMISSOES.SOLICITAR,
		},
	];

	const itensAdmin: menuItemData[] = [
		{
			id: 11,
			icon: User,
			children: "Usuários",
			endpoint: "cadastrarUsuario",
			permissao: PERMISSOES.CADASTRAR_USUARIO,
		},
	];

	return (
		<aside className="w-full h-full lg:w-fit bg-red relative">
			<Text className="inline-block m-3 mb-0">
				<MenuIcon color="white" onClick={handleMenu} />
			</Text>

			<MenuSecao
				titulo="menu"
				itens={itensMenu}
				open={open}
				selectItem={select}
				setSelectItem={setSelect}
			/>
			<MenuSecao
				titulo="Administrador"
				itens={itensAdmin}
				open={open}
				selectItem={select}
				setSelectItem={setSelect}
			/>

			<UsuarioCard />
		</aside>
	);
}
