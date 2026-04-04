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
      const response = await fetch("http://localhost:3000/normas");

      if (!response.ok) throw new Error("Erro ao buscar normas");

      const data = await response.json();

      // remove a própria norma da lista
      const filtradas = data.filter((n) => n.id !== norma.id);

      setTodasNormas(filtradas);
    } catch (err) {
      console.error(err);
    }
  }

  async function adicionarRelacao(idRelacionada) {
    const confirmar = window.confirm("Deseja associar esta norma?");

    if (!confirmar) return;
    
    try {
      await fetch(
        `http://localhost:3000/normas/${norma.id}/associar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            relacionadaId: idRelacionada,
          }),
        }
      );

      // atualizar lista na tela
      console.log(idRelacionada)
      setMostrarRelacoes(false);

      // recarregar referências
      const response = await fetch(
        `http://localhost:3000/normas/${norma.id}/referencias`
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
      className="overflow-y-auto w-[90%] flex flex-col rounded-2xl bg-amber-50"
    >
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
            onClick={() => navigate("/cadastrarVersao", { state: { norma } })}
          >
            Adicionar Versão
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-4 cursor-default">
          {norma.versoes
            ?.slice()
            .reverse()
            .map((versao) => (
              <div
                key={versao.id}
                className="flex justify-between items-center p-3 border-4 rounded-md border-gray-300 bg-gray-100"
              >
                <div>
                  <h4 className="text-lg font-bold">{versao.versao_numero}</h4>
                  <p className="text-gray-600 font-light">{versao.descricao}</p>
                  <p className="text-gray-600 font-light">
                    {new Date(versao.data_publicacao).toLocaleDateString(
                      "pt-BR",
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="bg-green-500 text-white rounded-2xl px-4 py-1 text-sm">
                    {versao.status ? "revisada" : "obsoleta"}
                  </p>

                  <button
                    onClick={() =>
                      navigate("/visualizarVersao", {
                        state: { norma, versao },
                      })
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
          {referencias.map((ref) => (
            <div
              key={ref.id}
              className="flex justify-between border-4 rounded-md border-gray-300 bg-gray-100 p-2 transition duration-1000 ease-in-out hover:bg-gray-200"
            >
              <div className="flex align-center">
                <h5 className="text-sm px-2 rounded-sm bg-blue-200 border border-blue-400 text-blue-500">
                  {ref.codigo}
                </h5>
                <h1 className="font-medium mx-5">{ref.titulo}</h1>
              </div>
              <button
                onClick={() => redirectNormaReferencia(ref.id)}
                className="bg-blue-600 text-white font-bold rounded-md cursor-pointer px-2 py-0.5 transition duration-1000 ease-in-out hover:bg-blue-700"
              >
                ir para norma
              </button>
            </div>
          ))}

          <div
            onClick={() => {
              setMostrarRelacoes(true);
              loadTodasNormas();
            }}
            className="flex gap-2 border-4 rounded-md border-gray-300 bg-gray-100 p-2 border-dotted justify-center transition duration-1000 ease-in-out hover:bg-gray-200"
          >
            <h1 className="font-medium ">Adicionar Relação</h1>
          </div>
        </div>

        {/* MODAL */}
        {mostrarRelacoes && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg w-[400px] max-h-[500px] overflow-y-auto">
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

              <button
                onClick={() => setMostrarRelacoes(false)}
                className="mt-3 bg-gray-400 text-white px-3 py-1 rounded"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}