import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "../context/AuthContext";
import { cadastrarNota } from "../services/normaService";

interface CadastrarNotaForm {
  text: string;
  id_norma: string;
  versao_numero: string;
}

export function useCadastrarNota() {
  const navigate = useNavigate();
  const { usuario: usuarioLogado } = useContext(AuthContext);

  const [formData, setFormData] = useState<CadastrarNotaForm>({
    text: "",
    id_norma: "",
    versao_numero: "",
  });

  function updateField<K extends keyof CadastrarNotaForm>(
    field: K,
    value: CadastrarNotaForm[K]
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.text || !formData.id_norma) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await cadastrarNota({
        ...formData,
        id_usuario: usuarioLogado?.id ?? "",
      });

      alert("Nota cadastrada com sucesso!");
      navigate("/visualizarNotas");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar nota.");
    }
  }

  return {
    formData,
    updateField,
    handleSubmit,
    navigate,
    usuarioLogado,
  };
}