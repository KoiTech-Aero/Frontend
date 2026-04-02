import { useLocation, useNavigate } from "react-router";

export default function VisualizarVersao() {
  const location = useLocation();
  const norma = location.state?.norma;
  const versao = location.state?.versao;

  const data_publicacao = new Date(versao.data_publicacao).toLocaleDateString()

  const navigate = useNavigate();

  return (
    <div className="overflow-y-auto w-[90%] flex flex-col rounded-2xl bg-amber-50">
      {/* Header */}
      <div className="m-5 flex justify-between align-center">
        <h5 className="text-xl w-fit px-2 rounded-sm bg-blue-200 border border-blue-400 text-blue-500">
          Versão número: {versao.versao_numero}
        </h5>
        <h5 className="text-xl w-fit px-2 rounded-sm bg-green-200 border border-blue-400 text-green-500">
          Data de publicação: {data_publicacao}
        </h5>
        <h5 className="text-xl w-fit px-2 rounded-sm bg-green-200 border border-blue-400 text-green-500">
          {versao.status ? "revisada" : "obsoleta"}
        </h5>
      </div>

      <div className="m-5">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold">Descrição</h3>
        </div>
        <p className="border-4 rounded-md p-4 mt-4 border-gray-300 bg-gray-100 font-medium">
          {versao.descricao}
        </p>
      </div>

      <div className="m-5 flex flex-col gap-1">
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
