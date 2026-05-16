import { LogOut } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

interface UsuarioCardProps {
  open: boolean;
}

export default function UsuarioCard({
  open,
}: UsuarioCardProps) {
  const { usuario, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="mt-auto border-t border-red-hover p-4">
      {open ? (
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-bold text-white">
              {usuario?.nome}
            </p>

            <p className="text-sm text-white/70">
              {usuario?.role}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-red hover:bg-red-hover transition duration-300 text-white font-bold cursor-pointer"
          >
            <LogOut size={18} />

            <span>Sair</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleLogout}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-red hover:bg-red-hover transition duration-300 text-white cursor-pointer"
          >
            <LogOut size={18} />
          </button>
        </div>
      )}
    </div>
  );
}