import { Tag, X } from "lucide-react";
import { useCadastrarTag } from "../hooks/useCadastrarTag";

export default function CadastrarTag() {
  const { nome, setNome, tags, handleSubmit, removerTag, navigate, erro } =
    useCadastrarTag();

  return (
    <form onSubmit={handleSubmit} className="w-full h-full">
      <div className="w-full px-4 lg:px-8">
        <div className="w-full rounded-2xl p-6">

          <div className="flex flex-col gap-6 min-h-[60vh]">

            {/* Campo de cadastro */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Nome da Tag
                <span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                value={nome}
                required
                placeholder="Ex: Segurança, Qualidade, ISO..."
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
              />
              {erro && (
                <span className="text-xs text-red-500 mt-0.5">{erro}</span>
              )}
            </div>

            {/* Lista de tags cadastradas */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700">
                Tags Cadastradas
              </label>

              {tags.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center">
                  <Tag size={32} className="text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400">
                    Nenhuma tag cadastrada ainda.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Adicione uma tag acima para começar.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm"
                    >
                      <Tag size={12} className="text-gray-400" />
                      <span>{tag.nome}</span>
                      <button
                        type="button"
                        onClick={() => removerTag(tag.id)}
                        className="ml-1 text-gray-400 hover:text-red-500 transition cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/pesquisarNorma")}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-900 rounded-lg hover:bg-red-800 transition"
            >
              Salvar Tag
            </button>
          </div>

        </div>
      </div>
    </form>
  );
}