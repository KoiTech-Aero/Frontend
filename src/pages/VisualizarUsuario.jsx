import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VisualizarUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  return (
    <div className="overflow-y-auto w-[90%] flex flex-col rounded-2xl bg-amber-50">
      <div className="m-5 flex flex-col">
        <h1 className="text-3xl font-bold">Usuários</h1>
        <h2 className="text-md">Gerencie os usuários do sistema.</h2>
      </div>

      <hr className="border-2 border-gray-300" />

      <div className="m-10 flex flex-col gap-4">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="flex justify-between items-center p-4 border-4 rounded-md border-gray-300 bg-gray-100"
          >
            <div>
              <p className="font-bold">{usuario.nome}</p>
              <p className="text-sm text-gray-600">{usuario.email}</p>
              <p className="text-sm text-blue-600">{usuario.role}</p>

              <p
                className={`text-sm font-bold ${
                  usuario.status ? "text-green-600" : "text-red-600"
                }`}
              >
                {usuario.status ? "Ativo" : "Inativo"}
              </p>
            </div>

            <p className="text-xs text-gray-400">
                Criado em:{" "}
                {usuario.data_cadastro
                ? new Date(usuario.data_cadastro).toLocaleDateString()
                : "Sem Data"}
            </p>

            <button
              onClick={() => navigate(`/editarUsuario/${usuario.id}`)}
              className="bg-blue-600 text-white font-bold rounded-md px-4 py-2 cursor-pointer"
            >
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}