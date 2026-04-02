import { FileText, History, Link as LinkIcon } from "lucide-react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

export default function VisualizarNorma() {
  const location = useLocation();
  const norma = location.state?.norma;

  const navigate = useNavigate();

  if (!norma) return <p>Nenhuma norma recebida</p>;

  return (
    <div className="overflow-y-auto w-[90%] flex flex-col rounded-2xl bg-amber-50">
      {/* Header */}
      <div className="m-5 flex flex-col gap-1">
        <h5 className="text-sm w-fit px-2 rounded-sm bg-blue-200 border border-blue-400 text-blue-500">
          {norma.codigo}
        </h5>
        <h1 className="text-3xl font-bold">{norma.titulo}</h1>
      </div>

      <hr className="border-2 border-gray-300" />

      {/* Escopo */}
      <div className="m-5">
        <div className="flex items-center gap-2">
          <FileText />
          <h3 className="text-xl font-bold">Escopo</h3>
        </div>

        <p className="border-4 rounded-md p-4 mt-4 border-gray-300 bg-gray-100 font-medium">
          {norma.escopo}
        </p>
      </div>

      <hr className="border-2 border-gray-300" />

      {/* Versões */}
      <div className="m-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <History />
            <h3 className="text-xl font-bold">Versões</h3>
          </div>

          <button
            className="bg-blue-600 text-white font-bold rounded-md cursor-pointer px-2 py-0.5 transition duration-1000 ease-in-out hover:bg-blue-700"
            onClick={() =>
              navigate("/cadastrarVersao", { state: { norma } })
            }
          >
            Adicionar Versão
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-4 cursor-default">
          {norma.versoes.slice().reverse().map((versao) => (
            <div
              key={versao.versao_numero}
              className="flex justify-between items-center p-3 border-4 rounded-md border-gray-300 bg-gray-100"
            >
              <div>
                <h4 className="text-lg font-bold">{versao.versao_numero}</h4>
                <p className="text-gray-600 font-light">{versao.descricao}</p>
                <p className="text-gray-600 font-light">
                  {versao.data_publicacao}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <p className="bg-green-500 text-white rounded-2xl px-4 py-1 text-sm">
                  {versao.status ? "revisada" : "obsoleta"}
                </p>

                <button
                  onClick={() =>
                    navigate("/visualizarVersao", { state: { norma, versao } })
                  }
                  className="font-bold text-gray-500 cursor-pointer hover:text-blue-500"
                >
                  Visualizar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-2 border-gray-300" />

      {/* Normas Relacionadas */}
      <div className="m-5">
        <div className="flex items-center gap-2">
          <LinkIcon />
          <h3 className="text-xl font-bold">Normas Relacionadas</h3>
        </div>

        <div className="grid grid-cols-2 pt-5 gap-5 mx-5 cursor-pointer">
          {/* {norma.relacionadas.map((rel, index) => (
            <div
              key={index}
              className="flex gap-2 border-4 rounded-md border-gray-300 bg-gray-100 p-2 transition duration-1000 ease-in-out hover:bg-gray-200"
            >
              <h5 className="text-sm px-2 rounded-sm bg-blue-200 border border-blue-400 text-blue-500">
                {rel.codigo}
              </h5>
              <h1 className="font-medium">{rel.titulo}</h1>
            </div>
          ))} */}

          <div className="flex gap-2 border-4 rounded-md border-gray-300 bg-gray-100 p-2 border-dotted justify-center transition duration-1000 ease-in-out hover:bg-gray-200">
            <h1 className="font-medium ">Adicionar Relação</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
