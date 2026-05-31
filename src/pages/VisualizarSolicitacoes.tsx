import SolicitacaoModal from "../components/solicitacoes/solicitacaoModal";

import SolicitacaoRow from "../components/solicitacoes/solicitacaoRow";

import { useVisualizarSolicitacoesNormas } from "../hooks/useVisualizarSolicitacoes";

export default function VisualizarSolicitacoes() {
	const {
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
	} = useVisualizarSolicitacoesNormas();

	return (
		<div className="w-full h-[calc(95vh-80px)] flex justify-center px-6 py-5">
			<section className="w-full max-w-7xl flex flex-col rounded-xl overflow-hidden border border-black/10 bg-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)]">
				{/* DESKTOP */}
				<div className="hidden md:block flex-1 overflow-y-auto">
					<table className="w-full table-fixed border-collapse">
						<thead className="bg-zinc-100 border-b border-black/10 sticky top-0 z-10">
							<tr className="text-left text-sm font-bold text-black/60 font-mono tracking-wide uppercase">
								<th className="px-6 py-4 w-[20%]">Título</th>

								<th className="px-6 py-4 w-[20%]">Autor</th>

								<th className="px-10 py-4 w-[20%]">Data</th>

								<th className="px-10 py-4 w-[20%]">Status</th>

								<th className="px-6 py-4 w-[20%] text-center">Detalhes</th>
							</tr>
						</thead>

						<tbody>
							{solicitacoes.map((solicitacao) => (
								<SolicitacaoRow
									key={solicitacao.id}
									solicitacao={solicitacao}
									autor={usuarios[solicitacao.usuario.id] || "Carregando..."}
									onDetails={() => abrirModal(solicitacao)}
								/>
							))}

							{solicitacoes.length === 0 && (
								<td colSpan={5} className="text-center pt-2">
									Nenhuma solicitação pendente
								</td>
							)}
						</tbody>
					</table>
				</div>

				{/* MOBILE */}
				<div className="flex flex-col md:hidden overflow-y-auto">
					{solicitacoes.map((solicitacao) => (
						<SolicitacaoRow
							key={solicitacao.id}
							solicitacao={solicitacao}
							autor={usuarios[solicitacao.usuario.id] || "Carregando..."}
							onDetails={() => abrirModal(solicitacao)}
						/>
					))}
				</div>
			</section>

			{modal && solicitacaoSelecionada && (
				<SolicitacaoModal
					solicitacao={solicitacaoSelecionada}
					autor={usuarios[solicitacaoSelecionada.usuario.id] || "Carregando..."}
					onClose={fecharModal}
					onApprove={() => atualizarStatus("Aprovado")}
					onReject={() => atualizarStatus("Recusado")}
					onCadastrarNorma={() =>
						navigate("/cadastrarNorma", {
							state: {
								solicitacaoSelecionada,
							},
						})
					}
					showActions={solicitacaoPendente(solicitacaoSelecionada.status)}
					showCadastrar={permissaoCadastro(
						solicitacaoSelecionada.status,
						usuarioLogado,
					)}
				/>
			)}
		</div>
	);
}
