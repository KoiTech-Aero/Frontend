import { useState } from "react";
import { useNavigate } from "react-router";

export default function CadastrarNorma() {
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [escopo, setEscopo] = useState("");
  const [area_tecnica, setAreaTecnica] = useState("");
  const [orgao_emissor, setOrgaoEmissor] = useState("");

  const [versao_numero, setVersaoNumero] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data_publicacao, setDataPublicacao] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [path_file, setPathFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("codigo", codigo);
    formData.append("titulo", titulo);
    formData.append("escopo", escopo);
    formData.append("area_tecnica", area_tecnica);
    formData.append("orgao_emissor", orgao_emissor);

    formData.append("versao_numero", versao_numero);
    formData.append("descricao", descricao);
    formData.append("data_publicacao", data_publicacao);
    formData.append("status", true);

    formData.append("file", path_file);

    try {
      const response = await fetch("http://localhost:3000/addNorma", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      alert("Norma cadastrada com sucesso!");
      navigate("/pesquisarNorma");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className="overflow-y-auto w-full max-w-4xl flex flex-col rounded-2xl bg-amber-50">

        {/* HEADER */}
        <div className="m-5 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold">
            Cadastro de Norma
          </h1>
          <h2 className="text-md text-gray-500">
            Informe os detalhes técnicos para registro.
          </h2>
        </div>

        <hr className="border-2 border-gray-200" />

        {/* FORM */}
        <div className="m-5 md:m-10 flex flex-col gap-5">

          {/* LINHA 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h1>Código da Norma</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
                type="text"
                required
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>

            <div>
              <h1>Área</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
                type="text"
                required
                value={area_tecnica}
                onChange={(e) => setAreaTecnica(e.target.value)}
              />
            </div>
          </div>

          {/* LINHA 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h1>Título da Norma</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
                type="text"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div>
              <h1>Órgão emissor</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
                type="text"
                required
                value={orgao_emissor}
                onChange={(e) => setOrgaoEmissor(e.target.value)}
              />
            </div>
          </div>

          {/* ESCOPO */}
          <div>
            <h1>Escopo</h1>
            <textarea
              value={escopo}
              required
              onChange={(e) => setEscopo(e.target.value)}
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
            />
          </div>

          {/* LINHA 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

          {/* DESCRIÇÃO */}
          <div>
            <h1>Descrição da versão</h1>
            <textarea
              value={descricao}
              required
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
            />
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
                <p className="text-sm wrap-break-words">
                  <b>Arquivo selecionado:</b> {path_file.name}
                </p>
              )}
            </div>
          </div>

          {/* BOTÕES */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full">
            <button
              type="submit"
              className="w-full md:w-[75%] bg-blue-600 text-white font-bold rounded-md py-2 hover:bg-blue-700 cursor-pointer"
            >
              Salvar Norma no Sistema
            </button>

            <button
              type="button"
              onClick={() => navigate("/pesquisarNorma")}
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