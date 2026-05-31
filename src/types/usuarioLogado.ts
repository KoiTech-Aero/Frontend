export interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: string;
  status: boolean;
  data_cadastro: Date;
}