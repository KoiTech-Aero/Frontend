export interface Versao {
	versao_numero: string;
	descricao: string;
	data_publicacao: Date;
	status: boolean;
	path_file: string;
}

export interface Norma {
	id: string;
	codigo: string;
	titulo: string;
	escopo: string;
	area_tecnica: string;
	orgao_emissor: string;
	versoes: Versao[];
}
