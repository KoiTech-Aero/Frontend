import { FileText, History, Link as LinkIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";

export default function VisualizarNorma() {
  const navigate = useNavigate();
  const location = useLocation();

  const norma = location.state?.norma;
  const [referencias, setReferencias] = useState([]);

  // auto-scroll ao atualizar o componente
  const containerRef = useRef(null);
  useEffect(() => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [norma?.id]);

  // redirecionar para norma selecionada
  // na seção de normas referênciadas
  async function redirectNormaReferencia(idNorma) {
    try {
      const response = await fetch("http://localhost:3000/normas");

      if (!response.ok) throw new Error("Erro ao buscar normas");

      const data = await response.json();
      const normaEncontrada = data.find((d) => d.id === idNorma);

      if (!normaEncontrada) {
        console.error("Norma não encontrada");
        return;
      }

      navigate("/visualizarNorma", {
        state: { norma: normaEncontrada },
      });
    } catch (err) {
      console.error(err);
    }
  }

  // busca todas as normas referênciadas
  useEffect(() => {
    if (!norma?.id) return;

    async function loadReferencias() {
      try {
        const response = await fetch(
          `http://localhost:3000/normas/${norma.id}/referencias`,
        );

        if (!response.ok) throw new Error("Erro ao buscar referências");

        const data = await response.json();

        setReferencias(
          data.map((d) => ({
            id: d.id,
            codigo: d.codigo,
            titulo: d.titulo,
          })),
        );
      } catch (err) {
        console.error(err);
      }
    }

    loadReferencias();
  }, [norma?.id]);

  // associar normas cadastrada
  const [mostrarRelacoes, setMostrarRelacoes] = useState(false);
  const [todasNormas, setTodasNormas] = useState([]);

  async function loadTodasNormas() {
    try {
      const response = await fetch("http://localhost:3000/normas/true");

      if (!response.ok) throw new Error("Erro ao buscar normas");

      const data = await response.json();

      const referenciasIds = referencias.map((ref) => ref.id);
      const filtradas = data.filter(
        (n) => n.id !== norma.id && !referenciasIds.includes(n.id),
      );

      setTodasNormas(filtradas);
    } catch (err) {
      console.error(err);
    }
  }

  async function adicionarRelacao(idRelacionada) {
    const confirmar = window.confirm("Deseja associar esta norma?");

    if (!confirmar) return;

    try {
      await fetch(`http://localhost:3000/normas/${norma.id}/associar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          relacionadaId: idRelacionada,
        }),
      });

      // atualizar lista na tela
      console.log(idRelacionada);
      setMostrarRelacoes(false);

      // recarregar referências
      const response = await fetch(
        `http://localhost:3000/normas/${norma.id}/referencias`,
      );
      const data = await response.json();

      setReferencias(data);
    } catch (err) {
      console.error(err);
    }
  }

  // tratamento caso haja inconsistência nos dados
  // da norma selecionada na tela de pesquisa
  if (!norma) return <p>Nenhuma norma recebida</p>;

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto w-full max-w-5xl mx-auto flex flex-col rounded-2xl bg-white"
    >
      {/* Header */}
      <div className="m-5 flex flex-col gap-1">
        <h5 className="text-sm w-fit px-2 rounded-sm bg-blue-200 border border-blue-400 text-blue-500">
          {norma.codigo}
        </h5>
        <h1 className="text-2xl md:text-3xl font-bold">{norma.titulo}</h1>
      </div>

      <hr className="border-2 border-gray-300" />

      {/* Escopo */}
      <div className="m-5">
        <div className="flex items-center gap-2">
          <FileText />
          <h3 className="text-lg md:text-xl font-bold">Escopo</h3>
        </div>

        <p className="border-4 rounded-md p-3 md:p-4 mt-4 border-gray-300 bg-gray-100 font-medium">
          {norma.escopo}
        </p>
      </div>

      <hr className="border-2 border-gray-300" />

      {/* Versões */}
      <div className="m-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <div className="flex items-center gap-2">
            <History />
            <h3 className="text-lg md:text-xl font-bold">Versões</h3>
          </div>

          <button
            className="bg-blue-600 text-white font-bold rounded-md px-3 py-1 hover:bg-blue-700"
            onClick={() => navigate("/cadastrarVersao", { state: { norma } })}
          >
            Adicionar Versão
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {norma.versoes
            ?.slice()
            .reverse()
            .map((versao) => (
              <div
                key={versao.id}
                className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 p-3 border-4 rounded-md border-gray-300 bg-gray-100"
              >
                <div>
                  <h4 className="text-base md:text-lg font-bold">
                    {versao.versao_numero}
                  </h4>
                  <p className="text-gray-600 font-light">{versao.descricao}</p>
                  <p className="text-gray-600 font-light">
                    {new Date(versao.data_publicacao).toLocaleDateString(
                      "pt-BR",
                    )}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                  <p
                    className={`text-white rounded-2xl px-4 py-1 text-sm font-bold ${
                      versao.status ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {versao.status ? "Revisada" : "Obsoleta"}
                  </p>

                  <button
                    onClick={() =>
                      navigate("/visualizarVersao", {
                        state: { norma, versao },
                      })
                    }
                    className="font-bold text-gray-500 hover:text-blue-500 text-center w-full md:w-auto md:text-left"
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
          <h3 className="text-lg md:text-xl font-bold">Normas Relacionadas</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 pt-5 gap-4 md:gap-5 mx-0 md:mx-5">
          {referencias.map((ref) => (
            <div
              key={ref.id}
              className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 border-4 rounded-md border-gray-300 bg-gray-100 p-3 hover:bg-gray-200"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h5 className="text-sm px-2 rounded-sm bg-blue-200 border border-blue-400 text-blue-500">
                  {ref.codigo}
                </h5>
                <h1 className="font-medium">{ref.titulo}</h1>
              </div>

              <button
                onClick={() => redirectNormaReferencia(ref.id)}
                className="bg-blue-600 text-white font-bold rounded-md px-2 py-1 hover:bg-blue-700 w-full md:w-auto"
              >
                Ir para norma
              </button>
            </div>
          ))}

          <div
            onClick={() => {
              setMostrarRelacoes(true);
              loadTodasNormas();
            }}
            className="flex flex-col gap-2 border-4 rounded-md border-gray-300 bg-gray-100 p-6 border-dotted justify-center items-center hover:bg-gray-200"
          >
            <h1 className="font-medium text-center">Adicionar Relação</h1>
          </div>
        </div>

        {/* MODAL */}
        {mostrarRelacoes && (
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center px-4">
            <div className="bg-white p-5 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
              <h2 className="text-lg font-bold mb-3">Selecionar Norma</h2>

              {todasNormas.map((n) => (
                <div
                  key={n.id}
                  className="border p-2 mb-2 rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => adicionarRelacao(n.id)}
                >
                  <span className="bg-blue-200 px-2 mr-2 rounded">
                    {n.codigo}
                  </span>
                  {n.titulo}
                </div>
              ))}

              <div className="w-full flex justify-end">
                <button
                  onClick={() => setMostrarRelacoes(false)}
                  className="mt-3 bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
