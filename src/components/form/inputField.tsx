import type { inputFieldProps } from "../../types/inputField";

export default function InputField({
  label,
  type = "text",
  value,
  required = false,
  disabled = false,
  onChange,
}: inputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        type={type}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
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
          disabled:bg-gray-100
          disabled:text-gray-500
        "
      />
    </div>
  );
}
