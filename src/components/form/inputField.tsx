import type { inputFieldProps } from "../../types/inputField";

export default function InputField({
  label,
  icon,
  type = "text",
  value,
  required = false,
  disabled = false,
  onChange,
}: inputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          required={required}
          disabled={disabled}
          onChange={onChange}
          className={`w-full rounded-lg border border-gray-300 bg-white py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100 disabled:bg-gray-100 disabled:text-gray-500 ${icon ? "pl-10 pr-3" : "px-3"}`}
        />
      </div>
    </div>
  );
}
