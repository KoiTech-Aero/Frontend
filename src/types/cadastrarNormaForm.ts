import type { Tag } from "./tags";

export interface cadastrarNormaForm {
	codigo: string;
	titulo: string;
	escopo: string;
	area_tecnica: string;
	orgao_emissor: string;
	versao_numero: string;
	descricao: string;
	tags: Tag[];
	path_file: File | null;
}
