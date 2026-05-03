import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const usuarioStorage = localStorage.getItem("usuario");
    return usuarioStorage ? JSON.parse(usuarioStorage) : null;
  });

  function login(user) {
    setUsuario(user);
    localStorage.setItem("usuario", JSON.stringify(user));
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem("usuario");
  }

  function updateUsuario(dadosAtualizados) {
    setUsuario((prev) => {
      const atualizado = { ...prev, ...dadosAtualizados };
      localStorage.setItem("usuario", JSON.stringify(atualizado));
      return atualizado;
    });
  }

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, updateUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
