import { Funnel } from "lucide-react";

export default function FiltroArea() {
  return (
    <div className="bg-amber-50 w-full p-5 gap-5 flex flex-col rounded-2xl">
      <div className="flex gap-2">
        <Funnel />
        <h1>FILTRAR POR ÁREA</h1>
      </div>
      <div className="flex">
        <button className="bg-gray-300 px-4 mx-1 rounded-4xl">Área</button>
      </div>
    </div>
  );
}