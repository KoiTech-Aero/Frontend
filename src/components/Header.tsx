import { useLocation } from "react-router";

export default function Header() {
  const location = useLocation();

  const titulos: Record<string, string> = {
    "/cadastrarNorma": "Cadastro de Norma",
  };

  const subtitulos: Record<string, string> = {
    "/cadastrarNorma":
      "Informe os campos para cadastrar uma nova norma",
  };

  const tituloAtual =
    titulos[location.pathname] ||
    "Central de Normas";

  const subtituloAtual =
    subtitulos[location.pathname] ||
    "Controle de conformidade e regulamentos técnicos";

  return (
    <header
      className="
        w-full
        px-6 py-5
        shadow-[0_2px_8px_rgba(0,0,0,0.04)]
      "
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-gray-800">
          {tituloAtual}
        </h1>

        <p className="text-sm text-gray-500">
          {subtituloAtual}
        </p>
      </div>
    </header>
  );
}