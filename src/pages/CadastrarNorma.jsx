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
  const [path_file, setPathFile] = useState(null);

  const areasTecnicas = [
    "Mecânica",
    "Hidráulica",
    "Elétrica",
    "Eletrônica",
    "Aviônicos",
    "Estruturas Aeronáuticas",
    "Motores",
    "Propulsão",
    "Pneumática",
    "Combustível",
    "Trem de Pouso",
    "Sistemas de Controle de Voo",
    "Navegação",
    "Comunicação",
    "Instrumentação",
    "Pressurização",
    "Ar-condicionado",
    "Sistemas Anti-gelo",
    "Sistemas de Oxigênio",
    "Iluminação",
    "Cabine",
    "Interior de Aeronaves",
    "Pintura Aeronáutica",
    "Corrosão",
    "Materiais Compostos",
    "Soldagem",
    "Usinagem",
    "Manutenção Preventiva",
    "Manutenção Corretiva",
    "Inspeção",
    "Qualidade",
    "Segurança Operacional",
    "Segurança de Voo",
    "Fatores Humanos",
    "Documentação Técnica",
    "Certificação",
    "Regulamentação",
    "Engenharia Aeronáutica",
    "Produção Aeronáutica",
    "Montagem",
    "Logística Aeronáutica",
    "Suprimentos",
    "Armazenamento",
    "Ensaios Não Destrutivos (END)",
    "Software Embarcado",
    "Sistemas Embarcados",
    "Automação",
    "Telecomunicações",
    "Aerodinâmica",
    "Balanceamento",
    "Estruturas Metálicas",
    "Estruturas Compósitas",
    "Processos Industriais",
    "Ferramentaria",
    "Calibração",
    "Metrologia",
    "Gestão da Manutenção",
    "Confiabilidade",
    "Rastreabilidade",
    "Meio Ambiente",
    "Sustentabilidade",
    "Operações de Solo",
    "Operações Aéreas",
    "Checklist Operacional",
    "Treinamento Técnico",
  ];

  const [buscaArea, setBuscaArea] = useState("");
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  const areasFiltradas = areasTecnicas.filter((area) =>
    area.toLowerCase().includes(buscaArea.toLowerCase()),
  );

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
      const verificaResponse = await fetch("http://localhost:3000/normas");
      const normas = await verificaResponse.json();

      const codigoExiste = normas.some((norma) => norma.codigo === codigo);

      if (codigoExiste) {
        alert("Já existe uma norma cadastrada com esse código!");
        return;
      }

      if (!areasTecnicas.includes(area_tecnica)) {
        alert("Selecione uma área válida da lista.");
        return;
      }

      if(!path_file.name){
        alert("Selecione um arquivo.");
        return
      }

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
      <div className="overflow-y-auto w-full max-w-4xl flex flex-col rounded-2xl bg-white">
        {/* HEADER */}
        <div className="m-5 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold">Cadastro de Norma</h1>
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
              <h1 className="font-medium">Código da Norma</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
                type="text"
                required
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>

            <div className="relative">
              <h1 className="font-medium">Área</h1>

              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
                type="text"
                required
                value={buscaArea || area_tecnica}
                placeholder="Pesquisar área..."
                onFocus={() => setMostrarDropdown(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setMostrarDropdown(false);
                  }, 150);
                }}
                onChange={(e) => {
                  setBuscaArea(e.target.value);
                  setAreaTecnica("");
                  setMostrarDropdown(true);
                }}
              />

              {mostrarDropdown && (
                <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto border-4 rounded-md border-gray-300 bg-gray-100">
                  {areasFiltradas.length > 0 ? (
                    areasFiltradas.map((area, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                          setAreaTecnica(area);
                          setBuscaArea(area);
                          setMostrarDropdown(false);
                        }}
                      >
                        {area}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">
                      Nenhuma área encontrada
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* LINHA 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h1 className="font-medium">Título da Norma</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
                type="text"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div>
              <h1 className="font-medium">Órgão emissor</h1>
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
            <h1 className="font-medium">Escopo</h1>
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
              <h1 className="font-medium">Número da versão</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
                type="text"
                required
                value={versao_numero}
                onChange={(e) => setVersaoNumero(e.target.value)}
              />
            </div>

            <div>
              <h1 className="font-medium">Data de publicação</h1>
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
            <h1 className="font-medium">Descrição da versão</h1>
            <textarea
              value={descricao}
              required
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
            />
          </div>

          {/* ARQUIVO */}
          <div>
            <h1 className="font-medium">Arquivo .pdf</h1>

            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
              <label className="relative cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-lg font-bold text-center">
                {path_file ? path_file.name : "Escolher arquivo"}
                <input
                  className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
                  type="file"
                  accept="application/pdf"
                  required
                  onChange={(e) => setPathFile(e.target.files[0])}
                />
              </label>
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
