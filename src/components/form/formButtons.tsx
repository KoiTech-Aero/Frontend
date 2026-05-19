import { useLocation } from "react-router";
import type { formButtonsProps } from "../../types/formButtons";

export default function FormButtons({ onCancel }: formButtonsProps) {
  const location = useLocation();

  let tituloAtual = "";

  if (location.pathname === "/solicitarNorma")
    tituloAtual = "Salvar Solicitação";

  if (location.pathname === "/cadastrarNorma")
    tituloAtual = "Salvar Norma";

  if (location.pathname === "/cadastrarUsuario")
    tituloAtual = "Cadastrar Usuário";

  if (location.pathname.startsWith("/editarUsuario"))
    tituloAtual = "Atualizar Usuário";

  return (
    <div className="w-full flex flex-col sm:flex-row justify-end gap-3 pt-2">
      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-1 rounded-lg bg-red text-white font-semibold hover:bg-red-hover transition cursor-pointer"
      >
        {tituloAtual}
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="w-full sm:w-auto px-5 py-1 rounded-lg border-2 border-gray-300 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
      >
        Cancelar
      </button>
    </div>
  );
}
