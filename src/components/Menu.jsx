import { PanelsTopLeft, Plus, Tag } from "lucide-react";
import { Link } from "react-router";

export default function Menu() {
  const btnClass = "cursor-pointer bg-blue-500 p-6 rounded-xl text-white font-bold transition duration-1000 ease-in-out hover:bg-blue-600";

  return (
    <div className="bg-slate-900 w-75 p-6 h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        <button className={btnClass}>
          <Link to="/pesquisarNorma" className="flex items-center gap-2">
            <PanelsTopLeft />
            Normas Ativas
          </Link>
        </button>
        <button className={btnClass}>
          <Link to="/cadastrarNorma" className="flex items-center gap-2">
            <Plus />
            Cadastrar Normas
          </Link>
        </button>
      </div>

      {/* aplicação futura */}
      {/* <div className="bg-slate-800 p-6 rounded-xl text-white font-bold">
        <p>Nome do Usuário</p>
        <p>Cargo: Gestor</p>
      </div> */}
    </div>
  );
}
