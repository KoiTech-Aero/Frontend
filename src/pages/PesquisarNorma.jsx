import FiltroArea from "../components/FiltroArea";
import BarraPesquisa from "../components/BarraPesquisa";
import NormaPreview from "../components/NormaPreview";
import { useEffect, useState } from "react";

export default function PesquisarNorma() {
  const [normas, setNormas] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/normas/true`)
      .then((response) => response.json())
      .then((data) =>
        setNormas(
          data.map((d) => ({
            id: d.id,
            codigo: d.codigo,
            titulo: d.titulo,
            area_tecnica: d.area_tecnica,
            orgao_emissor: d.orgao_emissor,
            versaos: d.versaos.map((v) => ({
              data_publicacao: v.data_publicacao,
              status: v.status,
            })),
          })),
        ),
      );
  }, []);

  return (
    <div className="overflow-y-auto w-[90%] flex flex-col items-center gap-5 px-2">
      <FiltroArea />
      <BarraPesquisa />

      <div className="grid grid-cols-3 gap-5 mt-10 w-[70%]">
        {normas.map((norma) => {
          const versaoAtiva = norma.versaos.find((v) => v.status);
          return (
            <NormaPreview
              key={norma.id}
              codigo={norma.codigo}
              titulo={norma.titulo}
              status={versaoAtiva?.status ? "norma ativa" : "norma inativa"}
              dataPublicacao={new Date (versaoAtiva?.data_publicacao).toLocaleDateString()}
            />
          );
        })}
      </div>
    </div>
  );
}
