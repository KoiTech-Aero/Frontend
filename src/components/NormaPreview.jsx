import { Link } from "react-router";

export default function NormaPreview() {
  return (
    <div className="grid grid-cols-3 gap-5 mt-10">
      <div className="bg-amber-50 w-90 h-60 rounded-2xl p-5">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h2 className="text-sm w-fit px-2 rounded-sm bg-blue-200 border border-blue-400 text-blue-500">
              Código
            </h2>
            <p className="text-green-500">status</p>
          </div>
          <h1 className="text-2xl font-bold mt-2">Título</h1>
        </div>
        <div className="flex gap-1">
          <p className="text-gray-600">Área</p>
          <p>|</p>
          <p className="text-gray-400">Última atualização</p>
        </div>
        <Link to="/visualizarNorma">
          <button className="w-full bg-gray-200 mt-5 px-4 py-2 rounded-md text-gray-700 font-light text-lg cursor-pointer">
            Visualizar Norma
          </button>
        </Link>
      </div>
    </div>
  );
}
