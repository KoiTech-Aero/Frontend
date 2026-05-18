import { useState } from "react";
import { useNavigate } from "react-router";

import type { cadastrarNormaForm } from "../types/cadastrarNormaForm";

import { areasTecnicas } from "../utils/areasTecnicasData";

import { cadastrarNorma, listarNormas } from "../services/normaService";

export function useCadastrarNorma() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<cadastrarNormaForm>({
    codigo: "",
    titulo: "",
    escopo: "",
    area_tecnica: "",
    orgao_emissor: "",
    versao_numero: "",
    descricao: "",
    tags: [],
    path_file: null,
  });

  const data_publicacao = new Date().toISOString().split("T")[0];

  function updateField<K extends keyof cadastrarNormaForm>(
    field: K,
    value: cadastrarNormaForm[K],
  ) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.path_file) {
      alert("Selecione um arquivo.");
      return;
    }

    if (!areasTecnicas.includes(formData.area_tecnica)) {
      alert("Selecione uma área válida.");
      return;
    }

    try {
      const normas = await listarNormas();

      const codigoExiste = normas.some(
        (norma: { codigo: string }) => norma.codigo === formData.codigo,
      );

      if (codigoExiste) {
        alert("Já existe uma norma com esse código!");
        return;
      }

      const body = new FormData();

      body.append("codigo", formData.codigo);
      body.append("titulo", formData.titulo);
      body.append("escopo", formData.escopo);
      body.append("area_tecnica", formData.area_tecnica);
      body.append("orgao_emissor", formData.orgao_emissor);

      body.append("versao_numero", formData.versao_numero);

      body.append("descricao", formData.descricao);

      body.append("data_publicacao", data_publicacao);

      body.append("status", "true");

      body.append("file", formData.path_file);

      await cadastrarNorma(body);

      alert("Norma cadastrada com sucesso!");

      navigate("/pesquisarNorma");
    } catch (error) {
      console.error(error);

      alert("Erro ao cadastrar norma.");
    }
  }

  return {
    formData,
    updateField,
    data_publicacao,
    handleSubmit,
    navigate,
  };
}
