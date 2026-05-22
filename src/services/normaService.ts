import type { cadastrarSolicitacaoForm } from "../types/cadastrarSolicitacaoForm";

export async function listarNormas() {
	const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/normas`);

	if (!response.ok) {
		throw new Error("Erro ao buscar normas");
	}

	return response.json();
}

export async function cadastrarNorma(formData: FormData) {
	const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/normas`, {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error("Erro ao cadastrar norma");
	}

	return response.json();
}

export async function cadastrarSolicitacao(data: cadastrarSolicitacaoForm) {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/solicitacoes/norma`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		throw new Error("Erro ao cadastrar solicitação");
	}

	return response.json();
}

export async function listarSolicitacoes() {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/solicitacoes/norma`,
	);

	if (!response.ok) {
		throw new Error("Erro ao buscar solicitações");
	}

	return response.json();
}

export async function atualizarSolicitacao(id: string, status: string) {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/solicitacoes/norma/${id}`,
		{
			method: "PATCH",

			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				status,
			}),
		},
	);

	if (!response.ok) {
		throw new Error("Erro ao atualizar solicitação");
	}

	return response.json();
}
