import { PanelsTopLeft, Plus, Tag } from "lucide-react";
import { Link } from "react-router";

function Menu() {
  const btnClass = "bg-blue-500 p-6 rounded-xl text-white font-bold";

  return (
    <div className="bg-slate-900 w-75 p-6 h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        <button className={btnClass}>
          <Link to="/pesquisarNorma" className="flex gap-2">
            <PanelsTopLeft />
            Normas Ativas
          </Link>
        </button>
        <button className={btnClass}>
          <Link to="" className="flex gap-2">
            <Plus />
            Cadastrar Normas
          </Link>
        </button>
        <button className={btnClass}>
          <Link to="" className="flex gap-2">
            <Tag />
            Gerenciar Tags
          </Link>
        </button>
      </div>
      <div className="bg-slate-800 p-6 rounded-xl text-white font-bold">
        <p>Nome do Usuário</p>
        <p>Cargo: Engenheiro</p>
      </div>
    </div>
  );
}

export default Menu;
