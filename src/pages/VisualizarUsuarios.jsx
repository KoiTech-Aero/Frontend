import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BarraPesquisa from "../components/BarraPesquisa";

export default function VisualizarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [ordenacao, setOrdenacao] = useState("nome-asc");
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();
  const { usuario: usuarioLogado } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:3000/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  function ordenarUsuarios(lista) {
    const copia = [...lista];

    switch (ordenacao) {
      case "nome-asc":
        return copia.sort((a, b) => a.nome.localeCompare(b.nome));
      case "nome-desc":
        return copia.sort((a, b) => b.nome.localeCompare(a.nome));
      case "data-desc":
        return copia.sort(
          (a, b) => new Date(b.data_cadastro) - new Date(a.data_cadastro),
        );
      case "data-asc":
        return copia.sort(
          (a, b) => new Date(a.data_cadastro) - new Date(b.data_cadastro),
        );
      default:
        return copia;
    }
  }

  const listaFiltrada = ordenarUsuarios(
    usuarios
      .filter((u) => u.id !== usuarioLogado?.id)
      .filter(
        (u) =>
          u.nome.toLowerCase().includes(busca.toLowerCase()) ||
          u.email.toLowerCase().includes(busca.toLowerCase()),
      ),
  );

  return (
    <div className="w-full flex justify-center">
      <div className="overflow-y-auto w-full max-w-3xl flex flex-col rounded-2xl bg-amber-50">
        {/* HEADER */}
        <div className="m-5 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold">
            Visualizar Usuários
          </h1>
          <h2 className="text-md text-gray-500">
            Gerencie os usuários do sistema.
          </h2>
        </div>

        <hr className="border-2 border-gray-300" />

        {/* FILTRO */}
        <div className="m-5 md:m-10">
          <div className="bg-white border-4 border-gray-300 rounded-xl p-4 flex flex-col gap-4">
            <p className="text-sm font-medium text-gray-700">Ordenar por:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* NOME ASC */}
              <button
                onClick={() => setOrdenacao("nome-asc")}
                className={`flex items-center justify-between border-2 rounded-md p-3 transition cursor-pointer ${
                  ordenacao === "nome-asc"
                    ? "bg-blue-100 border-blue-400"
                    : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <span className="font-medium text-gray-700">Nome (A → Z)</span>
                {ordenacao === "nome-asc" && (
                  <span className="text-blue-600 font-bold">✓</span>
                )}
              </button>

              {/* NOME DESC */}
              <button
                onClick={() => setOrdenacao("nome-desc")}
                className={`flex items-center justify-between border-2 rounded-md p-3 transition cursor-pointer ${
                  ordenacao === "nome-desc"
                    ? "bg-blue-100 border-blue-400"
                    : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <span className="font-medium text-gray-700">Nome (Z → A)</span>
                {ordenacao === "nome-desc" && (
                  <span className="text-blue-600 font-bold">✓</span>
                )}
              </button>

              {/* DATA DESC */}
              <button
                onClick={() => setOrdenacao("data-desc")}
                className={`flex items-center justify-between border-2 rounded-md p-3 transition cursor-pointer ${
                  ordenacao === "data-desc"
                    ? "bg-blue-100 border-blue-400"
                    : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <span className="font-medium text-gray-700">Mais recentes</span>
                {ordenacao === "data-desc" && (
                  <span className="text-blue-600 font-bold">✓</span>
                )}
              </button>

              {/* DATA ASC */}
              <button
                onClick={() => setOrdenacao("data-asc")}
                className={`flex items-center justify-between border-2 rounded-md p-3 transition cursor-pointer ${
                  ordenacao === "data-asc"
                    ? "bg-blue-100 border-blue-400"
                    : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <span className="font-medium text-gray-700">Mais antigos</span>
                {ordenacao === "data-asc" && (
                  <span className="text-blue-600 font-bold">✓</span>
                )}
              </button>
            </div>

            <div className="flex justify-center">
              <BarraPesquisa setBusca={setBusca} />
            </div>
          </div>
        </div>

        <hr className="border-2 border-gray-300" />

        {/* LISTA */}
        <div className="m-5 md:m-10 flex flex-col gap-4">
          {listaFiltrada.map((usuario) => (
            <div
              key={usuario.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-4 rounded-md border-gray-300 bg-gray-100"
            >
              {/* INFO */}
              <div className="flex flex-col">
                <p className="font-bold text-lg">{usuario.nome}</p>
                <p className="text-sm text-gray-600 break-all">
                  {usuario.email}
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-sm text-blue-600 font-medium">
                    {usuario.role}
                  </span>

                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      usuario.status
                        ? "text-green-600 bg-green-100"
                        : "text-red-600 bg-red-100"
                    }`}
                  >
                    {usuario.status ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>

              {/* DATA */}
              <div className="text-xs text-gray-400 md:text-sm md:text-right">
                Criado em:{" "}
                {usuario.data_cadastro
                  ? new Date(usuario.data_cadastro).toLocaleDateString()
                  : "Sem Data"}
              </div>

              {/* BOTÃO */}
              <div className="w-full md:w-auto">
                <button
                  onClick={() => navigate(`/editarUsuario/${usuario.id}`)}
                  className="w-full md:w-auto bg-blue-600 text-white font-bold rounded-md px-4 py-2 cursor-pointer"
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
