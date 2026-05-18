import { createContext } from "react";

import { Usuario } from "../types/usuarioLogado";
import { AuthContextType } from "../types/authContext";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);
