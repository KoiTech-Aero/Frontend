import InputField from "../components/form/inputField";
import FormButtons from "../components/form/formButtons";
import FormSection from "../components/form/formSection";
import SelectField from "../components/form/selectField";

import { useEditarUsuario } from "../hooks/useEditarUsuario";

export default function EditarUsuario() {
  const {
    originalUser,
    formData,
    updateField,
    handleSubmit,
    isSelfEdit,
    houveMudanca,
    loading,
    navigate,
  } = useEditarUsuario();

  if (loading || !originalUser) return null;

  return (
    <form onSubmit={handleSubmit} className="w-full h-full">
      <div className="w-full px-4 lg:px-8">
        <div className="w-full rounded-2xl p-6 flex flex-col gap-6">
          {/* NOME */}
          <FormSection>
            <InputField
              label="Nome atual"
              value={originalUser.nome}
              disabled
            />

            <InputField
              label="Novo nome"
              value={formData.nome}
              onChange={(e) => updateField("nome", e.target.value)}
            />
          </FormSection>

          {/* EMAIL */}
          <FormSection>
            <InputField
              label="E-mail atual"
              value={originalUser.email}
              disabled
            />

            <InputField
              label="Novo e-mail"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </FormSection>

          {/* SENHA */}
          <FormSection>
            <InputField
              label="Nova senha"
              type="password"
              value={formData.senha}
              onChange={(e) => updateField("senha", e.target.value)}
            />

            <InputField
              label="Confirmar senha"
              type="password"
              value={formData.confirmarSenha}
              onChange={(e) =>
                updateField("confirmarSenha", e.target.value)
              }
            />
          </FormSection>

          {/* ROLE + STATUS */}
          <FormSection>
            <SelectField
              disabled={isSelfEdit}
              label="Função"
              value={formData.role}
              onChange={(e) => updateField("role", e.target.value)}
              options={[
                {
                  label: "Visualizador",
                  value: "Visualizador",
                },
                {
                  label: "Engenheiro",
                  value: "Engenheiro",
                },
                {
                  label: "Gestor",
                  value: "Gestor",
                },
              ]}
            />

            <SelectField
              disabled={isSelfEdit}
              label="Status"
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              options={[
                {
                  label: "Ativo",
                  value: "true",
                },
                {
                  label: "Inativo",
                  value: "false",
                },
              ]}
            />
          </FormSection>

          {isSelfEdit && (
            <p className="text-xs text-gray-500">
              Você não pode alterar sua própria função ou status.
            </p>
          )}

          <div className="mt-5">
            <FormButtons
              submitDisabled={!houveMudanca}
              onCancel={() => navigate("/visualizarUsuarios")}
            />
          </div>
        </div>
      </div>
    </form>
  );
}