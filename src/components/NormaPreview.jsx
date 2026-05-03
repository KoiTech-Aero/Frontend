import { Link } from "react-router";

export default function NormaPreview(props) {
  return (
    <div className="flex flex-col justify-between bg-amber-50 rounded-2xl p-4 md:p-5 w-full">
      
      {/* HEADER */}
      <div className="flex flex-col">
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-xs md:text-sm w-fit px-2 rounded-sm bg-blue-200 border border-blue-400 text-blue-500 shrink-0">
            {props.codigo}
          </h2>

          <p className="text-green-500 font-bold text-xs md:text-sm text-right wrap-break-word">
            {props.status}
          </p>
        </div>

        <h1 className="text-base md:text-2xl font-bold mt-2 wrap-break-word leading-snug">
          {props.titulo}
        </h1>
      </div>

      {/* FOOTER */}
      <div>
        <div className="flex flex-col gap-1 mt-3">
          <p className="text-gray-600 text-sm md:text-base wrap-break-word">
            {props.area_tecnica}
          </p>

          <p className="text-gray-400 text-xs md:text-sm">
            Última atualização: {props.dataPublicacao}
          </p>
        </div>

        <Link to="/visualizarNorma" state={{ norma: props.objeto }}>
          <button className="w-full bg-gray-200 mt-4 md:mt-5 px-3 md:px-4 py-2 md:py-3 rounded-md text-gray-700 font-light text-sm md:text-lg cursor-pointer transition duration-300 hover:bg-gray-300 active:scale-[0.98]">
            Visualizar Norma
          </button>
        </Link>
      </div>
    </div>
  );
}