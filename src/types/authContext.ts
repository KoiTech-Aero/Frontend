import type { Usuario } from "./usuarioLogado";

export interface AuthContextType {
	usuario: Usuario | null;
	setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
	login: (user: Usuario) => void;
	logout: () => void;
	updateUsuario: (dadosAtualizados: Partial<Usuario>) => void;
}
