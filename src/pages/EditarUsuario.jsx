import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function EditarUsuario() {
  const { id } = useParams();
  const { usuario, updateUsuario } = useContext(AuthContext);

  const [original, setOriginal] = useState(null);

  const [nome, setNome] = useState("");
  const [novoNome, setNovoNome] = useState("");

  const [email, setEmail] = useState("");
  const [novoEmail, setNovoEmail] = useState("");

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [role, setRole] = useState("Engenheiro");
  const [status, setStatus] = useState(true);

  const isSelfEdit = usuario?.id === id;

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/usuarios/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOriginal(data);
        setNome(data.nome);
        setEmail(data.email);
        setRole(data.role);
        setStatus(data.status);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!original) return null;

  // detectar mudanças
  const houveMudanca =
    novoNome.trim() !== "" ||
    novoEmail.trim() !== "" ||
    novaSenha.trim() !== "" ||
    role !== original.role ||
    status !== original.status;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!houveMudanca) {
      alert("Nenhuma alteração foi feita.");
      return;
    }

    if (status !== original.status) {
      const msg = status
        ? "Tem certeza que deseja ativar este usuário?"
        : "Tem certeza que deseja desativar este usuário?";

      if (!window.confirm(msg)) return;
    }

    try {
      const body = {};

      if (novaSenha.trim()) {
        if (novaSenha !== confirmarSenha) {
          alert("As senhas não coincidem");
          return;
        } else if (novaSenha.length < 6){
          alert("A senha deve possuir no mínimo 6 caracteres!");
          return;
        }

        body.senha = novaSenha;
      }

      if (novoNome.trim()) body.nome = novoNome;
      if (novoEmail.trim()) body.email = novoEmail;

      if (!isSelfEdit) {
        if (role !== original.role) body.role = role;
        if (status !== original.status) body.status = status;
      }

      console.log(body);

      const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      // atualiza contexto
      if (usuario.id === id) {
        updateUsuario(data);
      }

      // atualiza valores atuais
      setOriginal(data);
      setNome(data.nome);
      setEmail(data.email);
      setRole(data.role);
      setStatus(data.status);

      // limpa campos opcionais
      setNovoNome("");
      setNovoEmail("");
      setNovaSenha("");
      setConfirmarSenha("");

      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className="w-full max-w-3xl flex flex-col rounded-2xl bg-white">
        <div className="m-5">
          <h1 className="text-2xl md:text-3xl font-bold">Editar usuário</h1>
          <h2 className="text-md text-gray-500">
            Atualize os dados do usuário.
          </h2>
        </div>

        <hr className="border-2 border-gray-200" />

        <div className="m-5 md:m-10 flex flex-col gap-5">
          {/* NOME */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h1 className="font-medium">Nome atual</h1>
              <input
                disabled
                value={nome}
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
              />
            </div>

            <div>
              <h1 className="font-medium">Novo nome</h1>
              <input
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h1 className="font-medium">Email atual</h1>
              <input
                disabled
                value={email}
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
              />
            </div>

            <div>
              <h1 className="font-medium">Novo email</h1>
              <input
                value={novoEmail}
                onChange={(e) => setNovoEmail(e.target.value)}
                className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
              />
            </div>
          </div>

          {/* SENHA */}
          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="password"
              placeholder="Nova senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
            />

            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
            />
          </div>

          {/* ROLE + STATUS */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* FUNÇÃO */}
            <div className="flex flex-col">
              <h1 className="font-medium mb-1">Função</h1>
              <select
                disabled={isSelfEdit}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200 ${
                  isSelfEdit ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <option>Engenheiro</option>
                <option>Gestor</option>
                <option>Visualizador</option>
              </select>
            </div>

            {/* STATUS */}
            <div className="flex flex-col">
              <h1 className="font-medium mb-1">Status</h1>
              <select
                disabled={isSelfEdit}
                value={status}
                onChange={(e) => setStatus(e.target.value === "true")}
                className={`w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200 ${
                  isSelfEdit ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
            </div>
          </div>

          {isSelfEdit && (
            <p className="text-xs text-gray-500">
              Você não pode alterar sua própria função ou status.
            </p>
          )}

          {/* BOTÕES */}
          <div className="flex gap-4">
            <button
              disabled={!houveMudanca}
              className={`w-full p-2 font-bold rounded-md cursor-pointer ${
                houveMudanca
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
