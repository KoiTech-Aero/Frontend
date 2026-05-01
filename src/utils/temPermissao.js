import { ROLE_PERMISSIONS } from "../enums/rolePermissoes";

export function temPermissao(usuario, permissao) {
  if (!usuario) return false;

  const permissoes = ROLE_PERMISSIONS[usuario.role] || [];
  return permissoes.includes(permissao);
}