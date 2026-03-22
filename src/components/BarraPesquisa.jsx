import { Search } from "lucide-react";

export default function BarraPesquisa() {
  return (
    <div className="bg-amber-50 w-4xl p-5 flex rounded-4xl gap-2 text-xl">
      <Search />
      <input
        type="text"
        name=""
        id=""
        placeholder="Busca por código ou título..."
      />
    </div>
  );
}