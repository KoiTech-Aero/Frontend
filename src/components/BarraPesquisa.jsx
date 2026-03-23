import { Search } from "lucide-react";

export default function BarraPesquisa() {
  return (
    <div className="bg-amber-50 w-4xl p-5 flex rounded-4xl gap-2 text-xl items-center">
      <Search />
      <input
        type="text"
        name=""
        id=""
        placeholder="Busca por código ou título..."
        className="rounded-full w-full py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
      />
    </div>
  );
}
