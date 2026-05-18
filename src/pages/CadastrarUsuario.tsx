import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/form/inputField";
import FormSection from "../components/form/formSection";
import FormButtons from "../components/form/formButtons";
import SelectField from "../components/form/selectField";
import { useCadastrarUsuario } from "../hooks/useCadastrarUsuario";

export default function CadastrarUsuario() {
  const { formData, updateField, handleSubmit, navigate } =
    useCadastrarUsuario();

  return (
    <form onSubmit={handleSubmit} className="w-full h-full">
      <div className="w-full px-4 lg:px-8">
        <div className="w-full rounded-2xl p-6 flex flex-col gap-4">
          {/* FORM */}
          <FormSection>
            <InputField
              label="Nome"
              value={formData.nome}
              required
              onChange={(e) => updateField("nome", e.target.value)}
            />

            <InputField
              label="E-mail"
              value={formData.email}
              required
              onChange={(e) => updateField("email", e.target.value)}
            />

            <InputField
              label="Senha"
              value={formData.senha}
              type="password"
              required
              onChange={(e) => updateField("senha", e.target.value)}
            />

            <InputField
              label="Confirmar Senha"
              value={formData.confirmarSenha}
              type="password"
              required
              onChange={(e) => updateField("confirmarSenha", e.target.value)}
            />

            <SelectField
              label="Função"
              value={formData.role}
              onChange={(e) => {
                return updateField("role", e.target.value);
              }}
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
              label="Status"
              value={formData.status}
              onChange={(e) => {
                return updateField("status", e.target.value);
              }}
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

          <div className="mt-5">
            <FormButtons onCancel={() => navigate("/pesquisarNorma")} />
          </div>
        </div>
      </div>
    </form>
  );
}
