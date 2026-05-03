import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import type { PERMISSOES } from "../enums/permissoes";
import type { menuItemData } from "../types/menuItemData";
import { temPermissao } from "../utils/temPermissao";
import LinhaHorizontal from "./linhaHorizontal";
import MenuItem from "./menuItem";
import Text from "./text";

interface MenuSecaoProps {
	titulo: string;
	itens: menuItemData[];
	open: boolean;
	selectItem: number;
	setSelectItem: (id: number) => void;
}

export default function MenuSecao({
	titulo,
	itens,
	open,
	selectItem,
	setSelectItem,
}: MenuSecaoProps) {
	const { usuario } = useContext(AuthContext);
	const [itensData] = useState(itens);

	function handleSelect(id: number) {
		setSelectItem(id);
	}

	return (
		<section>
			<LinhaHorizontal />

			<Text
				as="h1"
				className={`${!open ? "lg:hidden" : "lg:block"} my-3 mx-auto `}
				isTitle
			>
				{titulo}
			</Text>

			{itensData.map((item, index) => {
				if (temPermissao(usuario, item.permissao)) {
					return (
						<MenuItem
							icon={item.icon}
							endpoint={item.endpoint}
							select={selectItem === item.id ? true : false}
							open={open}
							key={`${index} - ${item.children}`}
							onClick={() => handleSelect(item.id)}
						>
							{item.children}
						</MenuItem>
					);
				}
				return null;
			})}
		</section>
	);
}
