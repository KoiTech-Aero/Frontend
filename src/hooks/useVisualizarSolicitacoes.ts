import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import {
	atualizarSolicitacao,
	listarSolicitacoes,
} from "../services/normaService";
import { buscarUsuarioPorId } from "../services/usuarioService";
import type { SolicitacaoNorma } from "../types/solicitacaoNorma";
import type { Usuario } from "../types/usuarioLogado";

export function useVisualizarSolicitacoesNormas() {
	const navigate = useNavigate();

	const { usuario: usuarioLogado } = useContext(AuthContext);

	const [solicitacoes, setSolicitacoes] = useState<SolicitacaoNorma[]>([]);

	const [usuarios, setUsuarios] = useState<Record<string, string>>({});

	const [modal, setModal] = useState(false);

	const [solicitacaoSelecionada, setSolicitacaoSelecionada] =
		useState<SolicitacaoNorma | null>(null);

	useEffect(() => {
		carregarSolicitacoes();
	}, []);

	async function carregarSolicitacoes() {
		try {
			const data = await listarSolicitacoes();

			setSolicitacoes(data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		carregarUsuarios();
	}, [solicitacoes]);

	async function carregarUsuarios() {
		const usuariosMap: Record<string, string> = {};

		await Promise.all(
			solicitacoes.map(async (solicitacao) => {
				const id = solicitacao.usuario.id;

				if (!usuariosMap[id]) {
					try {
						const usuario = await buscarUsuarioPorId(id);

						usuariosMap[id] = usuario.nome;
					} catch (error) {
						console.error(error);

						usuariosMap[id] = "Usuário não encontrado";
					}
				}
			}),
		);

		setUsuarios(usuariosMap);
	}

	function abrirModal(solicitacao: SolicitacaoNorma) {
		setSolicitacaoSelecionada(solicitacao);

		setModal(true);
	}

	function fecharModal() {
		setModal(false);

		setSolicitacaoSelecionada(null);
	}

	function solicitacaoPendente(status: string) {
		return status === "Pendente";
	}

	function permissaoCadastro(status: string, usuario: Usuario | null) {
		return status === "Aprovado" && usuario?.role === "Gestor";
	}

	async function atualizarStatus(status: string) {
		if (!solicitacaoSelecionada) return;

		try {
			await atualizarSolicitacao(solicitacaoSelecionada.id, status);

			alert(
				status === "Aprovado"
					? "Solicitação aprovada com sucesso!"
					: "Solicitação recusada com sucesso!",
			);

			await carregarSolicitacoes();

			fecharModal();
		} catch (error) {
			console.error(error);

			alert("Erro ao atualizar solicitação.");
		}
	}

	return {
		solicitacoes,
		usuarios,
		modal,
		solicitacaoSelecionada,
		usuarioLogado,
		navigate,
		abrirModal,
		fecharModal,
		solicitacaoPendente,
		permissaoCadastro,
		atualizarStatus,
	};
}
