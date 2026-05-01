import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

/* import { loginRequest } from "../services/api"; */

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    // com rota de login
    /* const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleLogin(e) {
      e.preventDefault();

      try {
        const data = await loginRequest(email, senha);

        login(data);
        navigate("/pesquisarNorma");
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    } */

    // sem rota de login
    try {
      const response = await fetch("http://localhost:3000/usuarios");
      const usuarios = await response.json();

      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.senha === senha,
      );

      if (!usuarioEncontrado) {
        alert("Email ou senha inválidos");
        return;
      }

      login(usuarioEncontrado);
      navigate("/pesquisarNorma");
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer login");
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex justify-center items-center w-full"
    >
      <div className="w-100 flex flex-col rounded-2xl bg-amber-50">
        {/* Header */}
        <div className="m-5 flex flex-col">
          <h1 className="text-3xl font-bold">Login</h1>
          <h2 className="text-md">
            Acesse o sistema informando suas credenciais.
          </h2>
        </div>

        <hr className="border-2 border-gray-300" />

        {/* Campos */}
        <div className="m-10 flex flex-col gap-5">
          <div>
            <h1>Email</h1>
            <input
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200"
              type="email"
              required
              placeholder="Informe seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <h1>Senha</h1>
            <input
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200"
              type="password"
              required
              placeholder="Informe sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {/* Botão */}
          <div className="flex flex-col gap-3 mt-5">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold rounded-md p-2 cursor-pointer transition duration-1000 ease-in-out hover:bg-blue-700"
            >
              Entrar no Sistema
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
