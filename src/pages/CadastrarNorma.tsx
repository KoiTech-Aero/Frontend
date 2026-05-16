import AreaTecnicaSelect from "../components/form/areaTecnicaSelect";
import FileUpload from "../components/form/fileUpload";
import FormButtons from "../components/form/formButtons";
import FormSection from "../components/form/formSection";
import InputField from "../components/form/inputField";
import TextAreaField from "../components/form/textAreaField";
import TagsInput from "../components/form/tagsInput";

import { areasTecnicas } from "../utils/areasTecnicasData";

import { useCadastrarNorma } from "../hooks/useCadastrarNorma";

export default function CadastrarNorma() {
  const { formData, updateField, data_publicacao, handleSubmit, navigate } =
    useCadastrarNorma();

  return (
    <form onSubmit={handleSubmit} className="w-full h-full">
      <div className="w-full px-4 lg:px-8">
        <div className="w-full rounded-2xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[72%_28%] gap-6 min-h-[75vh]">
            {/* ESQUERDA */}
            <div className="lg:border-r lg:border-gray-300 lg:pr-6 flex flex-col gap-4">
              
              <FormSection>
                <InputField
                  label="Código da Norma"
                  value={formData.codigo}
                  required
                  onChange={(e) => updateField("codigo", e.target.value)}
                />

                <InputField
                  label="Título da Norma"
                  value={formData.titulo}
                  required
                  onChange={(e) => updateField("titulo", e.target.value)}
                />
              </FormSection>

              <TextAreaField
                label="Escopo"
                value={formData.escopo}
                required
                onChange={(e) => updateField("escopo", e.target.value)}
              />

              <FormSection>
                <InputField
                  label="Órgão Emissor"
                  value={formData.orgao_emissor}
                  required
                  onChange={(e) => updateField("orgao_emissor", e.target.value)}
                />

                <InputField
                  label="Data da Publicação"
                  value={data_publicacao}
                  disabled
                />
              </FormSection>

              <InputField
                label="Número da Versão"
                value={formData.versao_numero}
                required
                onChange={(e) => updateField("versao_numero", e.target.value)}
              />

              <TextAreaField
                label="Descrição da Versão"
                value={formData.descricao}
                required
                onChange={(e) => updateField("descricao", e.target.value)}
              />
            </div>

            {/* DIREITA */}
            <div className="flex flex-col gap-5 h-full">
              <AreaTecnicaSelect
                value={formData.area_tecnica}
                onChange={(value) => updateField("area_tecnica", value)}
                areasTecnicas={areasTecnicas}
              />

              <TagsInput
                tags={formData.tags}
                setTags={(value) =>
                  updateField(
                    "tags",
                    typeof value === "function" ? value(formData.tags) : value,
                  )
                }
              />

              <div className="flex-1" />

              <FileUpload
                file={formData.path_file}
                onChange={(file) => updateField("path_file", file)}
              />
            </div>
          </div>

          <div className="mt-5">
            <FormButtons onCancel={() => navigate("/pesquisarNorma")} />
          </div>
        </div>
      </div>
    </form>
  );
}
