import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";

type StatusNota = "Pendente" | "Aprovada" | "Rejeitada";

interface Nota {
	id: string;
	text: string;
	status: StatusNota;
	data_solicitacao: string;
	data_aprovacao: string | null;
	id_norma: string;
	versao_numero: string;
}

interface AvaliarNotaParams {
	id: string;
	status: StatusNota;
}

const filtros: Array<{ label: string; value: StatusNota | "todas" }> = [
	{ label: "Todas", value: "todas" },
	{ label: "Pendentes", value: "Pendente" },
	{ label: "Aprovadas", value: "Aprovada" },
	{ label: "Rejeitadas", value: "Rejeitada" },
];

function formatarData(data?: string | null) {
	if (!data) return "—";
	return new Date(data).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}

export default function ListarNotas() {
	const { usuario: usuarioLogado } = useContext(AuthContext);
	const podeAvaliar = usuarioLogado?.role === "Gestor";
	const [notas, setNotas] = useState<Nota[]>([]);
	const [carregando, setCarregando] = useState(false);
	const [erro, setErro] = useState<string | null>(null);
	const [filtroStatus, setFiltroStatus] = useState<StatusNota | "todas">("todas");
	const [notaSelecionada, setNotaSelecionada] = useState<Nota | null>(null);
	const [avaliando, setAvaliando] = useState(false);

	// ── Busca
	const buscarNotas = useCallback(async () => {
		setCarregando(true);
		setErro(null);
		try {
			const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/notas`);
			const data = await response.json();
			setNotas(data);
		} catch {
			setErro("Erro ao carregar notas.");
		} finally {
			setCarregando(false);
		}
	}, []);

	useEffect(() => {
		buscarNotas();
	}, [buscarNotas]);

	// ── Filtro local
	const notasFiltradas = useMemo(() => {
		if (filtroStatus === "todas") return notas;
		return notas.filter((n) => n.status === filtroStatus);
	}, [notas, filtroStatus]);

	// ── Avaliação
	const avaliarNota = async ({ id, status }: AvaliarNotaParams) => {
		setAvaliando(true);
		setErro(null);
		try {
			await fetch(`${import.meta.env.VITE_SERVER_URL}/notas/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					status,
					data_aprovacao: new Date().toISOString(),
				}),
			});
			const dataAvaliacao = new Date().toISOString();
			setNotas((prev) =>
				prev.map((n) =>
					n.id === id ? { ...n, status, data_aprovacao: dataAvaliacao } : n,
				),
			);
			setNotaSelecionada((prev) =>
				prev ? { ...prev, status, data_aprovacao: dataAvaliacao } : prev,
			);
		} catch {
			setErro("Erro ao avaliar nota.");
		} finally {
			setAvaliando(false);
		}
	};

	// ── Render
	return (
		<div className="w-full h-[calc(95vh-80px)] flex justify-center px-6 py-5">
			<section className="w-full max-w-7xl flex flex-col rounded-xl overflow-hidden border border-black/10 bg-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)]">
				{/* Cabeçalho + filtros */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-black/10 bg-zinc-100">
					<h1 className="text-sm font-bold text-black/60 font-mono tracking-wide uppercase">
						Notas
					</h1>
					<div className="flex gap-2 flex-wrap">
						{filtros.map((f) => (
							<button
								key={f.value}
								onClick={() => setFiltroStatus(f.value)}
								className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
									filtroStatus === f.value
										? "bg-rose-900 text-white"
										: "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
								}`}
							>
								{f.label}
							</button>
						))}
					</div>
				</div>

				{/* Estados */}
				{carregando && (
					<p className="text-sm text-gray-400 text-center py-16">Carregando notas...</p>
				)}
				{erro && (
					<p className="text-sm text-red-500 text-center py-16">{erro}</p>
				)}

				{/* DESKTOP */}
				{!carregando && !erro && (
					<div className="hidden md:block flex-1 overflow-y-auto">
						<table className="w-full table-fixed border-collapse">
							<thead className="bg-zinc-100 border-b border-black/10 sticky top-0 z-10">
								<tr className="text-left text-sm font-bold text-black/60 font-mono tracking-wide uppercase">
									<th className="px-6 py-4 w-[30%]">Conteúdo</th>
									<th className="px-6 py-4 w-[15%]">Status</th>
									<th className="px-6 py-4 w-[20%]">Solicitação</th>
									<th className="px-6 py-4 w-[20%]">Norma / Versão</th>
									<th className="px-6 py-4 w-[15%] text-center">Detalhes</th>
								</tr>
							</thead>
							<tbody>
								{notasFiltradas.length === 0 ? (
									<tr>
										<td colSpan={5} className="text-center text-sm text-gray-400 py-16">
											Nenhuma nota encontrada.
										</td>
									</tr>
								) : (
									notasFiltradas.map((nota) => (
										<tr
											key={nota.id}
											className="border-b border-black/5 hover:bg-gray-50 transition-colors"
										>
											<td className="px-6 py-4 text-sm text-gray-800 truncate max-w-0">
												<span className="block truncate">{nota.text}</span>
											</td>
											<td className="px-6 py-4">
												<span
													className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
														nota.status === "Aprovada"
															? "bg-green-100 text-green-700"
															: nota.status === "Rejeitada"
																? "bg-red-100 text-red-700"
																: "bg-yellow-100 text-yellow-700"
													}`}
												>
													{nota.status}
												</span>
											</td>
											<td className="px-6 py-4 text-sm text-gray-600">
												{formatarData(nota.data_solicitacao)}
											</td>
											<td className="px-6 py-4 text-sm text-gray-600">
												{nota.id_norma} / {nota.versao_numero}
											</td>
											<td className="px-6 py-4 text-center">
												<button
													onClick={() => setNotaSelecionada(nota)}
													className="px-3 py-1.5 text-xs font-medium text-rose-900 border border-rose-900 rounded-lg hover:bg-rose-50 transition-colors"
												>
													Detalhes
												</button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				)}

				{/* MOBILE */}
				{!carregando && !erro && (
					<div className="flex flex-col md:hidden overflow-y-auto divide-y divide-black/5">
						{notasFiltradas.length === 0 ? (
							<p className="text-center text-sm text-gray-400 py-16">
								Nenhuma nota encontrada.
							</p>
						) : (
							notasFiltradas.map((nota) => (
								<div key={nota.id} className="px-4 py-4 flex flex-col gap-1">
									<p className="text-sm text-gray-800 line-clamp-2">{nota.text}</p>
									<div className="flex items-center justify-between mt-1">
										<span
											className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
												nota.status === "Aprovada"
													? "bg-green-100 text-green-700"
													: nota.status === "Rejeitada"
														? "bg-red-100 text-red-700"
														: "bg-yellow-100 text-yellow-700"
											}`}
										>
											{nota.status}
										</span>
										<span className="text-xs text-gray-400">
											{formatarData(nota.data_solicitacao)}
										</span>
									</div>
									<p className="text-xs text-gray-400">
										{nota.id_norma} / {nota.versao_numero}
									</p>
									<button
										onClick={() => setNotaSelecionada(nota)}
										className="mt-2 self-end px-3 py-1.5 text-xs font-medium text-rose-900 border border-rose-900 rounded-lg hover:bg-rose-50 transition-colors"
									>
										Detalhes
									</button>
								</div>
							))
						)}
					</div>
				)}
			</section>

			{/* Modal */}
			{notaSelecionada && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-4 relative">
						<button
							onClick={() => setNotaSelecionada(null)}
							className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-xl font-bold"
							aria-label="Fechar"
						>
							✕
						</button>

						<h2 className="text-lg font-semibold text-gray-800">Detalhes da Nota</h2>

						<span
							className={`self-start px-3 py-1 rounded-full text-xs font-medium ${
								notaSelecionada.status === "Aprovada"
									? "bg-green-100 text-green-700"
									: notaSelecionada.status === "Rejeitada"
										? "bg-red-100 text-red-700"
										: "bg-yellow-100 text-yellow-700"
							}`}
						>
							{notaSelecionada.status}
						</span>

						<div className="flex flex-col gap-1">
							<span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
								Conteúdo
							</span>
							<p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 leading-relaxed">
								{notaSelecionada.text}
							</p>
						</div>

						<div className="grid grid-cols-2 gap-3 text-sm">
							<div className="flex flex-col gap-0.5">
								<span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
									Norma (ID)
								</span>
								<span className="text-gray-700">{notaSelecionada.id_norma}</span>
							</div>
							<div className="flex flex-col gap-0.5">
								<span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
									Versão
								</span>
								<span className="text-gray-700">{notaSelecionada.versao_numero}</span>
							</div>
							<div className="flex flex-col gap-0.5">
								<span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
									Data de Solicitação
								</span>
								<span className="text-gray-700">
									{formatarData(notaSelecionada.data_solicitacao)}
								</span>
							</div>
							{notaSelecionada.status !== "Pendente" && (
								<div className="flex flex-col gap-0.5">
									<span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
										Data da Avaliação
									</span>
									<span className="text-gray-700">
										{formatarData(notaSelecionada.data_aprovacao)}
									</span>
								</div>
							)}
						</div>

						{/* Botões só se pendente */}
						{notaSelecionada.status === "Pendente" && podeAvaliar && (
							<div className="flex gap-3 pt-2 border-t border-gray-100">
								<button
									onClick={() => avaliarNota({ id: notaSelecionada.id, status: "Rejeitada" })}
									disabled={avaliando}
									className="flex-1 py-2 rounded-lg border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{avaliando ? "Aguarde..." : "Rejeitar"}
								</button>
								<button
									onClick={() => avaliarNota({ id: notaSelecionada.id, status: "Aprovada" })}
									disabled={avaliando}
									className="flex-1 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{avaliando ? "Aguarde..." : "Aprovar"}
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}