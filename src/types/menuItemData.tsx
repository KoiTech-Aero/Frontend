import type { ComponentProps } from "react";
import type { PERMISSOES } from "../enums/permissoes";

export type Permissao = (typeof PERMISSOES)[keyof typeof PERMISSOES];

export type menuItemData = {
	id: number;
	icon: React.FC<ComponentProps<"svg">>;
	children: string;
	endpoint: string;
	permissao: Permissao;
};
