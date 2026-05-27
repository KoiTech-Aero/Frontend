import { FileText, History, Link as LinkIcon, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import z from "zod";
import Badge from "../components/badge";
import ReferenciaCard from "../components/referenciaCard";
import VersaoCard from "../components/versaoCard";
import { useNormas } from "../hooks/useNormas";
import type { Norma, Versao } from "../types/norma";
import { type Referencia, referenciaSchema } from "../types/referencia";

export default function VisualizarNorma() {
	const navigate = useNavigate();
	const location = useLocation();

	const { normas } = useNormas();
	const norma: Norma = location.state?.norma;
	const [versoes] = useState<Versao[]>(norma.versoes.reverse());

	const [referencias, setReferencias] = useState<Referencia[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);

	const [mostrarRelacoes, setMostrarRelacoes] = useState(false);

	async function redirectNormaReferencia(idNorma: string) {
		try {
			const normaEncontrada = normas.find((d) => d.id === idNorma);

			if (!normaEncontrada) {
				console.error("Norma não encontrada");
				return;
			}

			navigate("/visualizarNorma", {
				state: { norma: normaEncontrada },
			});
		} catch (err) {
			console.error(err);
		}
	}

	async function adicionarRelacao(idRelacionada: string) {
		const confirmar = window.confirm("Deseja associar esta norma?");

		if (!confirmar) return;

		try {
			await fetch(
				`${import.meta.env.VITE_SERVER_URL}/normas/${norma.id}/associar`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						relacionadaId: idRelacionada,
					}),
				},
			);

			setMostrarRelacoes(false);

			const response = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/normas/${norma.id}/referencias`,
			);
			const data = await response.json();

			setReferencias(data);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		if (!norma?.id) return;

		async function loadReferencias() {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_SERVER_URL}/normas/${norma.id}/referencias`,
				);

				if (!response.ok) throw new Error("Erro ao buscar referências");

				const responseJSON = await response.json();

				const { data, success } = z
					.array(referenciaSchema)
					.safeParse(responseJSON);

				if (!success) throw new Error("Erro ao buscar referências");

				setReferencias(
					data.map((d) => ({
						id: d.id,
						codigo: d.codigo,
						titulo: d.titulo,
					})),
				);
			} catch (err) {
				console.error(err);
			}
		}

		containerRef.current?.scrollTo({
			top: 0,
			behavior: "smooth",
		});

		loadReferencias();
	}, [norma?.id]);

	if (!norma) return <p>Nenhuma norma recebida</p>;

	return (
		<>
			<main
				ref={containerRef}
				className="max-w-6xl w-full h-full px-6 my-3 mx-auto flex flex-col gap-5"
			>
				<section className="flex flex-col gap-1">
					<Badge point variant={"verde"} className="w-fit">
						{norma.codigo}
					</Badge>
					<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
						{norma.titulo}
					</h1>
				</section>

				<section className="flex flex-col gap-5 bg-white rounded-md p-5 shadow-[0px_0px_5px_5px_rgba(0,0,0,0.1)]">
					<div className="flex items-center gap-2">
						<span className="bg-red-200 p-2 rounded-full">
							<FileText />
						</span>
						<h3 className="text-lg md:text-xl font-bold">Escopo</h3>
					</div>
					<p className="border rounded-xl p-3 md:p-4 lg:p-5 border-gray-300 bg-gray-100 font-medium">
						{norma.escopo}
					</p>
				</section>

				<section className="flex flex-col gap-5 bg-white rounded-md p-5 shadow-[0px_0px_5px_5px_rgba(0,0,0,0.1)]">
					<div className="flex items-center gap-2">
						<span className="bg-red-200 p-2 rounded-full">
							<History />
						</span>
						<h3 className="text-lg md:text-xl font-bold">Versões</h3>
						<button
							type="button"
							className="inline-flex items-center gap-1 bg-red hover:bg-red-hover text-white px-3 py-1.5 rounded-xl hover:scale-[1.02] ml-auto"
							onClick={() => navigate("/cadastrarVersao", { state: { norma } })}
						>
							<Plus />
							Adicionar Versao
						</button>
					</div>
					<section>
						{versoes.map((versao) => (
							<VersaoCard key={versao.versao_numero} versao={versao} />
						))}
					</section>
				</section>

				<section className="flex flex-col gap-5 bg-white rounded-md p-5 shadow-[0px_0px_5px_5px_rgba(0,0,0,0.1)]">
					<div className="flex items-center gap-2">
						<span className="bg-red-200 p-2 rounded-full">
							<LinkIcon />
						</span>
						<h3 className="text-lg md:text-xl font-bold">
							Normas Relacionadas
						</h3>
						<button
							type="button"
							className="inline-flex items-center gap-1 bg-red hover:bg-red-hover text-white px-3 py-1.5 rounded-xl hover:scale-[1.02] ml-auto"
							onClick={() => {
								setMostrarRelacoes(true);
							}}
						>
							<Plus />
							Adicionar Relacão
						</button>
					</div>

					<section className="grid grid-cols-1 md:grid-cols-2 pt-5 gap-4 md:gap-5">
						{referencias.map((ref) => (
							<ReferenciaCard key={ref.id} referencia={ref} />
						))}
					</section>
				</section>
			</main>

			{mostrarRelacoes && (
				<dialog className="fixed w-full h-full inset-0 bg-black/30 flex flex-col justify-center items-center px-4">
					<header className="bg-white max-w-125 w-full p-5 rounded-t-2xl border-b border-b-black/25">
						<h1 className="text-lg font-bold ">Selecionar Norma</h1>
						<h2 className="text-md font-medium text-black/50">
							Escolha uma ou mais normas para relacionar com esta.
						</h2>
					</header>

					<main className="bg-white max-w-125 w-full p-5">
						{normas
							.filter((n) => n.id !== norma.id)
							.map((n) => (
								<button
									type="button"
									key={n.id}
									className="w-full text-left border border-red/50 p-2 rounded-full cursor-pointer hover:bg-gray-100"
									onClick={() => adicionarRelacao(n.id)}
								>
									<span className="bg-blue-200 px-2 py-1 mr-2 rounded-full">
										{n.codigo}
									</span>
									{n.titulo}
								</button>
							))}
					</main>
					<footer className="bg-white max-w-125 w-full px-5 py-2 rounded-b-2xl">
						<div className="w-full flex items-center justify-end gap-2">
							<button
								type="button"
								onClick={() => setMostrarRelacoes(false)}
								className="h-fit text-black border border-black rounded-full px-3 py-1 hover:bg-gray-200"
							>
								Fechar
							</button>

							<button
								type="button"
								onClick={() => setMostrarRelacoes(false)}
								className="bg-red text-white px-3 py-2 rounded-full hover:bg-red-hover"
							>
								Adicionar
							</button>
						</div>
					</footer>
				</dialog>
			)}
		</>
	);
}
