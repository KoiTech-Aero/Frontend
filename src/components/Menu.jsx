import { PanelsTopLeft, Plus, Tag } from "lucide-react";
import { Link } from "react-router";

export default function Menu() {
  const btn =
    "w-full flex items-center gap-2 cursor-pointer bg-blue-500 p-6 rounded-xl text-white font-bold transition duration-1000 ease-in-out hover:bg-blue-600";
  return (
    <div className="bg-slate-900 w-75 p-6 h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        <Link to="/pesquisarNorma">
          <button className={btn}>
            <PanelsTopLeft />
            Normas Ativas
          </button>
        </Link>
        <Link to="/cadastrarNorma">
          <button className={btn}>
            <Plus />
            Cadastrar Normas
          </button>
        </Link>
      </div>

      {/* aplicação futura */}
      {/* <div className="bg-slate-800 p-6 rounded-xl text-white font-bold">
        <p>Nome do Usuário</p>
        <p>Cargo: Gestor</p>
      </div> */}
    </div>
  );
}
