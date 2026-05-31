import InputField from "../components/form/inputField";
import TextAreaField from "../components/form/textAreaField";
import FormButtons from "../components/form/formButtons";
import FormSection from "../components/form/formSection";

import { useCadastrarSolicitacao } from "../hooks/useCadastrarSolicitacao";

export default function SolicitarNorma() {
  const { formData, updateField, handleSubmit, navigate, usuarioLogado } =
    useCadastrarSolicitacao();

  return (
    <form onSubmit={handleSubmit} className="w-full h-full">
      <div className="w-full px-4 lg:px-8">
        <div className="w-full rounded-2xl p-6 flex flex-col gap-4">
          {/* FORM */}
          <FormSection>
            <InputField
              label="Título da Norma"
              value={formData.titulo}
              required
              onChange={(e) => updateField("titulo", e.target.value)}
            />

            <InputField
              label="Código da norma"
              value={formData.codigo_norma}
              required
              onChange={(e) => updateField("codigo_norma", e.target.value)}
            />

            <InputField
              label="Número da versão"
              value={formData.versao_norma}
              required
              onChange={(e) => updateField("versao_norma", e.target.value)}
            />

            <InputField
              label="Órgão emissor"
              value={formData.orgao_emissor}
              required
              onChange={(e) => updateField("orgao_emissor", e.target.value)}
            />
          </FormSection>

          <TextAreaField
            label="Motivo da solicitação"
            value={formData.motivo}
            required
            onChange={(e) => updateField("motivo", e.target.value)}
          />

          <InputField
            label="*Autor da solicitação"
            value={usuarioLogado?.nome || ""}
            disabled
            required
          />

          <p className="text-xs text-gray-500">
            *Você não pode alterar este campo.
          </p>

          <div className="mt-5">
            <FormButtons onCancel={() => navigate("/pesquisarNorma")} />
          </div>
        </div>
      </div>
    </form>
  );
}
