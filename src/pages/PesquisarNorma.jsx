import Header from "../components/Header";
import Menu from "../components/Menu";
import FiltroArea from "../components/FiltroArea";
import BarraPesquisa from "../components/BarraPesquisa";
import NormaPreview from "../components/NormaPreview";

function PesquisarNorma() {
  return (
    <div className="flex h-screen bg-gray-200">
      <Menu />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-50 py-30 flex flex-col items-center gap-5">
            <FiltroArea />
            <BarraPesquisa />
            <NormaPreview />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PesquisarNorma;
