import { useState } from "react";

import type { SelectFieldProps } from "../../types/selectField";
import { ChevronDown } from "lucide-react";

export default function SelectField({
  label,
  icon = <ChevronDown />,
  value,
  options,
  onChange,
  required = false,
  disabled = false,
}: SelectFieldProps) {
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <button
          type="button"
          disabled={disabled}
          onClick={() => setMostrarDropdown(!mostrarDropdown)}
          onBlur={() => {
            setTimeout(() => {
              setMostrarDropdown(false);
            }, 150);
          }}
          className={`w-full rounded-lg border border-gray-300 bg-white py-2 text-left text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100 disabled:bg-gray-100 disabled:text-gray-500 ${icon ? "pl-10 pr-3" : "px-3"}`}
        >
          {selectedOption?.label || "Selecione uma opção"}
        </button>

        {mostrarDropdown && !disabled && (
          <div className="absolute top-full z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange({
                    target: {
                      value: option.value,
                    },
                  } as React.ChangeEvent<HTMLSelectElement>);

                  setMostrarDropdown(false);
                }}
                className={`cursor-pointer px-3 py-2 text-sm transition hover:bg-gray-100 ${value === option.value ? "bg-gray-100 font-medium" : ""}`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {required && !value && (
        <span className="text-xs text-red-500">Campo obrigatório</span>
      )}
    </div>
  );
}
