import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

export default function CadastrarVersao() {
  const location = useLocation();
  const norma = location.state?.norma;

  const navigate = useNavigate();

  const id_norma = norma.codigo;
  const [versao_numero, setVersaoNumero] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data_publicacao, setDataPublicacao] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [path_file, setPathFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id_norma", id_norma);
    formData.append("versao_numero", versao_numero);
    formData.append("descricao", descricao);
    formData.append("data_publicacao", data_publicacao);
    formData.append("status", "true");
    formData.append("file", path_file);

    try {
      const response = await fetch("http://localhost:3000/addVersao", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      const novaVersao = {
        ...data,
        status: true,
      };

      const normaAtualizada = {
        ...norma,
        versoes: norma.versoes
          .map((v) => ({
            ...v,
            status: false,
          }))
          .concat(novaVersao),
      };

      alert("Versão cadastrada com sucesso!");
      navigate("/visualizarNorma", { state: { norma: normaAtualizada } });
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className="overflow-y-auto w-full max-w-3xl flex flex-col rounded-2xl bg-white">
        {/* HEADER */}
        <div className="m-5 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold">Adicionar Versão</h1>
          <h2 className="text-md text-gray-500">
            Informe os detalhes técnicos para registro.
          </h2>
        </div>

        <hr className="border-2 border-gray-300" />

        {/* FORM */}
        <div className="m-5 md:m-10 flex flex-col gap-5">
          {/* LINHA 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h1>Código da Norma</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100"
                disabled
                value={id_norma}
              />
            </div>

            <div>
              <h1>Número da versão</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
                type="text"
                required
                value={versao_numero}
                onChange={(e) => setVersaoNumero(e.target.value)}
              />
            </div>
          </div>

          {/* LINHA 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h1>Descrição</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
                type="text"
                required
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div>
              <h1>Data de publicação</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100"
                type="text"
                disabled
                value={data_publicacao}
              />
            </div>
          </div>

          {/* ARQUIVO */}
          <div>
            <h1>Arquivo .pdf</h1>

            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
              <label className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-lg font-bold text-center">
                Escolher Arquivo
                <input
                  className="hidden"
                  type="file"
                  accept="application/pdf"
                  required
                  onChange={(e) => setPathFile(e.target.files[0])}
                />
              </label>

              {path_file && (
                <p className="text-sm wrap-break-word">
                  <b>Arquivo selecionado:</b> {path_file.name}
                </p>
              )}
            </div>
          </div>

          {/* BOTÕES 75 / 25 */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full">
            <button
              type="submit"
              className="w-full md:w-[75%] bg-blue-600 text-white font-bold rounded-md py-2 hover:bg-blue-700 cursor-pointer"
            >
              Salvar Norma no Sistema
            </button>

            <button
              type="button"
              onClick={() => navigate("/visualizarNorma", { state: { norma } })}
              className="w-full md:w-[25%] border-4 rounded-md py-1 border-gray-300 bg-gray-100 hover:bg-gray-200 whitespace-nowrap cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
