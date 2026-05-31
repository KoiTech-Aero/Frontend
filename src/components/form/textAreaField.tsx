import type { textAreaFieldProps } from "../../types/textAreaField";

export default function TextAreaField({
  label,
  value,
  required = false,
  onChange,
}: textAreaFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        value={value}
        required={required}
        onChange={onChange}
        className="
          w-full
          min-h-35
          rounded-lg
          border border-gray-300
          bg-white
          px-3 py-2
          text-sm
          outline-none
          resize-none
          transition
          focus:border-gray-500
          focus:ring-2 focus:ring-gray-100
        "
      />
    </div>
  );
}