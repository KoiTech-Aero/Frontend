import { useState } from "react";
import { Search, FileText, X, CheckCircle } from "lucide-react";

import FormButtons from "../components/form/formButtons";
import FormSection from "../components/form/formSection";
import InputField from "../components/form/inputField";
import TextAreaField from "../components/form/textAreaField";
import { useCadastrarNota } from "../hooks/useCadastrarNota";
import { useNormas } from "../hooks/useNormas";

function NormaModal({
  aberto,
  onFechar,
  onSelecionar,
}: {
  aberto: boolean;
  onFechar: () => void;
  onSelecionar: (norma: { codigo: string; titulo: string, versao: string }) => void;
}) {
  const { normas, loading } = useNormas();
  const [busca, setBusca] = useState("");

  if (!aberto) return null;

  const normasFiltradas = normas
  .filter((n) => n.versoes?.some((v) => v.status === true))
  .filter(
    (n) =>
      n.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      n.codigo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onFechar}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-800">
            Selecionar Norma
          </h2>
          <button
            type="button"
            onClick={onFechar}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Busca */}
        <div className="px-5 py-3 border-b border-gray-100">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Buscar por código ou título..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 bg-white outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
            />
          </div>
        </div>

        {/* Lista */}
        <div className="overflow-y-auto flex-1 px-2 py-2">
          {loading && (
            <p className="text-sm text-gray-400 text-center py-6">
              Carregando normas...
            </p>
          )}

          {!loading && normasFiltradas.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">
              Nenhuma norma encontrada.
            </p>
          )}

          {!loading &&
            normasFiltradas.map((norma) => (
              <button
                key={norma.id}
                type="button"
                onClick={() => {
                  onSelecionar({ codigo: norma.codigo, titulo: norma.titulo, versao: norma.versoes.find((v) => v.status === true)?.versao_numero ?? "" });
                  onFechar();
                }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition flex items-start gap-3 group"
              >
                <div className="mt-0.5 text-gray-400 group-hover:text-red-500 transition flex-shrink-0">
                  <FileText size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {norma.titulo}
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5">
                    {norma.codigo}
                  </span>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default function SolicitarNorma() {
  const {
    formData,
    updateField,
    handleSubmit,
    navigate,
    usuarioLogado,
  } = useCadastrarNota();

  const [modalAberto, setModalAberto] = useState(false);
  const [tituloNormaSelecionada, setTituloNormaSelecionada] = useState("");

  const dataAtual = new Date().toLocaleDateString("pt-BR");

  return (
    <>
      <NormaModal
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        onSelecionar={(norma) => {
          updateField("id_norma", norma.codigo);
          updateField("versao_numero", norma.versao);
          setTituloNormaSelecionada(norma.titulo);
        }}
      />

      <form onSubmit={handleSubmit} className="w-full h-full">
        <div className="w-full px-4 lg:px-8">
          <div className="w-full rounded-2xl p-6">

            {/* Grid principal: esquerda (conteúdo) | direita (info) */}
            <div className="grid grid-cols-1 lg:grid-cols-[72%_28%] gap-6 min-h-[60vh]">

              {/* ── ESQUERDA ── */}
              <div className="lg:border-r lg:border-gray-300 lg:pr-6 flex flex-col gap-4">

                {/* Conteúdo da nota */}
                <TextAreaField
                  label="Conteúdo da Nota"
                  value={formData.text}
                  required
                  onChange={(e) => updateField("text", e.target.value)}
                />

                {/* Norma atribuída */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Norma Atribuída
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setModalAberto(true)}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-left text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100 hover:border-gray-400"
                  >
                    {formData.id_norma ? (
                      <span className="flex items-center gap-2 text-gray-800">
                        <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                        <span className="font-medium">{formData.id_norma}</span>
                        {tituloNormaSelecionada && (
                          <span className="text-gray-400 truncate">
                            — {tituloNormaSelecionada}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        Clique para selecionar uma norma aprovada...
                      </span>
                    )}
                  </button>
                  {!formData.id_norma && (
                    <span className="text-xs text-red-500">Campo obrigatório</span>
                  )}
                </div>

                {/* Data e Solicitante lado a lado */}
                <FormSection>
                  <InputField
                    label="Data da Solicitação"
                    value={dataAtual}
                    disabled
                    onChange={() => {}}
                  />

                  <InputField
                    label="Solicitante"
                    value={usuarioLogado?.nome ?? ""}
                    disabled
                    onChange={() => {}}
                  />
                </FormSection>
              </div>

              {/* ── DIREITA ── */}
              <div className="flex flex-col gap-5">
                {/* Card informativo */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Informações da solicitação
                  </h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Status</span>
                      <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                        Pendente
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Solicitante</span>
                      <span className="text-xs font-medium text-gray-700 truncate max-w-[60%] text-right">
                        {usuarioLogado?.nome ?? "—"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Data</span>
                      <span className="text-xs font-medium text-gray-700">
                        {dataAtual}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1" />
              </div>
            </div>

            {/* Botões */}
            <div className="mt-5">
              <FormButtons onCancel={() => navigate("/pesquisarNorma")} />
            </div>

          </div>
        </div>
      </form>
    </>
  );
}