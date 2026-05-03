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
      const confirmar = window.confirm(
        "Tem certeza que deseja desativar este usuário?",
      );
      if (!confirmar) return;
    } else {
      const confirmar = window.confirm(
        "Tem certeza que deseja ativar este usuário?",
      );
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
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className="overflow-y-auto w-full max-w-3xl flex flex-col rounded-2xl bg-white">
        {/* HEADER */}
        <div className="m-5 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Editar usuário
          </h1>
          <h2 className="text-md text-gray-500">
            Atualize os dados do usuário.
          </h2>
        </div>

        <hr className="border-2 border-gray-200" />

        {/* FORM */}
        <div className="m-5 md:m-10 flex flex-col gap-5">
          {/* NOME + EMAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h1 className="font-medium">Nome</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-blue-50 text-gray-900"
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div>
              <h1 className="font-medium">Email</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-blue-50 text-gray-900"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* FUNÇÃO + STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h1 className="font-medium">Função</h1>
              <select
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-blue-50 text-gray-900"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Engenheiro">Engenheiro</option>
                <option value="Gestor">Gestor</option>
              </select>
            </div>

            <div>
              <h1 className="font-medium">Status</h1>
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

          {/* BOTÕES 75 / 25 */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full">
            <button
              type="submit"
              className="w-full md:w-[75%] bg-blue-600 text-white font-bold rounded-md p-2 cursor-pointer"
            >
              Salvar alterações
            </button>

            <button
              type="button"
              onClick={() => navigate("/listarUsuarios")}
              className="w-full md:w-[25%] border-4 rounded-md p-1 border-gray-300 bg-white text-gray-900 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
