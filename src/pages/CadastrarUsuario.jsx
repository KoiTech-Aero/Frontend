import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastrarUsuario() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [role, setRole] = useState("Engenheiro");
  const [status, setStatus] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const usuariosResponse = await fetch("http://localhost:3000/usuarios");
      const usuarios = await usuariosResponse.json();

      const emailJaExiste = usuarios.some((user) => user.email === email);

      if (emailJaExiste) {
        alert("Já existe um usuário cadastrado com esse email.");
        return;
      }

      if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
      } else if (senha.length < 6) {
        alert("A senha deve possuir no mínimo 6 caracteres");
        return;
      }

      const response = await fetch(`http://localhost:3000/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, role, status }),
      });

      const data = await response.json();
	  console.log(data);

      alert("Usuário criado com sucesso!");
      navigate("/visualizarUsuarios");
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
            Cadastrar usuário
          </h1>
          <h2 className="text-md text-gray-500">
            Adicione os dados do usuário.
          </h2>
        </div>

        <hr className="border-2 border-gray-200" />

        {/* FORM */}
        <div className="m-5 md:m-10 flex flex-col gap-5">
          {/* NOME */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

          {/* EMAIL + SENHA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="w-full">
              <h1 className="text-gray-900 font-medium mb-1">Senha</h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-blue-50 text-gray-900"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div className="w-full">
              <h1 className="text-gray-900 font-medium mb-1">
                Confirmar Senha
              </h1>
              <input
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-blue-50 text-gray-900"
                type="password"
                required
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="w-full">
              <h1 className="text-gray-900 font-medium mb-1">Função</h1>
              <select
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-blue-50 text-gray-900"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Engenheiro">Engenheiro</option>
                <option value="Gestor">Gestor</option>
                <option value="Visualizador">Visualizador</option>
              </select>
            </div>

            <div className="w-full">
              <h1 className="text-gray-900 font-medium mb-1">Status</h1>
              <select
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-blue-50 text-gray-900"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="true">Ativado</option>
                <option value="false">Desativado</option>
              </select>
            </div>
          </div>

          {/* FUNÇÃO */}
          <div className="w-full md:w-1/2"></div>

          {/* BOTÕES */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full">
            <button
              type="submit"
              className="w-full md:w-[75%] bg-blue-600 text-white font-bold rounded-md cursor-pointer p-2"
            >
              Cadastrar Usuário
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
