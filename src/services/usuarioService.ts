import type { cadastrarUsuarioForm } from "../types/cadastrarUsuarioForm";

export async function listarUsuarios() {
	const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/usuarios`);

	if (!response.ok) {
		throw new Error("Erro ao buscar usuários");
	}

	return response.json();
}

export async function buscarUsuarioPorId(id: string) {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/usuarios/${id}`,
	);

	if (!response.ok) {
		throw new Error("Erro ao buscar usuário");
	}

	return response.json();
}

export async function cadastrarUsuario(data: cadastrarUsuarioForm) {
	const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/usuarios`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Erro ao criar usuário");
	}

	return response.json();
}

export async function editarUsuario(
	id: string,
	data: Partial<cadastrarUsuarioForm>,
) {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/usuarios/${id}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		throw new Error("Erro ao atualizar usuário");
	}

	return response.json();
}
