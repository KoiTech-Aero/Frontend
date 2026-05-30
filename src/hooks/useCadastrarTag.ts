import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTags } from "./useTags";
import type { Tag } from "../types/tags";

export function useCadastrarTag() {
  const navigate = useNavigate();
  const { tags, setTags } = useTags();
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");

  function capitalizarNome(valor: string): string {
    return valor
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (letra) => letra.toUpperCase());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    const nomeFormatado = capitalizarNome(nome);

    if (!nomeFormatado) {
      setErro("O nome da tag é obrigatório.");
      return;
    }

    const jaExiste = tags.some(
      (t) => t.nome.toLowerCase() === nomeFormatado.toLowerCase()
    );

    if (jaExiste) {
      setErro("Já existe uma tag com esse nome.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeFormatado, descricao: "" }),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar tag");

      const novaTag: Tag = await response.json();
      setTags((prev) => [...prev, novaTag]);
      setNome("");
    } catch (err) {
      console.error(err);
      setErro("Erro ao cadastrar a tag. Tente novamente.");
    }
  }

  async function removerTag(id: string) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/tags/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Erro ao remover tag");

      setTags((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return { nome, setNome, tags, handleSubmit, removerTag, navigate, erro };
}