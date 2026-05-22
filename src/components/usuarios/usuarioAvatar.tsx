import gestorAvatar from "../../assets/roles/gestor.png";

import engenheiroAvatar from "../../assets/roles/engenheiro.png";

import visualizadorAvatar from "../../assets/roles/visualizador.png";

interface UsuarioAvatarProps {
  role: string;
}

const roleImages: Record<string, string> = {
  Gestor: gestorAvatar,
  Engenheiro: engenheiroAvatar,
  Visualizador: visualizadorAvatar,
};

export default function UsuarioAvatar({ role }: UsuarioAvatarProps) {
  return (
    <div className="flex items-center justify-center">
      <img
        src={roleImages[role] ?? visualizadorAvatar}
        alt={role}
        className="h-11 w-11 rounded-full object-cover border border-black/10 shadow-sm"
      />
    </div>
  );
}
