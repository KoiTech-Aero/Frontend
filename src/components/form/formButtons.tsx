import type { formButtonsProps } from "../../types/formButtons";

export default function FormButtons({ onCancel }: formButtonsProps) {
  return (
    <div className="w-full flex justify-start gap-3 pt-2">
      <button
        type="submit"
        className="
          px-8 py-1
          rounded-lg
          bg-red
          text-white
          font-semibold
          hover:bg-red-hover
          transition
          cursor-pointer
        "
      >
        Salvar Norma
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="
          px-5 py-1
          rounded-lg
          border-2 border-gray-300
          bg-gray-100
          hover:bg-gray-200
          transition
          cursor-pointer
        "
      >
        Cancelar
      </button>
    </div>
  );
}
