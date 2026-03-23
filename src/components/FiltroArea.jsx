import { Funnel } from "lucide-react";

export default function FiltroArea() {
  return (
    <div className="bg-amber-50 w-[90%] p-5 gap-5 flex flex-col rounded-2xl">
      <div className="flex gap-2">
        <Funnel />
        <h1>FILTRAR POR ÁREA</h1>
      </div>
      <div className="flex">
        <button className="bg-gray-300 px-4 mx-1 rounded-4xl cursor-pointer transition duration-1000 ease-in-out hover:bg-gray-400">Área</button>
      </div>
    </div>
  );
}