import FiltroArea from "../components/FiltroArea";
import BarraPesquisa from "../components/BarraPesquisa";
import NormaPreview from "../components/NormaPreview";

export default function PesquisarNorma() {
  return (
    <div className="overflow-y-auto w-[90%] flex flex-col items-center gap-5 px-2">
      <FiltroArea />
      <BarraPesquisa />
      <NormaPreview />
    </div>
  );
}
