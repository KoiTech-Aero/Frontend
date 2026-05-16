export interface cadastrarNormaForm {
  codigo: string;
  titulo: string;
  escopo: string;
  area_tecnica: string;
  orgao_emissor: string;
  versao_numero: string;
  descricao: string;
  tags: string[];
  path_file: File | null;
}