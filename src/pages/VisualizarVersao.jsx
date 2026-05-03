import { useLocation, useNavigate } from "react-router";
import { FileText, Info, History, Calendar1 } from "lucide-react";
import { useState } from "react";

export default function VisualizarVersao() {
  const location = useLocation();
  const norma = location.state?.norma;
  const versao = location.state?.versao;

  const data_publicacao = new Date(
    versao.data_publicacao
  ).toLocaleDateString();

  const navigate = useNavigate();

  const [openPdf, setOpenPdf] = useState(false);

  return (
    <>
      <div className="overflow-y-auto w-full max-w-4xl mx-auto px-4 md:px-8 flex flex-col rounded-2xl bg-amber-50">

        {/* STATUS */}
        <div className="m-5 flex justify-start">
          <h5
            className={`text-white rounded-2xl px-3 py-0.5 text-sm md:px-4 md:py-1 md:text-lg font-bold ${
              versao.status ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {versao.status ? "Revisada" : "Obsoleta"}
          </h5>
        </div>

        {/* GRID PRINCIPAL */}
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="flex gap-2">
              <History />
              <h3 className="text-md font-medium">
                Número da Versão
              </h3>
            </div>
            <p className="border-4 rounded-md p-3 md:p-4 mt-4 border-gray-300 bg-gray-100 font-medium">
              {versao.versao_numero}
            </p>
          </div>

          <div>
            <div className="flex gap-2">
              <Calendar1 />
              <h3 className="text-md font-medium">
                Data de Publicação
              </h3>
            </div>
            <p className="border-4 rounded-md p-3 md:p-4 mt-4 border-gray-300 bg-gray-100 font-medium">
              {data_publicacao}
            </p>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className="m-5">
          <div className="flex gap-2">
            <Info />
            <h3 className="text-md font-medium">
              Descrição
            </h3>
          </div>
          <p className="border-4 rounded-md p-3 md:p-4 mt-4 border-gray-300 bg-gray-100 font-medium">
            {versao.descricao}
          </p>
        </div>

        {/* DOCUMENTO */}
        <div className="m-5">
          <div className="flex gap-2">
            <FileText />
            <h3 className="text-md font-medium">
              Documento
            </h3>
          </div>

          <button
            onClick={() => setOpenPdf(true)}
            className="mt-4 w-full md:w-fit bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
          >
            Visualizar Documento
          </button>
        </div>

        {/* VOLTAR */}
        <div className="m-5 flex justify-end">
          <button
            className="w-full md:w-auto bg-blue-600 text-white font-bold rounded-md px-4 py-2 hover:bg-blue-700 cursor-pointer"
            onClick={() =>
              navigate("/visualizarNorma", { state: { norma } })
            }
          >
            VOLTAR
          </button>
        </div>
      </div>

      {/* MODAL PDF */}
      {openPdf && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 md:p-6">
          <div className="bg-white w-full h-full md:h-[90vh] md:max-w-5xl rounded-lg flex flex-col">

            {/* HEADER MODAL */}
            <div className="flex justify-between items-center p-3 border-b">
              <h2 className="font-bold">Documento da Norma</h2>
              <button
                onClick={() => setOpenPdf(false)}
                className="text-gray-500 hover:text-black cursor-pointer"
              >
                Fechar
              </button>
            </div>

            {/* PDF */}
            <iframe
              src={`http://localhost:3000${versao.path_file}`}
              className="w-full flex-1"
            />
          </div>
        </div>
      )}
    </>
  );
}