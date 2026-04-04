import FiltroArea from "../components/FiltroArea";
import BarraPesquisa from "../components/BarraPesquisa";
import NormaPreview from "../components/NormaPreview";
import { useEffect, useState } from "react";

export default function PesquisarNorma() {
  const [normas, setNormas] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/normas/true`)
      .then((response) => response.json())
      .then((data) =>
        setNormas(
          data.map((d) => ({
            id: d.id,
            codigo: d.codigo,
            titulo: d.titulo,
            escopo: d.escopo,
            area_tecnica: d.area_tecnica,
            orgao_emissor: d.orgao_emissor,
            versoes: d.versoes.map((v) => ({
              versao_numero: v.versao_numero,
              data_publicacao: v.data_publicacao,
              descricao: v.descricao,
              path_file: v.path_file,
              status: v.status,
            })),
          })),
        ),
      );
  }, []);

  const normasFiltradas = normas.filter(
    (norma) =>
      norma.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      norma.codigo.toLowerCase().includes(busca.toLowerCase()) ||
      norma.area_tecnica.toLowerCase().includes(busca.toLowerCase()) ||
      norma.orgao_emissor.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className="overflow-y-auto w-[90%] flex flex-col items-center gap-5 px-2">
      <FiltroArea />
      <BarraPesquisa setBusca={setBusca} />

      <div className="grid grid-cols-3 gap-5 mt-10 w-[90%]">
        {normasFiltradas.map((norma) => {
          const versaoAtiva = norma.versoes.find((v) => v.status);
          return (
            <NormaPreview
              itens={normasFiltradas}
              key={norma.id}
              objeto={norma}
              codigo={norma.codigo}
              titulo={norma.titulo}
              area_tecnica={norma.area_tecnica}
              dataPublicacao={new Date(
                versaoAtiva?.data_publicacao,
              ).toLocaleDateString()}
              status={versaoAtiva?.status ? "revisada" : "obsoleta"}
            />
          );
        })}
      </div>
    </div>
  );
}
