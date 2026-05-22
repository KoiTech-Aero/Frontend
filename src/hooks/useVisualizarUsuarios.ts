import { useContext, useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import { listarUsuarios } from "../services/usuarioService";

import type { listarUsuario } from "../types/listarUsuarios";

export function useVisualizarUsuarios() {
  const navigate = useNavigate();

  const { usuario: usuarioLogado } = useContext(AuthContext);

  const [usuarios, setUsuarios] = useState<listarUsuario[]>([]);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    try {
      const data = await listarUsuarios();

      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  }

  const listaFiltrada = useMemo(() => {
    return usuarios.filter((usuario) => usuario.id !== usuarioLogado?.id);
  }, [usuarios, usuarioLogado]);

  return {
    navigate,

    listaFiltrada,
  };
}
