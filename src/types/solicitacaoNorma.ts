export interface UsuarioSolicitacao {
  id: string;
  role: string;
}

export interface SolicitacaoNorma {
  id: string;
  titulo: string;
  codigo_norma: string;
  versao_norma: string;
  orgao_emissor: string;
  motivo: string;
  status: "Pendente" | "Aprovado" | "Recusado";
  data_solicitacao: string;
  usuario: UsuarioSolicitacao;
}
