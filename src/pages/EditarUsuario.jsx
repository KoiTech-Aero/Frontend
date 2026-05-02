import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Engenheiro");
  const [status, setStatus] = useState(true);
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/usuarios/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNome(data.nome);
        setEmail(data.email);
        setRole(data.role);
        setStatus(data.status);
      });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!status) {
      const confirmar = window.confirm("Tem certeza que deseja desativar este usuário?");
      if (!confirmar) return;
    } 
    else {
      const confirmar = window.confirm("Tem certeza que deseja ativar este usuário?");
      if (!confirmar) return;
    }

    try {
      const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, role, status }),
      });

      const data = await response.json();
      console.log(data);

      alert("Usuário atualizado com sucesso!");
      navigate("/listarUsuarios");
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-y-auto w-[90%] flex flex-col rounded-2xl bg-white">
        <div className="m-5 flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">Editar usuário</h1>
          <h2 className="text-md text-gray-500">Atualize os dados do usuário.</h2>
        </div>

        <hr className="border-2 border-gray-200" />

        <div className="m-10 flex flex-col gap-5">
          <div className="flex justify-between items-center gap-x-30">
            <div className="w-full">
              <h1 className="text-gray-900 font-medium mb-1">Nome</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-blue-50 text-gray-900"
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="w-full">
              <h1 className="text-gray-900 font-medium mb-1">Email</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-blue-50 text-gray-900"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-x-30">
            <div className="w-full">
              <h1 className="text-gray-900 font-medium mb-1">Função</h1>
              <select
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-blue-50 text-gray-900"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Engenheiro">Engenheiro</option>
                <option value="Gestor">Gestor</option>
              </select>
            </div>
            <div className="w-full">
              <h1 className="text-gray-900 font-medium mb-1">Status</h1>
              <select
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-blue-50 text-gray-900"
                value={status}
                onChange={(e) => setStatus(e.target.value === "true")}
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between gap-x-10">
            <button
              type="submit"
              className="w-125 bg-blue-600 text-white font-bold rounded-md cursor-pointer p-2"
            >
              Salvar alterações
            </button>
            <button
              onClick={() => navigate("/listarUsuarios")}
              className="w-50 border-4 rounded-md p-1 border-gray-300 bg-white text-gray-900 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}