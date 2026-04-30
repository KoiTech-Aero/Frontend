import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastrarUsuario() {
	const navigate = useNavigate();

	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [role, setRole] = useState("Engenheiro");

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const response = await fetch(`http://localhost:3000/usuarios`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ nome, email, senha, role }),
			});

			const data = await response.json();
			console.log(data);

			alert("Usuário Criado com sucesso!");
			navigate("/listarUsuarios");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="overflow-y-auto w-[90%] flex flex-col rounded-2xl bg-white">
				<div className="m-5 flex flex-col">
					<h1 className="text-3xl font-bold text-gray-900">
						Cadastrar usuário
					</h1>
					<h2 className="text-md text-gray-500">
						Adicione os dados do usuário.
					</h2>
				</div>

				<hr className="border-2 border-gray-200" />

				<div className="m-10 flex flex-col gap-5">
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

					<div className="flex justify-between items-center gap-x-30">
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

						<div className="w-full">
							<h1 className="text-gray-900 font-medium mb-1">Senha</h1>
							<input
								className="w-full border-4 rounded-md p-2 border-gray-300 bg-blue-50 text-gray-900"
								type="senha"
								required
								value={senha}
								onChange={(e) => setSenha(e.target.value)}
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
					</div>

					<div className="flex justify-between gap-x-10">
						<button
							type="submit"
							className="w-125 bg-blue-600 text-white font-bold rounded-md cursor-pointer p-2"
						>
							Cadastrar Usuario
						</button>
						<button
							type="button"
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
