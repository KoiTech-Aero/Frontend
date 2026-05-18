import { useState } from "react";
import { useNavigate } from "react-router";

import { cadastrarUsuario, listarUsuarios } from "../services/usuarioService";
import { cadastrarUsuarioForm } from "../types/cadastrarUsuarioForm";

export function useCadastrarUsuario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<cadastrarUsuarioForm>({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    role: "Visualizador",
    status: "Ativo",
  });

  function updateField<K extends keyof cadastrarUsuarioForm>(
    field: K,
    value: cadastrarUsuarioForm[K],
  ) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const usuarios = await listarUsuarios();

      const emailExiste = usuarios.some(
        (user: { email: string }) => user.email === formData.email,
      );

      if (emailExiste) {
        throw new Error("Já existe um usuário cadastrado com esse e-mail.");
      }

      if (formData.senha !== formData.confirmarSenha) {
        throw new Error("As senhas não coincidem!");
      }

      if (formData.senha.length < 6) {
        throw new Error("A senha deve possuir no mínimo 6 caracteres");
      }

      await cadastrarUsuario(formData);

      alert("Usuário criado com sucesso!");

      navigate("/visualizarUsuarios");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
        return;
      }

      alert("Erro ao criar usuário.");
    }
  }

  return {
    formData,
    updateField,
    handleSubmit,
    navigate,
  };
}
