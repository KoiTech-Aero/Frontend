import { useContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { temPermissao } from "../utils/temPermissao";
import Modal from "../components/AcessoNegado";

export default function RotaPrivada({ children, permissao }) {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const semPermissao =
    usuario && permissao && !temPermissao(usuario, permissao);

  function handleClose() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/pesquisarNorma");
    }
  }

  // não logado
  if (!usuario) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <>
      {/* bloqueia render da página */}
      {!semPermissao && children}

      {/* modal direto */}
      <Modal
        open={!!semPermissao}
        onClose={handleClose}
        message="Você não tem permissão para acessar esta página."
      />
    </>
  );
}
