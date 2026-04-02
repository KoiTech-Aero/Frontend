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
    new Date().toISOString().split("T")[0],
  );
  const [path_file, setPathFile] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const novaNorma = {
      norma: {
        codigo,
        titulo,
        escopo,
        area_tecnica,
        orgao_emissor,
      },
      versao: {
        versao_numero,
        descricao,
        data_publicacao,
        path_file,
        status: true,
      },
    };

    try {
      const response = await fetch("http://localhost:3000/addNorma", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaNorma),
      });

      const data = await response.json();
      console.log("Resposta:", data);

      alert("Norma cadastrada com sucesso!");

      navigate("/pesquisarNorma");
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-y-auto w-[90%] flex flex-col rounded-2xl bg-amber-50">
        {/* Header */}
        <div className="m-5 flex flex-col">
          <h1 className="text-3xl font-bold">Cadastro de Norma</h1>
          <h2 className="text-md">
            Informe os detalhes técnicos para registro.
          </h2>
        </div>

        <hr className="border-2 border-gray-300" />

        {/* Campos */}
        <div className="m-10 flex flex-col gap-5">
          <div className="flex justify-between items-center gap-x-30">
            <div className="w-full">
              <h1>Código da Norma</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200"
                type="text"
                required
                placeholder="Informe o código da norma"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>
            <div className="w-full">
              <h1>Área</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200"
                type="text"
                required
                placeholder="Informe a área principal da norma"
                value={area_tecnica}
                onChange={(e) => setAreaTecnica(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-30">
            <div className="w-full">
              <h1>Título da Norma</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200"
                type="text"
                required
                placeholder="Informe o título da norma"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="w-full">
              <h1>Órgão emissor</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200"
                type="text"
                required
                placeholder="Informe o órgão emissor"
                value={orgao_emissor}
                onChange={(e) => setOrgaoEmissor(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h1>Escopo</h1>
            <textarea
              placeholder="Informe o escopo da norma"
              value={escopo}
              required
              onChange={(e) => setEscopo(e.target.value)}
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200"
            ></textarea>
          </div>

          <br />
          <div className="flex justify-between items-center gap-x-30">
            <div className="w-full">
              <h1>Número da versão</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200"
                type="text"
                required
                placeholder="Informe o título da norma"
                value={versao_numero}
                onChange={(e) => setVersaoNumero(e.target.value)}
              />
            </div>
            <div className="w-full">
              <h1>Data de publicação</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200 cursor-default"
                type="text"
                required
                value={data_publicacao}
                onChange={(e) => setDataPublicacao(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h1>Descrição da versão</h1>
            <textarea
              placeholder="Informe a descrição da versão"
              value={descricao}
              required
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200"
            ></textarea>
          </div>

          <div className="flex justify-between items-center gap-x-30">
            <div className="w-full">
              <h1>Arquivo .pdf</h1>
              {/* <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200 cursor-pointer"
                type="file"
                accept="application/pdf"
                required
                onChange={(e) => setPathFile(e.target.files[0])}
              /> */}
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200"
                type="text"
                required
                value={path_file}
                onChange={(e) => setPathFile(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between gap-x-10">
            <button
              type="submit"
              className="w-125 bg-blue-600 text-white font-bold rounded-md cursor-pointer transition duration-1000 ease-in-out hover:bg-blue-700"
            >
              Salvar Norma no Sistema
            </button>
            <button className="w-50 border-4 rounded-md p-1 border-gray-300 bg-gray-100 cursor-pointer transition duration-1000 ease-in-out hover:bg-gray-200">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
