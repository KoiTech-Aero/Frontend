import { useLocation, useNavigate } from "react-router";
import { FileText, Info, History, Calendar1 } from "lucide-react";

export default function VisualizarVersao() {
  const location = useLocation();
  const norma = location.state?.norma;
  const versao = location.state?.versao;

  const data_publicacao = new Date(versao.data_publicacao).toLocaleDateString();

  const navigate = useNavigate();

  return (
    <div className="overflow-y-auto w-[90%] flex flex-col rounded-2xl bg-amber-50">
      {/* Header */}
      <div className="m-5 flex justify-start align-center">
        <h5
          className={`text-white rounded-2xl px-4 py-1 text-lg font-bold ${
            versao.status ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {versao.status ? "Revisada" : "Obsoleta"}
        </h5>
      </div>

      <div className="m-5 flex justify-between items-center gap-x-30">
        <div className="w-full">
          <div className="flex gap-2">
            <History />
            <h3 className="text-xl font-bold">Número da Versão</h3>
          </div>
          <p className="border-4 rounded-md p-4 mt-4 border-gray-300 bg-gray-100 font-medium">
            {versao.versao_numero}
          </p>
        </div>
        <div className="w-full">
          <div className="flex gap-2">
            <Calendar1 />
            <h3 className="text-xl font-bold">Data de Publicação</h3>
          </div>
          <p className="border-4 rounded-md p-4 mt-4 border-gray-300 bg-gray-100 font-medium">
            {data_publicacao}
          </p>
        </div>
      </div>

      <div className="m-5">
        <div className="flex gap-2">
          <Info />
          <h3 className="text-xl font-bold">Descrição</h3>
        </div>
        <p className="border-4 rounded-md p-4 mt-4 border-gray-300 bg-gray-100 font-medium">
          {versao.descricao}
        </p>
      </div>

      <div className="m-5">
        <div className="flex gap-2">
          <FileText />
          <h3 className="text-xl font-bold mb-2">Documento</h3>
        </div>

        <iframe
          src={`http://localhost:3000${versao.path_file}`}
          className="w-full h-dvh border-4 border-gray-300 rounded-md"
        />
      </div>

      <div className="m-5 flex justify-end">
        <button
          className="bg-blue-600 text-white font-bold rounded-md cursor-pointer px-2 py-0.5 transition duration-1000 ease-in-out hover:bg-blue-700"
          onClick={() => navigate("/visualizarNorma", { state: { norma } })}
        >
          VOLTAR
        </button>
      </div>
    </div>
  );
}
