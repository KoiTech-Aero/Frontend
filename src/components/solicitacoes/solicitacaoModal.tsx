import type { SolicitacaoNorma } from "../../types/solicitacaoNorma";

import StatusBadge from "../statusBadge";

interface SolicitacaoModalProps {
	solicitacao: SolicitacaoNorma;
	autor: string;
	onClose: () => void;
	onApprove: () => void;
	onReject: () => void;
	onCadastrarNorma: () => void;
	showActions: boolean;
	showCadastrar: boolean;
}

export default function SolicitacaoModal({
	solicitacao,
	autor,
	onClose,
	onApprove,
	onReject,
	onCadastrarNorma,
	showActions,
	showCadastrar,
}: SolicitacaoModalProps) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4 py-6">
			<div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
				<div className="flex items-start justify-between border-b border-black/10 px-7 py-6">
					<div className="flex flex-col gap-1">
						<p className="text-xs uppercase tracking-[0.2em] text-black/40 font-mono">
							Solicitação de Norma
						</p>

						<h2 className="text-2xl font-bold text-black/90">
							{solicitacao.titulo}
						</h2>

						<p className="text-sm text-black/50">
							Código:{" "}
							<span className="font-medium">{solicitacao.codigo_norma}</span>
						</p>
					</div>

					<button
						onClick={onClose}
						className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-lg text-black/60 transition hover:bg-black/5 hover:text-black cursor-pointer"
					>
						✕
					</button>
				</div>

				<div className="max-h-[75vh] overflow-y-auto px-7 py-6 space-y-6">
					<div className="flex items-center justify-between rounded-2xl border border-black/5 bg-zinc-50 px-5 py-4">
						<div>
							<p className="text-sm text-black/50">Status Atual</p>

							<p className="font-semibold text-black/80">
								Situação da solicitação
							</p>
						</div>

						<StatusBadge status={solicitacao.status} />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<InfoCard label="Autor" value={autor} />

						<InfoCard
							label="Data da Solicitação"
							value={new Date(solicitacao.data_solicitacao).toLocaleDateString(
								"pt-BR",
							)}
						/>

						<InfoCard label="Versão" value={solicitacao.versao_norma} />

						<InfoCard label="Órgão Emissor" value={solicitacao.orgao_emissor} />
					</div>

					<div className="space-y-3">
						<div>
							<p className="text-sm uppercase tracking-wider text-black/40 font-mono">
								Motivo
							</p>

							<h3 className="text-lg font-semibold text-black/80">
								Descrição da Solicitação
							</h3>
						</div>

						<div className="rounded-2xl border border-black/10 bg-zinc-50 p-5 text-[15px] leading-relaxed text-black/70">
							{solicitacao.motivo}
						</div>
					</div>

					{showActions && (
						<div className="flex flex-col sm:flex-row gap-3 pt-2">
							<button
								onClick={onApprove}
								className="flex-1 rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 cursor-pointer"
							>
								Aprovar Solicitação
							</button>

							<button
								onClick={onReject}
								className="flex-1 rounded-2xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 cursor-pointer"
							>
								Rejeitar Solicitação
							</button>
						</div>
					)}

					{showCadastrar && (
						<button
							onClick={onCadastrarNorma}
							className="w-full rounded-2xl bg-emerald-600 px-5 py-4 font-semibold text-white transition hover:bg-emerald-700 cursor-pointer"
						>
							Cadastrar Norma
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

interface InfoCardProps {
	label: string;
	value: string;
}

function InfoCard({ label, value }: InfoCardProps) {
	return (
		<div className="rounded-2xl border border-black/5 bg-zinc-50 p-5">
			<p className="text-sm text-black/45">{label}</p>

			<p className="mt-1 font-semibold text-black/80 wrap-break-words">
				{value}
			</p>
		</div>
	);
}
