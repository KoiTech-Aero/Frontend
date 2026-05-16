import { useState } from "react";

import type { areaTecnicaSelectProps } from "../../types/areaTecnicaSelect";

export default function AreaTecnicaSelect({
  value,
  onChange,
  areasTecnicas,
}: areaTecnicaSelectProps) {
  const [buscaArea, setBuscaArea] = useState(value);
  const [mostrarDropdown, setMostrarDropdown] =
    useState(false);

  const areasFiltradas = areasTecnicas.filter((area) =>
    area
      .toLowerCase()
      .includes(buscaArea.toLowerCase()),
  );

  return (
    <div className="relative flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        Área Técnica
      </label>

      <input
        type="text"
        required
        value={buscaArea}
        placeholder="Pesquisar área..."
        onFocus={() => setMostrarDropdown(true)}
        onBlur={() => {
          setTimeout(() => {
            setMostrarDropdown(false);
          }, 150);
        }}
        onChange={(e) => {
          setBuscaArea(e.target.value);
          onChange("");
          setMostrarDropdown(true);
        }}
        className="
          w-full
          rounded-lg
          border border-gray-300
          bg-white
          px-3 py-2
          text-sm
          outline-none
          transition
          focus:border-gray-500
          focus:ring-2 focus:ring-gray-100
        "
      />

      {mostrarDropdown && (
        <div
          className="
            absolute
            top-full
            z-10
            mt-1
            w-full
            max-h-60
            overflow-y-auto
            rounded-lg
            border border-gray-300
            bg-white
            shadow-lg
          "
        >
          {areasFiltradas.length > 0 ? (
            areasFiltradas.map((area) => (
              <div
                key={area}
                onClick={() => {
                  onChange(area);
                  setBuscaArea(area);
                  setMostrarDropdown(false);
                }}
                className="
                  cursor-pointer
                  px-3 py-2
                  text-sm
                  transition
                  hover:bg-gray-100
                "
              >
                {area}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">
              Nenhuma área encontrada
            </div>
          )}
        </div>
      )}
    </div>
  );
}