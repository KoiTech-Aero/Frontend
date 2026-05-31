import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "../context/AuthContext";
import { cadastrarSolicitacao, listarNormas } from "../services/normaService";
import type { cadastrarSolicitacaoForm } from "../types/cadastrarSolicitacaoForm";

export function useCadastrarSolicitacao() {
	const navigate = useNavigate();
	const { usuario: usuarioLogado } = useContext(AuthContext);

	const [formData, setFormData] = useState<cadastrarSolicitacaoForm>({
		titulo: "",
		motivo: "",
		codigo_norma: "",
		versao_norma: "",
		orgao_emissor: "",
		id_usuario: usuarioLogado?.id ?? "",
	});

	function updateField<K extends keyof cadastrarSolicitacaoForm>(
		field: K,
		value: cadastrarSolicitacaoForm[K],
	) {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			const normas = await listarNormas();

			const codigoExiste = normas.some(
				(norma: { codigo: string }) => norma.codigo === formData.codigo_norma,
			);

			if (codigoExiste) {
				alert("Já existe uma norma com esse código!");
				return;
			}

			await cadastrarSolicitacao(formData);

			alert("Solicitação cadastrada com sucesso!");

			navigate("/pesquisarNorma");
		} catch (error) {
			console.error(error);

			alert("Erro ao cadastrar solicitação.");
		}
	}

	return {
		formData,
		updateField,
		handleSubmit,
		navigate,
		usuarioLogado,
	};
}
