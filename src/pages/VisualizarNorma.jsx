import { FileText, History, Link as LinkIcon } from "lucide-react";

export default function VisualizarNorma({ norma: normaProp }) {
  // mock interno (temporário)
  const normaMock = {
    codigo: "NRB 123",
    titulo: "Título Norma",
    resumo: "Lorem ipsum dolor sit amet...",
    versoes: [
      { id: 1, nome: "Versão 1", data: "01/01/2025", status: "Ativa" },
      { id: 2, nome: "Versão 2", data: "01/06/2025", status: "Inativa" },
      { id: 3, nome: "Versão 3", data: "01/06/2025", status: "Inativa" }
    ],
    relacionadas: [
      { codigo: "NRB 200", titulo: "Outra norma" },
      { codigo: "NRB 300", titulo: "Mais uma norma" },
    ],
  };

  // usa o que vier por props, senão usa mock
  const norma = normaProp || normaMock;

  return (
    <div className="overflow-y-auto flex flex-col w-5xl mx-auto border-4 rounded-2xl border-gray-300 bg-amber-50">
      {/* Header */}
      <div className="m-5 flex flex-col gap-1">
        <h5 className="text-sm w-fit px-2 rounded-sm bg-blue-200 border border-blue-400 text-blue-500">
          {norma.codigo}
        </h5>
        <h1 className="text-3xl font-bold">{norma.titulo}</h1>
      </div>

      <hr className="border-2 border-gray-300" />

      {/* Resumo */}
      <div className="m-5">
        <div className="flex items-center gap-2">
          <FileText />
          <h3 className="text-xl font-bold">Resumo</h3>
        </div>

        <p className="border-4 rounded-md p-4 mt-4 border-gray-300 bg-gray-100 font-medium">
          {norma.resumo}
        </p>
      </div>

      <hr className="border-2 border-gray-300" />

      {/* Versões */}
      <div className="m-5">
        <div className="flex items-center gap-2">
          <History />
          <h3 className="text-xl font-bold">Versões</h3>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {norma.versoes.map((versao) => (
            <div
              key={versao.id}
              className="flex justify-between items-center p-3 border-4 rounded-md border-gray-300 bg-gray-100"
            >
              <div>
                <h4 className="text-lg font-bold">{versao.nome}</h4>
                <p className="text-gray-600 font-light">{versao.data}</p>
              </div>

              <div className="flex items-center gap-3">
                <p className="bg-green-500 text-white rounded-2xl px-4 py-1 text-sm">
                  {versao.status}
                </p>

                <button
                  onClick={() => console.log("Versão:", versao.id)}
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
          {norma.relacionadas.map((rel, index) => (
            <div
              key={index}
              className="flex gap-2 border-4 rounded-md border-gray-300 bg-gray-100 p-2"
            >
              <h5 className="text-sm px-2 rounded-sm bg-blue-200 border border-blue-400 text-blue-500">
                {rel.codigo}
              </h5>
              <h1 className="font-medium">{rel.titulo}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
